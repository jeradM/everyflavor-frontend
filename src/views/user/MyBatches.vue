<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-body px-2 text-xl mb-3">My Recipes</h1>
    <table class="min-w-full divide-y flex-grow">
      <tr>
        <th class="table-header">Recipe</th>
        <th class="table-header w-1/6">Created</th>
        <!--        <th class="table-header w-1/6">Rating</th>-->
      </tr>
      <tr v-for="batch of batches" :key="batch.id">
        <td class="table-cell">
          <router-link :to="`/batch/view/${batch.id}`" class="hover-link">{{
            batch.recipe.title
          }}</router-link>
        </td>
        <td class="table-cell">{{ dateString(batch.createdAt) }}</td>
        <!--        <td class="table-cell">{{ (recipe.avgRating / 1000).toFixed(2) }}</td>-->
      </tr>
    </table>
  </div>
</template>

<script>
import { dateString } from "@/util/helpers";
import { mdiMagnify } from "@mdi/js";

export default {
  name: "MyBatches",
  data() {
    return {
      stats: {},
      count: 0,
      params: {
        title: "",
        sort: "created_at",
        order: "desc",
        limit: 25,
        offset: 0,
      },
    };
  },
  computed: {
    batches() {
      return this.$store.getters["user/batches"];
    },
    searchIcon: () => mdiMagnify,
  },
  methods: {
    dateString(d) {
      return dateString(d);
    },
  },
  async mounted() {
    this.$store.dispatch("user/loadBatches");
  },
};
</script>

<style></style>
