<template>
  <div class="p-6 max-w-4xl mx-auto">
    <div class="p-4">
      <div class="text-2xl">@{{ user.username }}</div>
      <StarRating
        :increment="0.01"
        :rating="(stats.avgRating / 1000).toFixed(2)"
        :star-size="20"
        :read-only="true"
        :active-color="'var(--color-bg-secondary)'"
        inline
        text-class="text-xs text-soft relative mt-2"
      />
      <div class="text-soft text-sm my-2">
        <span>Public Recipes: {{ stats.numPublic }}</span>
        <span class="mx-2">Private Recipes: {{ stats.numPrivate }}</span>
      </div>
    </div>
    <h2 class="text-body px-2 text-bold">My Recipes</h2>
    <table class="w-full h-8 overflow-auto">
      <thead>
        <th class="table-header">Title</th>
        <th class="table-header w-1/16">Created</th>
        <th class="table-header w-1/16">Rating</th>
      </thead>
      <tbody>
        <tr v-for="recipe of recipes" :key="recipe.id">
          <td class="table-cell">
            <router-link :to="`/recipe/view/${recipe.id}`" class="hover-link">{{
              recipe.title
            }}</router-link>
          </td>
          <td class="table-cell">{{ dateString(recipe.createdAt) }}</td>
          <td class="table-cell">{{ (recipe.avgRating / 1000).toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { fetchUser, fetchUserStats } from "@/util/user";
import { fetchMyRecipes } from "@/util/recipe";
import { currentUser } from "@/store";
import { dateString } from "@/util/helpers";

export default {
  name: "Profile",
  data() {
    return {
      user: {},
      stats: {},
      recipes: [],
      count: 0,
      recipeParams: {
        title: "",
        sort: "created_at",
        order: "desc",
        limit: 25,
        offset: 0,
      },
    };
  },
  methods: {
    dateString(d) {
      return dateString(d);
    },
  },
  async mounted() {
    const user = currentUser();
    this.user = await fetchUser(user.id);
    this.stats = await fetchUserStats(user.id);

    const recipes = await fetchMyRecipes();
    this.recipes = recipes.result;
  },
};
</script>

<style></style>
