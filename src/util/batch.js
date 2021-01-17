import notify from "@/notifications";
import { getJson, postJson } from "@/util/requests";

export const fetchBatch = async id => {
  const url = `batch/${id}`;
  const recipe = await getJson(url);
  return recipe.data;
};

export const fetchBatches = async () => {
  const url = `batches`;
  const batches = await getJson(url);
  return batches.data;
};

export const saveBatch = async batch => {
  //   const v = validateRecipe(recipe);
  //   if (v !== null) {
  //     return { recipe: null, errors: v.details };
  //   }
  //   const url = recipe.id ? `recipe/"recipes";
  //   const method = !recipe.id ? "post" : "put";
  const res = await postJson("batches", {
    data: batch,
    onFailure: d => console.error(d)
  });
  if (res) {
    notify.success("Batch saved");
    return { batch: res.data, errors: null };
  }
};
