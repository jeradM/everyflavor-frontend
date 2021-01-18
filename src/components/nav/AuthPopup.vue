<template>
  <transition name="slide">
    <div
      role="dialog"
      class="auth-dialog z-30 w-full md:w-auto fixed mt-0 mr-1 shadow border bg-body py-3 px-4 right-0"
      v-if="open"
    >
      <div class="flex flex-col items-stretch">
        <div class="w-full mb-4 text-xl text-center font-alt">
          <router-link to="/user/profile" class="hover-link">
            @{{ user.username }}
          </router-link>
        </div>
        <ul class="w-full cursor-pointer">
          <li class="hover-link py-2 px-1 text-sm text-soft">
            <router-link to="/user/profile/recipes">My Recipes</router-link>
          </li>
          <li class="hover-link pb-2 px-1 text-sm text-soft">
            <router-link to="/user/profile/batches">My Batches</router-link>
          </li>
          <li class="hover-link pb-2 px-1 text-sm text-soft">
            <router-link to="/user/profile/stash">My Stash</router-link>
          </li>
        </ul>
        <div class="flex mt-8">
          <button
            class="btn small error flex-grow"
            type="button"
            @click="logout"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "AuthPopup",
  data() {
    return {
      error: "",
      busy: false,
      registering: false,
      credentials: {
        username: "",
        password: "",
        email: "",
        passwordC: ""
      }
    };
  },
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logout");
      this.$emit("close-auth");
    },
    handleBlur(e) {
      if (!this.open) return;
      if (this.$el.contains(e.target)) return;
      // this.$emit("close-auth");
    }
  },
  mounted() {
    document.addEventListener("click", this.handleBlur);
  },
  unmounted() {
    document.removeEventListener("click", this.handleBlur);
  }
};
</script>

<style scoped>
.auth-dialog {
  min-width: 250px;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(-120%);
}
</style>
