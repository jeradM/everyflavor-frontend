<template>
  <button
    class="btn xsmall default"
    :class="classes"
    role="link"
    @click="onClick"
  >
    <svg-icon type="mdi" :path="icon" :size="14" />
  </button>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiContentDuplicate } from "@mdi/js";
export default {
  name: "NewVersionButton",
  components: { SvgIcon },
  props: {
    recipeId: {
      type: Number,
      required: true
    },
    classes: String
  },
  computed: {
    icon: () => mdiContentDuplicate
  },
  methods: {
    onClick() {
      this.$router.push({
        name: "createRecipe",
        query: { recipeId: this.recipeId, newVersion: true }
      });
    }
  }
};
</script>

<style></style>
