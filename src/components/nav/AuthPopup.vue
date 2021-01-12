<template>
  <transition name="slide">
    <div
      role="dialog"
      class="auth-dialog z-30 w-full md:w-auto fixed mt-0 mr-1 shadow border bg-body py-6 px-8 right-0"
      v-if="open"
    >
      <template v-if="loggedIn">
        <div class="flex flex-col items-stretch">
          <div class="w-full mb-3 text-xl">
            <router-link to="/user/profile" class="hover-link">
              @{{ user.username }}
            </router-link>
          </div>
          <ul class="w-full cursor-pointer">
            <li class="hover-link py-1 px-1 text-sm text-soft">
              <router-link to="/user/profile/recipes">My Recipes</router-link>
            </li>
            <li class="hover-link pb-1 px-1 text-sm text-soft">
              <router-link to="/user/profile/batches">My Batches</router-link>
            </li>
            <li class="hover-link pb-1 px-1 text-sm text-soft">
              <router-link to="/user/profile/stash">My Stash</router-link>
            </li>
          </ul>
          <div class="flex justify-end">
            <button class="btn xsmall error" type="button" @click="logout">
              Logout
            </button>
          </div>
        </div>
      </template>
      <template v-if="!loggedIn">
        <div class="has-error font-normal" v-if="error">{{ error }}</div>
        <div class="flex flex-col">
          <label for="username" class="label">Username</label>
          <input
            id="username"
            type="text"
            class="text-input"
            @keyup.enter="login"
            v-model="credentials.username"
          />
        </div>
        <div class="flex flex-col">
          <label for="password" class="label">Password</label>
          <input
            id="password"
            type="password"
            class="text-input"
            @keyup.enter="login"
            v-model="credentials.password"
          />
        </div>
        <div class="mt-2">
          <button
            class="btn bg-primary text-primary"
            type="button"
            @click="login"
          >
            Login
          </button>
        </div>
      </template>
    </div>
  </transition>
</template>

<script>
import { API_URL } from "@/config";
import notify from "@/notifications";
import { postJson } from "@/util/requests";
import storage from "@/util/storage";

export default {
  name: "AuthPopup",
  data() {
    return {
      error: "",
      busy: false,
      credentials: {
        username: "",
        password: ""
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
    },
    loggedIn() {
      return this.$store.getters["user/isLoggedIn"];
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logout");
    },

    async login() {
      const t = this;
      if (this.busy) return;
      this.busy = true;
      const url = `${API_URL}/auth/authenticate`;
      const r = await postJson(url, this.credentials, () => {
        t.error = "Authentication failed";
        t.busy = false;
      });
      if (!r) return;
      this.$store.dispatch("user/loadStash");
      this.$store.dispatch("user/login", r);
      notify.success("Successfully logged in");
      this.credentials.username = "";
      this.credentials.password = "";
      this.error = "";
      this.busy = false;
      storage.clear();
      this.$emit("logged-in");
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
  min-width: 400px;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(-120%);
}
</style>
