import { getJson, postJson } from "@/util/requests";
import validate from "@/validation/recipe";

export const fetchRecipe = async id => {
  const url = `recipe/${id}`;
  const recipe = await getJson(url);
  return recipe.data;
};

export const fetchRecipes = async params => {
  const url = "recipes";
  const recipes = await getJson(url, params, r => console.log(r));
  return recipes.data;
};

export const fetchMyRecipes = async params => {
  const url = "recipes/mine";
  const recipes = await getJson(url, params, r => console.log(r));
  return recipes.data;
};

export const saveRecipe = async recipe => {
  const v = validateRecipe(recipe);
  if (v !== null) {
    return { recipe: null, errors: v.details };
  }
  const url = recipe.id ? `recipe/${recipe.id}` : "recipes";
  const method = !recipe.id ? "post" : "put";
  const res = await postJson(url, recipe, d => console.error(d), method);
  if (res) {
    return { recipe: res.data, errors: null };
  }
};

const validateRecipe = recipe => {
  const v = validate(recipe);
  if (v.error) {
    return v.error;
  }
  return null;
};

export const list = async (limit = 25, page = 1) => {
  const url = `recipes/page`;
  const r = await getJson(url, { limit, page });
  return r.data;
};

export const emptyRecipe = () => ({
  title: "",
  public: false,
  snv: false,
  steepDays: null,
  vgPercent: 70000,
  uuid: null,
  version: 1,
  flavors: [],
  collaborators: [],
  tags: []
});
