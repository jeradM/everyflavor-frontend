import store from "@/store";

export const canEditRecipe = recipe => {
  const u = store.getters["user/user"];
  if (!u) return false;
  if (recipe.ownerId === u.id) return true;
  if (!recipe.collaborators) return false;
  if (recipe.collaborators.map(c => c.id).includes(u.id)) return true;
  return false;
};
