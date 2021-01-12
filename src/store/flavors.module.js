import { keyBy } from "lodash";
import Sort from "fast-sort";
import * as JsSearch from "js-search";
import { getJson } from "@/util/requests";
import eventBus from "@/event-bus";
import storage from "../util/storage";

const state = () => ({
  all: [],
  loaded: false,
  indexed: false,
  searchParams: {
    query: "",
    limit: 100,
    offset: 0,
    sort: "",
    reverse: false
  },
  searchResults: [],
  count: 0,
  jsSearch: new JsSearch.Search("name")
});

const getters = {
  flavors: state => () => {
    let sorted = [].concat(state.all);
    let sortFn;
    const { limit, offset, sort, reverse } = state.searchParams;
    switch (sort) {
      case "vendor":
        sortFn = [s => s.vendor.abbreviation, s => s.name.toLowerCase()];
        break;
      case "name":
        sortFn = s => s.name.toLowerCase();
        break;
      case "recipes":
        sortFn = s => s.recipeCount;
        break;
      case "rating":
        sortFn = s => s.avgPercent;
        break;
      default:
        sortFn = null;
    }
    if (sortFn !== null) {
      reverse ? Sort(sorted).desc(sortFn) : Sort(sorted).asc(sortFn);
    }
    return sorted.length > limit
      ? sorted.slice(offset, offset + limit)
      : sorted;
  },

  applyFilters: (state, getters) => () => {
    const { query, limit } = state.searchParams;
    if (!query) return getters.flavors();
    const rr = state.jsSearch.search(query);
    return limit > 0 && rr.length <= limit ? rr : rr.slice(0, limit);
  },

  search: (state, getters) => params => {
    const { query, limit } = params;
    if (!query) return getters.flavors();
    const rr = state.jsSearch.search(query);
    return limit > 0 && rr.length <= limit ? rr : rr.slice(0, limit);
  },

  flavorsObj(state) {
    return keyBy(state.all, "id");
  },

  byId: (state, getters) => flavorId => {
    const f = getters.flavorsObj[flavorId];
    return f || {};
  },

  searchParams: state => state.searchParams,
  loaded: state => state.loaded
};

const actions = {
  async fetchFlavors({ commit, state }, force) {
    if (!force && state.all && state.all.length > 0) return;
    const cacheDate = storage.getFlavorsUpdated();
    const now = new Date().getTime() / 1000;
    if (!force && cacheDate !== null && now - cacheDate < 24 * 60 * 60) {
      const p = new Promise(res => {
        console.time("flavors");
        const cached = storage.getFlavors();
        if (cached) {
          res(cached);
        }
      });
      const f = await p;
      commit("setFlavors", f);
      return;
    }
    const data = await getJson("flavors");
    if (data) {
      commit("setFlavors", data.data);
      storage.setFlavors(data.data);
    }
  },
  indexFlavors({ state }) {
    setTimeout(() => {
      console.time("indexing");
      // state.jsSearch.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();
      state.jsSearch.addIndex("name");
      state.jsSearch.addIndex(["vendor", "abbreviation"]);
      state.jsSearch.addDocuments(state.all);
      state.indexed = true;
      console.timeEnd("indexing");
    }, 1000);
  },
  filter({ commit, getters, state }) {
    const { query } = state.searchParams;
    if (!query) commit("setSearchResults", getters.flavors());
    else commit("setSearchResults", state.jsSearch.search(query));
  },
  setSearchParams({ commit, dispatch, state }, searchParams) {
    const p = Object.assign({}, state.searchParams, searchParams);
    commit("setSearchParams", p);
    dispatch("filter");
  }
};

const mutations = {
  async setFlavors(state, flavors) {
    state.all = flavors.results;
    state.count = flavors.count;
    state.loaded = true;
    eventBus.emit("flavors:loaded");
  },
  setIndexed(state) {
    state.indexed = true;
  },
  setSearchResults(state, filtered) {
    state.searchResults = filtered;
  },
  setSearchParams(state, params) {
    state.searchParams = params;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
