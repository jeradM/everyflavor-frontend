<template>
  <div class="flex flex-col items-stretch p-8 shadow-md">
    <RecipeHeader
      :recipe="recipe"
      @published="$emit('published')"
      show-actions
    />
    <p class="mt-4 text-soft text-sm leading-relaxed text-justify">
      {{ recipe.description }}
    </p>

    <p
      class="mt-4 text-soft text-sm leading-relaxed text-justify"
      v-if="recipe.remixOf"
    >
      Remix of:
      <router-link :to="`/recipe/view/${recipe.remixOfId}`" class="hover-link">
        {{ recipe.remixOf.title }}
      </router-link>
    </p>

    <div class="recipe-content mt-4 w-full border p-3">
      <h2 class="label sr-only">Flavors</h2>
      <RecipeFormFlavors :recipe-flavors="recipe.flavors" striped read-only />
    </div>
    <div class="mt-3 text-soft text-xs">
      <RecipeSummary :recipe="recipe" />
    </div>
  </div>
</template>

<script>
import RecipeFormFlavors from "./RecipeFormFlavors";
import RecipeHeader from "./RecipeHeader.vue";
import RecipeSummary from "@/components/recipe/RecipeSummary";
export default {
  name: "RecipeCard",
  components: { RecipeSummary, RecipeFormFlavors, RecipeHeader },
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  computed: {}
};
</script>

<style scoped>
.vue-star-rating {
  display: inline-block;
}
</style>
