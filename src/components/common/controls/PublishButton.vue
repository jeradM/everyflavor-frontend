<template>
  <button
    class="btn xsmall warning"
    :class="classes"
    role="link"
    @click="showConfirm"
  >
    Publish
  </button>
</template>

<script>
import { publishRecipe } from "@/util/recipe";
import PublishModal from "@/components/recipe/PublishModal";

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
    showConfirm() {
      const t = this;
      this.$modal.show(
        PublishModal,
        { onPublish: t.publish, name: "publishModal" },
        { name: "publishModal", height: "auto", adaptive: true, maxWidth: 400 }
      );
    },
    publish(name) {
      const ok = publishRecipe(this.recipeId);
      if (ok) {
        this.$emit("published");
      }
      this.$modal.hide(name);
    }
  }
};
</script>

<style></style>
