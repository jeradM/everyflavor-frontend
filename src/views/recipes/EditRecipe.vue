<template>
  <div class="max-w-4xl mx-auto">
    <RecipeForm :recipeId="recipeId" />
  </div>
</template>

<script>
import RecipeForm from "../../components/recipe/RecipeForm";

export default {
  name: "EditRecipe",
  components: { RecipeForm },
  computed: {
    recipeId() {
      return parseInt(this.$route.params.id);
    }
  }
};
</script>

<style scoped></style>
