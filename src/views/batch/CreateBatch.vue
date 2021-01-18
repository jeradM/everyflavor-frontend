<template>
  <div class="max-w-4xl mx-auto px-2 sm:px-0">
    <BatchForm :recipeId="recipeId" />
  </div>
</template>

<script>
import BatchForm from "../../components/batch/BatchForm";
export default {
  name: "CreateBatch",
  components: { BatchForm },
  computed: {
    recipeId() {
      const id = this.$route.query.recipeId;
      if (!id) return null;
      return parseInt(id);
    }
  }
  // mounted() {
  //   const id = this.$route.query.recipeId;
  //   this.recipe = await fetchRecipe(id);
  //   console.log(this.recipe);
  // },
  // methods: {
  //   async save(recipe) {
  //     debugger;
  //     this.$store.dispatch("recipes/saveRecipe", { recipe });
  //   },
  // },
};
</script>

<style scoped></style>
