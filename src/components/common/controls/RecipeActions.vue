<template>
  <fragment>
    <mix-button :recipeId="recipeId" />
    <remix-button :recipeId="recipeId" classes="ml-1" />
    <edit-recipe-button v-if="canEdit" :recipeId="recipeId" classes="ml-1" />
    <new-version-button v-if="canEdit" :recipeId="recipeId" classes="ml-1" />
  </fragment>
</template>

<script>
import EditRecipeButton from "./EditRecipeButton.vue";
import MixButton from "./MixButton.vue";
import RemixButton from "./RemixButton.vue";
import NewVersionButton from "@/components/common/controls/NewVersionButton";
export default {
  components: { NewVersionButton, MixButton, RemixButton, EditRecipeButton },
  name: "RecipeActions",
  props: {
    recipeId: {
      type: Number,
      required: true
    },
    canEdit: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style></style>
