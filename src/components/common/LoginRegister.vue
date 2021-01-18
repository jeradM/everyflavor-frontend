<template>
  <div class="flex flex-col items-stretch p-4">
    <span
      class="absolute cursor-pointer"
      style="top: .75rem; right: .75rem"
      @click="close"
    >
      <svg-icon type="mdi" :path="closeIcon" :size="20" />
    </span>
    <h1 class="text-center font-alt text-lg font-thin uppercase mb-4">
      {{ registering ? "Register" : "Login" }}
    </h1>
    <div class="has-error text-center text-sm font-normal" v-if="error">
      {{ error }}
    </div>
    <div class="flex flex-col my-2">
      <label for="username" class="label sr-only">Username</label>
      <input
        id="username"
        ref="username"
        type="text"
        class="text-input"
        placeholder="Username"
        @keyup.enter="handleEnter"
        v-model="credentials.username"
      />
    </div>
    <template v-if="!registering">
      <div class="flex flex-col my-2">
        <label for="password" class="label sr-only">Password</label>
        <input
          id="password"
          type="password"
          class="text-input"
          placeholder="Password"
          @keyup.enter="handleEnter"
          v-model="credentials.password"
        />
      </div>
      <div class="mt-3 flex">
        <button
          class="btn small bg-primary text-primary mr-1 flex-grow"
          type="button"
          @click="handleEnter"
        >
          Login
        </button>
        <button
          class="btn small bg-secondary text-secondary flex-grow"
          type="button"
          @click="handleRegisterClick"
        >
          Register
        </button>
      </div>
    </template>
    <template v-if="registering">
      <div class="flex flex-col my-2">
        <label for="register-email" class="label sr-only">Email</label>
        <input
          id="register-email"
          type="text"
          class="text-input"
          placeholder="Email"
          @keyup.enter="handleEnter"
          v-model="credentials.email"
        />
      </div>
      <div class="flex flex-col my-2">
        <label for="register-password" class="label sr-only">Password</label>
        <input
          id="register-password"
          type="password"
          class="text-input"
          placeholder="Password"
          @keyup.enter="handleEnter"
          v-model="credentials.password"
        />
      </div>
      <div class="flex flex-col my-2">
        <label for="register-confirm" class="label sr-only"
          >Confirm Password</label
        >
        <input
          id="register-confirm"
          type="password"
          class="text-input"
          placeholder="Confirm Password"
          @keyup.enter="handleEnter"
          v-model="credentials.passwordC"
        />
      </div>
      <div class="mt-3 flex">
        <button
          class="btn small bg-primary text-primary mr-1 flex-grow"
          type="button"
          @click="register"
        >
          Submit
        </button>
        <button
          class="btn small bg-default text-default flex-grow"
          type="button"
          @click="handleBackClick"
        >
          Back
        </button>
      </div>
    </template>
  </div>
</template>

<script>
import { login, register } from "@/util/user";
import notify from "@/notifications";
import storage from "@/util/storage";
import { mdiClose } from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";

export default {
  name: "LoginRegister",
  components: { SvgIcon },
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
  computed: {
    closeIcon() {
      return mdiClose;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logout");
    },
    handleBackClick() {
      this.registering = false;
      this.error = "";
    },
    handleRegisterClick() {
      this.registering = true;
      this.error = "";
    },
    async handleEnter() {
      if (this.registering) {
        await this.register();
      } else {
        await this.login();
      }
    },
    async login() {
      const t = this;
      if (this.busy) return;
      this.busy = true;
      const { username, password } = this.credentials;
      login({
        username,
        password,
        onFailure: () => {
          t.error = "Authentication failed";
          t.busy = false;
        },

        onSuccess: r => {
          t.$store.dispatch("user/loadStash");
          t.$store.dispatch("user/login", r.data);
          notify.success("Successfully logged in");
          t.credentials = {
            username: "",
            password: "",
            email: "",
            passwordC: ""
          };
          t.error = "";
          t.busy = false;
          storage.clear();
          t.$emit("logged-in");
          t.close();
        }
      });
    },
    register() {
      const t = this;
      if (this.busy) return;
      this.busy = true;
      // const url = `${API_URL}/auth/register`;
      const { username, email, password, passwordC } = this.credentials;
      register({
        username,
        email,
        password,
        passwordC,
        onFailure: () => {
          t.error = "Registration failed";
          t.busy = false;
        },
        onSuccess: () => {
          notify.success("Registration successful. You may now login");
          this.credentials = {
            username: "",
            password: "",
            email: "",
            passwordC: ""
          };
          this.error = "";
          this.busy = false;
          this.registering = false;
          storage.clear();
          this.$emit("registered");
        }
      });
    },
    close() {
      this.$modal.hide("LoginRegister");
    }
  },
  mounted() {
    console.log(this.$refs);
    this.$refs.username.focus();
  }
};
</script>

<style scoped></style>
