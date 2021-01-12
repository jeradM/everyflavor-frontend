<template>
  <button
    class="btn xsmall default"
    :class="classes"
    role="link"
    @click="onClick"
  >
    <svg-icon type="mdi" :path="editIcon" :size="14" />
  </button>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPencil } from "@mdi/js";
export default {
  name: "EditRecipeButton",
  components: { SvgIcon },
  props: {
    recipeId: {
      type: Number,
      required: true,
    },
    classes: String,
  },
  computed: {
    editIcon: () => mdiPencil,
  },
  methods: {
    onClick() {
      this.$router.push({
        name: "editRecipe",
        params: { id: this.recipeId },
      });
    },
  },
};
</script>

<style></style>
