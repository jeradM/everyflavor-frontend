import Vue from "vue";
import Vuex from "vuex";
import user from "./user.module";
import flavors from "./flavors.module";
import tags from "./tags.module";
import recipes from "./recipes.module";
import eventBus from "@/event-bus";

Vue.use(Vuex);

const unauthorized = () => {
  store.dispatch("logout");
  eventBus.emit("showLogin");
};

const currentUser = () => {
  return store.getters["user/user"];
};

const isLoggedIn = () => {
  return store.getters["user/isLoggedIn"];
};

const store = new Vuex.Store({
  state: {
    stash: []
  },
  mutations: {},
  actions: {},
  modules: { user, flavors, tags, recipes },
  plugins: []
});

export default store;
export { currentUser, isLoggedIn, unauthorized };
