import { getJson, postJson } from "@/util/requests";
import { fetchStash } from "@/util/stash";
import { fetchMyRecipes } from "@/util/recipe";
import { fetchBatches } from "@/util/batch";
import { API_URL } from "@/config";

const state = () => ({
  user: null,
  stash: [],
  batches: { results: [], count: 0 },
  recipes: {
    results: [],
    count: 0,
    searchParams: {
      title: "",
      sort: "created_at",
      order: "desc",
      limit: 25,
      offset: 0
    }
  }
});

const getters = {
  isLoggedIn: state => state.user !== null,
  user: state => state.user,
  stash: state => state.stash || [],
  recipes: state => state.recipes.results,
  totalRecipes: state => state.recipes.count,
  recipeParams: state => state.recipes.searchParams,
  batches: state => state.batches.results,
  totalBatches: state => state.batches.count
};

const actions = {
  login({ commit, dispatch }, user) {
    commit("setUser", user);
    dispatch("loadStash");
  },
  logout({ commit }) {
    postJson(`${API_URL}/auth/logout`).then(() => {
      commit("setUser", null);
      commit("setStash", null);
    });
  },
  async fetchUser({ commit, dispatch }) {
    const u = await getJson("user");
    commit("setUser", u.data);
    if (u.data) dispatch("loadStash");
  },
  async loadStash({ commit }) {
    const stash = await fetchStash();
    commit("setStash", stash);
  },
  async searchRecipes({ commit, state }) {
    commit("setRecipes", await fetchMyRecipes(state.recipes.searchParams));
  },
  setRecipeParams({ commit, state }, params) {
    const p = Object.assign({}, state.recipes.searchParams, params);
    commit("setRecipeParams", p);
  },
  async loadBatches({ commit }) {
    commit("setBatches", await fetchBatches());
  }
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setStash(state, stash) {
    state.stash = stash;
  },
  setRecipes(state, recipes) {
    state.recipes.results = recipes.results;
    state.recipes.count = recipes.results.count;
  },
  setRecipeParams(state, params) {
    state.recipes.params = params;
  },
  setBatches(state, batches) {
    state.batches = batches;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
