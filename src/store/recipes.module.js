import { fetchRecipes } from "@/util/recipe";

const state = () => ({
  all: [],
  params: {
    title: "",
    sort: "created_at",
    order: "desc",
    limit: 25,
    offset: 0
  },
  searchResults: [],
  total: 0
});

const getters = {
  recipes(state) {
    return state.searchResults;
  },
  params(state) {
    return state.params;
  },
  recipesObj(state) {
    return state.all.reduce((obj, item) => ((obj[item.id] = item), obj), {});
  }
};

const actions = {
  async search({ commit, state }) {
    commit("setSearchResults", await fetchRecipes(state.params));
  },
  setParams({ commit, dispatch, state }, params) {
    const p = Object.assign({}, state.params, params);
    commit("setParams", p);
    dispatch("search");
  }
};

const mutations = {
  setRecipes(state, recipes) {
    state.all = recipes;
  },
  setSearchResults(state, recipes) {
    state.searchResults = recipes.results;
    state.total = recipes.count;
  },
  setParams(state, params) {
    state.params = params;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
