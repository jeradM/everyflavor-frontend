<template>
  <div class="max-w-4xl mx-auto">
    <RecipeCard :recipe="recipe" />
  </div>
</template>

<script>
import RecipeCard from "@/components/recipe/RecipeCard";
import { fetchRecipe } from "@/util/recipe";

export default {
  name: "ViewRecipe",
  components: { RecipeCard },
  data() {
    return {
      recipe: {
        flavors: [],
        collaborators: [],
        tags: []
      }
    };
  },
  async mounted() {
    this.recipe = await fetchRecipe(parseInt(this.$route.params.id));
  }
};
</script>

<style scoped></style>
