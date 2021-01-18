<template>
  <div class="p-6 max-w-4xl mx-auto">
    <RecipeHeader :recipe="recipe" compact />
    <Mix :batch="batch" />
  </div>
</template>

<script>
import Mix from "@/components/batch/Mix";
import RecipeHeader from "@/components/recipe/RecipeHeader";
import { fetchBatch } from "@/util/batch";
import { fetchRecipe } from "@/util/recipe";

export default {
  components: { Mix, RecipeHeader },
  name: "ViewBatch",
  data() {
    return {
      batch: {
        nicVgM: 0,
        nicStrength: 48,
        batchVgM: 70000,
        batchStrength: 6,
        batchSizeM: 30000,
        useNic: true,
        flavors: []
      },
      recipe: {}
    };
  },
  async mounted() {
    const batchId = parseInt(this.$route.params.id);
    this.batch = await fetchBatch(batchId);
    this.recipe = await fetchRecipe(this.batch.recipeId);
  }
};
</script>

<style></style>
