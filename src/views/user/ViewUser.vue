<template>
  <div class="p-6 max-w-4xl mx-auto">
    <UserHeader :user="user" :stats="stats" classes="border" />
    <RecipeList
      :recipes="recipes"
      :sort="recipeParams.sort"
      :reverse="recipeParams.order === 'desc'"
      @sorted="onSorted"
    />
  </div>
</template>

<script>
import UserHeader from "@/components/user/UserHeader";
import RecipeList from "@/components/recipe/RecipeList";
import { fetchRecipes } from "@/util/recipe";
import { fetchUser } from "@/util/user";
export default {
  components: { RecipeList, UserHeader },
  name: "ViewUser",
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
        offset: 0
      }
    };
  },
  methods: {
    async search() {
      const r = await fetchRecipes(
        Object.assign(this.recipeParams, { userId: this.user.id })
      );
      if (r) {
        this.recipes = r.results;
        this.count = r.count;
      }
    },
    onSorted(col) {
      if (this.recipeParams.sort === col) {
        this.recipeParams.order =
          this.recipeParams.order === "asc" ? "desc" : "asc";
      } else {
        this.recipeParams.sort = col;
        this.recipeParams.order = "asc";
      }
      this.search();
    }
  },
  async mounted() {
    const id = parseInt(this.$route.params.id);
    this.user = await fetchUser(id);
    this.stats = this.user.stats;
    this.search();
  }
};
</script>

<style></style>
