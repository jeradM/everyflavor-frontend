<template>
  <div class="flex flex-col mb-4 rounded-sm border shadow-sm">
    <div
      class="flex py-2 px-3 text-xs md:text-sm border-b bg-body-accent text-left"
    >
      <span class="w-1/3 md:w-1/2">
        <router-link :to="viewUrl">{{ recipe.title }}</router-link>
      </span>
      <span class="w-3/12 md:w-3/12">
        <router-link :to="userUrl" class="hover-link">
          @{{ recipe.ownerUsername }}</router-link
        >
      </span>
      <span class="w-3/12 md:w-1/6">{{ createdDate }}</span>
      <span class="w-1/6 md:w-1/12">{{ rating }}</span>
    </div>
    <div class="flex items-stretch">
      <div class="p-3">
        <div class="w-32 h-full">
          <img
            :src="'https://source.unsplash.com/random/128x128?i=' + recipe.id"
          />
        </div>
      </div>
      <div class="flex-grow text-sm text-default-soft p-3 description">
        <div class="h-full overflow-y-hidden">
          {{ recipe.description }}
        </div>
      </div>
    </div>
    <div class="flex justify-center cursor-pointer" @click="isOpen = !isOpen">
      <svg-icon type="mdi" :path="isOpen ? upIcon : downIcon" />
    </div>
    <div v-if="isOpen" class="px-2 py-1 h-auto">
      <div class="flex justify-end inline-block">
        <RecipeActions
          :canEdit="canEdit"
          :recipeId="recipe.id"
          :published="recipe.public"
        />
      </div>
      <RecipeFormFlavors :recipe-flavors="recipe.flavors" striped read-only />
      <div class="text-xs text-soft py-2">
        <RecipeSummary :recipe="recipe" />
      </div>
    </div>
  </div>
</template>

<script>
import RecipeFormFlavors from "./RecipeFormFlavors";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";
import RecipeActions from "../common/controls/RecipeActions.vue";
import { canEditRecipe } from "@/util/auth";
import RecipeSummary from "@/components/recipe/RecipeSummary";

export default {
  name: "RecipeListItem",
  components: { RecipeSummary, RecipeFormFlavors, RecipeActions, SvgIcon },
  data() {
    return {
      isOpen: false
    };
  },
  props: {
    recipe: Object,
    idx: Number
  },
  computed: {
    viewUrl() {
      return `/recipe/view/${this.recipe.id}`;
    },
    userUrl() {
      return `/user/view/${this.recipe.ownerId}`;
    },
    rating() {
      return (this.recipe.avgRating / 1000).toFixed(2);
    },
    randBg() {
      const bgs = [
        "blue",
        "green",
        "gray",
        "yellow",
        "red",
        "indigo",
        "pink",
        "purple",
        "orange"
      ];
      const i = this.recipe.id % 9;
      return `bg-${bgs[i]}-300`;
    },
    createdDate() {
      const d = new Date(this.recipe.createdAt);
      return d.toLocaleDateString();
    },
    canEdit() {
      return canEditRecipe(this.recipe);
    },
    downIcon: () => mdiChevronDown,
    upIcon: () => mdiChevronUp
  }
};
</script>

<style scoped>
.description {
  height: 125px;
}
</style>
