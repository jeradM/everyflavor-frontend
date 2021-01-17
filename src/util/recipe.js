import { getJson, postJson } from "@/util/requests";
import validate from "@/validation/recipe";

export const fetchRecipe = async id => {
  const url = `recipe/${id}`;
  const recipe = await getJson(url);
  return recipe ? recipe.data : emptyRecipe();
};

export const fetchRecipes = async params => {
  const url = "recipes";
  const recipes = await getJson(url, {
    params,
    onFailure: r => console.log(r)
  });
  return recipes.data;
};

export const fetchMyRecipes = async params => {
  const url = "recipes/mine";
  const recipes = await getJson(url, {
    params,
    onFailure: r => console.log(r)
  });
  return recipes.data;
};

export const saveRecipe = async recipe => {
  const v = validateRecipe(recipe);
  if (v !== null) {
    return { recipe: null, errors: v.details };
  }
  const url = recipe.id ? `recipe/${recipe.id}` : "recipes";
  const method = !recipe.id ? "post" : "put";
  const res = await postJson(url, {
    data: recipe,
    onFailure: d => console.log(d),
    method
  });
  if (res) {
    return { recipe: res.data, errors: null };
  }
};

export const publishRecipe = async id => {
  const resp = await postJson(`recipe/${id}/publish`, { method: "put" });
  return resp.ok;
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
  const r = await getJson(url, { params: { limit, page } });
  return r.data;
};

export const emptyRecipe = () => ({
  title: "",
  public: false,
  snv: false,
  steepDays: null,
  temp: null,
  vgPercentM: null,
  uuid: null,
  flavors: [],
  collaborators: [],
  tags: []
});
