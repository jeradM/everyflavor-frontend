<template>
  <div class="flex" :class="classes">
    <div class="flex-grow p-4 flex flex-col">
      <div class="text-3xl mb-0">{{ user.username }}</div>
      <StarRating
        :increment="0.01"
        :rating="avgRating"
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
      <div>
        <FollowUserButton :user-id="user.id" />
      </div>
    </div>
    <div class="square-image p-4">
      <img
        src="https://source.unsplash.com/random/128x128"
        class="shadow rounded"
      />
    </div>
  </div>
</template>

<script>
import FollowUserButton from "@/components/common/controls/FollowUserButton";
import StarRating from "vue-star-rating";
export default {
  name: "UserHeader",
  components: { FollowUserButton, StarRating },
  props: {
    user: {
      type: Object,
      required: true,
    },
    stats: {
      type: Object,
      required: true,
    },
    classes: {
      type: [String, Object, Array],
      default: "",
    },
  },
  computed: {
    avgRating() {
      return parseFloat((this.stats.avgRating / 1000).toFixed(2));
    },
  },
};
</script>

<style scoped>
.square-image {
  height: 80%;
}
.square-image > img {
  display: inline-block;
  height: 100%;
}
.square-image > img:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}
</style>
