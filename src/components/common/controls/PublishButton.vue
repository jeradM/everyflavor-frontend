<template>
  <button
    class="btn xsmall warning"
    :class="classes"
    role="link"
    @click="onClick"
  >
    Publish
  </button>
</template>

<script>
import { publishRecipe } from "@/util/recipe";

export default {
  name: "PublishButton",
  props: {
    recipeId: {
      type: Number,
      required: true
    },
    classes: String
  },
  methods: {
    onClick() {
      const ok = publishRecipe(this.recipeId);
      if (ok) {
        this.$emit("published");
      }
    }
  }
};
</script>

<style></style>
