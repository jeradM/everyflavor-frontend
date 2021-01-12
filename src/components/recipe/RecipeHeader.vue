<template>
  <div
    class="text-center sm:text-left flex flex-col sm:flex-row"
    :class="classes"
  >
    <div class="flex-grow">
      <div class="inline-block" :class="{ 'mb-4': !compact }">
        <h1
          class="text-body tracking-wider font-medium mb-0"
          :class="{ 'text-2xl': !compact, 'text-xl': compact }"
        >
          {{ recipe.title }}
        </h1>
        <p class="text-soft">
          <router-link :to="`/user/view/${recipe.ownerId}`">
            @{{ recipe.ownerUsername }}
          </router-link>
        </p>
        <star-rating
          :increment="0.01"
          :rating="rating"
          :star-size="20"
          :read-only="true"
          :active-color="'var(--color-bg-secondary)'"
          :inactive-color="'var(--color-gray)'"
          inline
          text-class="text-xs text-soft relative mt-2"
        />
      </div>
      <div
        v-if="showActions && recipe.id"
        class="flex justify-center sm:justify-start inline-block"
      >
        <recipe-actions :recipeId="recipe.id" :canEdit="canEdit" />
      </div>
    </div>
    <div
      class="text-center sm:text-left sm:float-right sm:pl-4 sm:pb-2 sm:pt-0 pt-2"
    >
      <img
        :src="'https://source.unsplash.com/random/128x128?i=' + recipe.id"
        class="mx-auto sm:m-0 shadow rounded"
        :class="{ 'w-24': compact, 'w-40': !compact }"
        alt="recipe image"
      />
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import RecipeActions from "@/components/common/controls/RecipeActions";
import { canEditRecipe } from "@/util/auth";

export default {
  name: "RecipeHeader",
  components: { RecipeActions, StarRating },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    showActions: {
      type: Boolean,
      default: false
    },
    classes: String,
    compact: Boolean
  },
  computed: {
    canEdit() {
      return canEditRecipe(this.recipe);
    },
    rating() {
      return parseFloat((this.recipe.avgRating / 1000).toFixed(2));
    }
  },
  methods: {
    createBatch() {
      this.$router.push({
        name: "createBatch",
        query: { recipeId: this.recipe.id }
      });
    }
  }
};
</script>

<style></style>
