<template>
  <div class="relative pt-2">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "RecipeView",
  computed: {
    viewKey() {
      return this.$route.params.id || 0;
    },
  },
};
</script>

<style scoped></style>
