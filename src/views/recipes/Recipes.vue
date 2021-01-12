<template>
  <div class="flex flex-col items-stretch pt-4 px-4 max-w-4xl mx-auto">
    <div class="flex items-stretch mb-2">
      <Search
        placeholder="Search"
        :value="params.title"
        @input="onTitle"
        @search="onSearch"
        :icon-path="searchIcon"
        :button="true"
        :classes="{
          wrapper: ['flex-grow', 'shadow']
        }"
      />
      <button class="ml-2">Advanced</button>
    </div>
    <div class="mt-4 mb-1 flex justify-end">
      <Pagination
        :limit="params.limit"
        :offset="params.offset"
        :total="count"
        :disabled="false"
        @limit="onLimit"
        @offset="onOffset"
      />
    </div>
    <RecipeList
      :recipes="recipes"
      :sort="params.sort"
      :reverse="params.order === 'desc'"
      @sorted="onSorted"
    />
    <div class="mt-1 mb-3 flex justify-end">
      <Pagination
        :limit="params.limit"
        :offset="params.offset"
        :total="count"
        :disabled="false"
        @limit="onLimit"
        @offset="onOffset"
      />
    </div>
    <div></div>
  </div>
</template>

<script>
import Search from "../../components/common/controls/Search";
import { mdiMagnify } from "@mdi/js";
import Pagination from "@/components/common/controls/Pagination";
import RecipeList from "../../components/recipe/RecipeList";
// import storage from "@/util/storage";

export default {
  name: "Recipes",
  components: { Pagination, RecipeList, Search },
  data() {
    return {
      title: ""
    };
  },
  computed: {
    params() {
      return this.$store.getters["recipes/params"];
    },
    recipes() {
      return this.$store.getters["recipes/recipes"];
    },
    count() {
      return this.$store.state.recipes.total;
    },
    searchIcon: () => mdiMagnify
  },
  methods: {
    onSearch() {
      this.$store.dispatch("recipes/search");
    },
    onTitle(title) {
      this.$store.dispatch("recipes/setParams", { title });
    },
    onSorted(col) {
      let sort = this.params.sort,
        order = this.params.order;
      if (sort === col) {
        order = order === "asc" ? "desc" : "asc";
      } else {
        sort = col;
        order = "asc";
      }
      this.$store.dispatch("recipes/setParams", { sort, order });
    },
    onLimit(limit) {
      this.$store.dispatch("recipes/setParams", { limit });
    },
    onOffset(offset) {
      this.$store.dispatch("recipes/setParams", { offset });
    }
  },
  mounted() {
    // setTimeout(this.onSearch, 1);
    this.onSearch();
  }
};
</script>

<style scoped></style>
