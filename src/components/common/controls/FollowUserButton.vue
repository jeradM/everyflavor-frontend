<template>
  <button
    class="btn xsmall primary"
    :class="classes"
    role="link"
    @click="onClick"
  >
    Follow
  </button>
</template>

<script>
import notify from "@/notifications";

export default {
  name: "FollowUserButton",
  props: {
    userId: {
      type: Number,
      required: true
    },
    classes: String
  },
  methods: {
    onClick() {
      notify.info("Followed user " + this.userId);
    }
  }
};
</script>

<style></style>
