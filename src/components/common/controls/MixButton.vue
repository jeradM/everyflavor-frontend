<template>
  <button
    class="btn xsmall primary"
    :class="classes"
    role="link"
    @click="onClick"
  >
    Mix it
  </button>
</template>

<script>
export default {
  name: "MixButton",
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
        name: "createBatch",
        query: { recipeId: this.recipeId },
      });
    },
  },
};
</script>

<style></style>
