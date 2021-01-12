<template>
  <button
    class="btn xsmall secondary"
    :class="classes"
    role="link"
    @click="onClick"
  >
    Remix it
  </button>
</template>

<script>
export default {
  name: "RemixButton",
  props: {
    recipeId: {
      type: Number,
      required: true,
    },
    classes: String,
  },
  methods: {
    onClick() {
      this.$router.push({
        name: "createRecipe",
        query: { recipeId: this.recipeId },
      });
    },
  },
};
</script>

<style></style>
