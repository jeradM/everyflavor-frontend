<template>
  <div class="flex flex-col">
    <div
      class="flex py-2 px-3 text-sm uppercase tracking-wide border-b mb-2 select-none text-left"
    >
      <span
        class="table-header pl-0 pb-0 md:w-1/2 w-1/3 cursor-pointer text-left flex items-center"
        @click="onSort('title')"
      >
        Title
        <SortIndicator :active="sort === 'title'" :desc="reverse" />
      </span>
      <span
        class="table-header pl-0 pb-0 md:w-3/12 w-3/12 cursor-pointer flex items-center"
        @click="onSort('owner')"
      >
        Mixer
        <SortIndicator :active="sort === 'owner'" :desc="reverse" />
      </span>
      <span
        class="table-header pl-0 pb-0 md:w-1/6 w-3/12 cursor-pointer flex items-center"
        @click="onSort('created_at')"
      >
        Created
        <SortIndicator :active="sort === 'created_at'" :desc="reverse" />
      </span>
      <span
        class="table-header pl-0 pb-0 md:w-1/12 w-1/6 cursor-pointer flex items-center"
        @click="onSort('rating')"
      >
        Rating
        <SortIndicator :active="sort === 'rating'" :desc="reverse" />
      </span>
    </div>
    <RecipeListItem
      v-for="(r, idx) of recipes"
      :key="r.id"
      :recipe="r"
      :idx="idx"
    />
  </div>
</template>

<script>
import RecipeListItem from "./RecipeListItem";
import SortIndicator from "@/components/common/SortIndicator";
export default {
  name: "RecipeList",
  components: { RecipeListItem, SortIndicator },
  data() {
    return {
      // sort: "recipes.id",
      order: "asc"
    };
  },
  props: {
    recipes: {
      type: Array,
      default: () => []
    },
    reverse: {
      type: Boolean,
      default: false
    },
    sort: {
      type: String,
      default: "recipes.id"
    }
  },
  methods: {
    onSort(col) {
      this.$emit("sorted", col);
    }
  }
};
</script>

<style scoped></style>
