<template>
  <div class="p-4 text-sm font-alt">
    <p class="font-alt mb-4">
      Once published, you will no longer be able to edit this recipe. To make
      changes you will have to create a new version.
    </p>
    <p class="font-alt mb-4 text-center">Are you sure?</p>
    <div class="flex items-stretch">
      <button class="btn error flex-grow mx-1" @click="onPublish(name)">
        Yes, publish it
      </button>
      <button class="btn secondary flex-grow mx-1" @click="cancel">
        No, keep it private
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PublishModal",
  props: {
    onPublish: {
      type: Function,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  methods: {
    cancel() {
      this.$modal.hide(this.name);
    }
  }
};
</script>

<style scoped></style>
