<template>
  <div>
    <div>
      <label for="username">Username</label>
      <input type="text" v-model="username" id="username" />
    </div>
    <div>
      <label for="password">Password</label>
      <input type="password" v-model="password" id="password" />
    </div>
    <button type="button" @click="submit">Login</button>
  </div>
</template>

<script>
import { API_URL } from "@/config";
import { postJson } from "@/util/requests";
import notify from "@/notifications";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async submit() {
      const data = { username: this.username, password: this.password };
      const url = `${API_URL}/auth/authenticate`;
      const r = await postJson(url, {
        data,
        onFailure: () => notify.error("Login failed")
      });
      if (!r) return;
      this.$store.dispatch("fetchFlavorStash");
      this.$store.dispatch("setUser", r);
      notify.success("Successfully logged in");
    }
  }
};
</script>

<style scoped></style>
