<template>
  <div
    class="text-blue-700 sm:text-red-700 md:text-green-700 lg:text-orange-700"
  >
    {{ recipe }}
  </div>
</template>

<script>
import { fetchRecipe } from "@/util/recipe";

export default {
  name: "Recipe",
  data() {
    return {
      recipe: {
        flavors: [],
        collaborators: [],
        tags: []
      }
    };
  },
  props: {
    recipeId: {
      type: Number,
      required: true
    }
  },
  async mounted() {
    this.recipe = await fetchRecipe(this.recipeId);
  }
};
</script>

<style scoped></style>
