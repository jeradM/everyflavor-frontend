<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-body px-2 text-xl mb-3">My Recipes</h1>
    <Search
      placeholder="Search"
      :value="params.title"
      @input="onTitle"
      @search="searchRecipes"
      :icon-path="searchIcon"
      :button="true"
      :classes="{
        wrapper: ['flex-grow', 'shadow']
      }"
    />
    <table class="min-w-full divide-y flex-grow">
      <tr>
        <th class="table-header">Title</th>
        <th class="table-header w-1/6">Created</th>
        <th class="table-header w-1/6">Rating</th>
      </tr>
      <tr v-for="recipe of recipes" :key="recipe.id">
        <td class="table-cell">
          <router-link :to="`/recipe/view/${recipe.id}`" class="hover-link">{{
            recipe.title
          }}</router-link>
        </td>
        <td class="table-cell">{{ dateString(recipe.createdAt) }}</td>
        <td class="table-cell">{{ (recipe.avgRating / 1000).toFixed(2) }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { fetchUserStats } from "@/util/user";
import { dateString } from "@/util/helpers";
import Search from "@/components/common/controls/Search";
import { mdiMagnify } from "@mdi/js";

export default {
  name: "MyRecipes",
  components: { Search },
  data() {
    return {
      stats: {},
      count: 0
    };
  },
  computed: {
    recipes() {
      return this.$store.getters["user/recipes"];
    },
    params() {
      return this.$store.getters["user/recipeParams"];
    },
    searchIcon: () => mdiMagnify
  },
  methods: {
    searchRecipes() {
      this.$store.dispatch("user/searchRecipes");
    },
    onTitle(title) {
      this.$store.dispatch("user/setRecipeParams", { title });
    },
    dateString(d) {
      return dateString(d);
    }
  },
  async mounted() {
    const user = this.$store.getters["user/user"];
    this.stats = await fetchUserStats(user.id);
    this.$store.dispatch("user/searchRecipes");
  }
};
</script>

<style></style>
