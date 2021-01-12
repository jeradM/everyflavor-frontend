<template>
  <div class="max-w-4xl mx-auto">
    <RecipeForm :recipeId="recipeId" :remix="remix" :new-version="newVersion" />
  </div>
</template>

<script>
import RecipeForm from "../../components/recipe/RecipeForm";
export default {
  name: "CreateRecipe",
  components: { RecipeForm },
  computed: {
    remix() {
      return !!this.recipeId && !this.newVersion;
    },
    newVersion() {
      return !!this.$route.query.newVersion;
    },
    recipeId() {
      return parseInt(this.$route.query.recipeId);
    }
  }
  // methods: {
  //   async save(recipe) {
  //     debugger;
  //     this.$store.dispatch("recipes/saveRecipe", { recipe });
  //   },
  // },
};
</script>

<style scoped></style>
