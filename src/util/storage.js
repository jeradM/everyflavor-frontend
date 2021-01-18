const FLAVORS_KEY = "flavors";
const FLAVORS_UPDATED_KEY = "flavorsUpdated";
const FLAVOR_SEARCH_KEY = "flavorSearch";
const RECIPE_SEARCH_KEY = "recipeSearch";
const KEYS = [
  FLAVORS_KEY,
  FLAVORS_UPDATED_KEY,
  FLAVOR_SEARCH_KEY,
  RECIPE_SEARCH_KEY
];

const set = (key, val) => {
  localStorage.setItem(key, JSON.stringify(val));
};

const get = key => {
  const s = localStorage.getItem(key);
  if (!s) return null;
  return JSON.parse(s);
};

const remove = key => {
  localStorage.removeItem(key);
};

const clear = () => {
  KEYS.forEach(k => remove(k));
};

const setFlavors = f => {
  set(FLAVORS_KEY, f);
  set(FLAVORS_UPDATED_KEY, new Date().getTime() / 1000);
};

const getFlavors = () => get(FLAVORS_KEY);

const getFlavorsUpdated = () => {
  const l = get(FLAVORS_UPDATED_KEY);
  if (!l) return null;
  return parseInt(l);
};

const setFlavorCache = f => {
  set(FLAVOR_SEARCH_KEY, f);
};

const getFlavorCache = () => get(FLAVOR_SEARCH_KEY);

const setRecipesCache = r => {
  set(RECIPE_SEARCH_KEY, r);
};

const getRecipesCache = () => get(RECIPE_SEARCH_KEY);

export default {
  clear,
  getFlavors,
  setFlavors,
  getFlavorsUpdated,
  getFlavorCache,
  setFlavorCache,
  getRecipesCache,
  setRecipesCache
};
