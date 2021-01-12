<template>
  <div class="flex flex-col items-stretch pt-4 px-4 max-w-4xl mx-auto">
    <div class="flex items-center">
      <Search
        v-model="params.query"
        @changed="setQuery"
        placeholder="Search"
        :classes="{ wrapper: ['flex-grow', 'shadow', 'relative', 'mr-2'] }"
      />
      <button class="btn-text default text-sm" @click="clearParams">
        Clear
      </button>
    </div>
    <div class="mt-4 mb-1 flex">
      <span class="flex-grow">
        <button
          class="btn xsmall primary"
          :class="classes"
          role="link"
          @click="reloadFlavors"
        >
          Reload Flavors
        </button>
      </span>
      <Pagination
        :limit="params.limit"
        :offset="params.offset"
        :total="total"
        :disabled="!!params.query"
        @limit="setLimit"
        @offset="setOffset"
      />
    </div>
    <div class="flex justify-center">
      <table class="min-w-full divide-y flex-grow" v-if="loaded">
        <tr class="cursor-pointer select-none">
          <th @click="setSort('vendor')" class="table-header w-1/6">
            <div class="flex items-center">
              <span class="flex-grow">Vendor</span>
              <SortIndicator
                :active="params.sort === 'vendor'"
                :desc="params.reverse"
              />
            </div>
          </th>
          <th @click="setSort('name')" class="table-header w-1/2">
            <div class="flex items-center">
              <span>Flavor</span>
              <SortIndicator
                :active="params.sort === 'name'"
                :desc="params.reverse"
              />
            </div>
          </th>
          <th @click="setSort('recipes', true)" class="table-header w-1/6">
            <div class="flex items-center">
              <span>Recipes</span>
              <SortIndicator
                :active="params.sort === 'recipes'"
                :desc="params.reverse"
              />
            </div>
          </th>
          <th @click="setSort('rating', true)" class="table-header w-1/6">
            <div class="flex items-center">
              <span>Avg %</span>
              <SortIndicator
                :active="params.sort === 'rating'"
                :desc="params.reverse"
              />
            </div>
          </th>
        </tr>
        <template v-for="flavor of flavors">
          <tr
            class="hover-link cursor-pointer"
            role="link"
            tabindex="0"
            :key="flavor.id"
            @keydown.enter="showFlavor(flavor.id)"
            @click="showFlavor(flavor.id)"
          >
            <td class="table-cell" :title="flavor.vendor.name">
              {{ flavor.vendor.abbreviation }}
            </td>
            <td class="table-cell">{{ flavor.name }}</td>
            <td class="table-cell">{{ flavor.recipeCount }}</td>
            <td class="table-cell">
              {{ (flavor.avgPercent / 1000).toFixed(2) }}
            </td>
          </tr>
        </template>
      </table>

      <div v-if="!loaded">Loading...</div>
    </div>
    <div class="mt-4 mb-1 flex justify-end">
      <Pagination
        :limit="params.limit"
        :offset="params.offset"
        :total="total"
        :disabled="!!params.query"
        @limit="setLimit"
        @offset="setOffset"
      />
    </div>
  </div>
</template>

<script>
import Search from "@/components/common/controls/Search";
import Pagination from "@/components/common/controls/Pagination";
import SortIndicator from "@/components/common/SortIndicator";

export default {
  name: "Flavors",
  components: { SortIndicator, Pagination, Search },
  props: {
    classes: {
      type: Object
    }
  },
  computed: {
    flavors() {
      return this.$store.state.flavors.searchResults;
    },
    loaded() {
      return this.$store.state.flavors.loaded;
    },
    total() {
      return this.$store.state.flavors.all.length;
    },
    params() {
      return this.$store.getters["flavors/searchParams"];
    }
  },
  methods: {
    setQuery(q) {
      this.$store.dispatch("flavors/setSearchParams", { query: q });
    },
    setLimit(l) {
      this.$store.dispatch("flavors/setSearchParams", { limit: l });
    },
    setOffset(o) {
      this.$store.dispatch("flavors/setSearchParams", { offset: o });
    },

    setSort(s, defaultDesc = false) {
      const { sort, reverse } = this.$store.getters["flavors/searchParams"];
      let _sort, _reverse;
      if (sort === s) {
        if (reverse !== defaultDesc) {
          _sort = "";
        }
        _reverse = !reverse;
      } else {
        _reverse = defaultDesc;
      }
      _sort = s;

      this.$store.dispatch("flavors/setSearchParams", {
        sort: _sort,
        reverse: _reverse
      });
    },

    clearParams() {
      this.$store.dispatch("flavors/setSearchParams", {
        query: "",
        limit: 100,
        offset: 0,
        sort: "",
        reverse: false
      });
    },

    showFlavor(id) {
      this.$router.push(`/flavors/${id}`);
    },

    reloadFlavors() {
      this.$store.dispatch("flavors/fetchFlavors", true);
    }
  },
  mounted() {
    this.$store.dispatch("flavors/setSearchParams");
  }
};
</script>

<style scoped></style>
