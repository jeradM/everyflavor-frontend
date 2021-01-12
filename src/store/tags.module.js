import { getJson } from "@/util/requests";
import * as JsSearch from "js-search";

const state = () => ({
  all: [],
  count: 0,
  jsSearch: new JsSearch.Search("tag"),
});

const getters = {
  search: (state) => (q, limit = 10) => {
    const t = !q ? state.all : state.jsSearch.search(q);
    return t.length > limit ? t.slice(0, limit) : t;
  },
};

const actions = {
  async fetchTags({ commit, state }) {
    if (state.tags && state.tags.length > 0) return;
    const data = await getJson("tags");
    if (data) commit("setTags", data.data);
  },
};

const mutations = {
  setTags(state, tags) {
    state.all = tags;
    state.count = tags.length;
    state.jsSearch.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();
    state.jsSearch.addIndex("tag");
    state.jsSearch.addDocuments(tags);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
