<template>
  <div>
    <v-img
      :src="require('@/assets/img/logo.png')"
      contain
      height="50"
      class="mb-4"
    />
    <h1 class="mb-4">Register here</h1>
    <v-form ref="registerform" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Name"
        outlined
        dense
        required
      ></v-text-field>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        outlined
        dense
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="passwordRules"
        label="Password"
        :type="show1 ? 'text' : 'password'"
        @click:append="show1 = !show1"
        outlined
        dense
        required
      ></v-text-field>
      <v-btn
        :disabled="!valid"
        :loading="loading"
        color="orange darken-3"
        class="mr-4"
        @click="validate"
        depressed
        tile
        block
      >
        <span class="white--text">Register</span>
      </v-btn>
      <p class="text-center mt-4">
        Already have an account?
        <router-link to="/login" class="link orange--text text--darken-3">
          <strong>Login</strong></router-link
        >
      </p>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  layout: "landing",
  data() {
    return {
      valid: true,
      loading: false,
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      show1: false,
      password: "",
      passwordRules: [(v) => !!v || "Password is required"],
      name: "",
      nameRules: [(v) => !!v || "Full Name is required"],
    };
  },
  methods: {
    validate() {
      if (this.$refs.registerform.validate()) {
        this.registerUser();
      }
    },
    registerUser() {
      this.loading = true;
      axios
        .post(`${process.env.VUE_APP_API_BASE_URL}/auth/local/register`, {
          username: this.name,
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          // Handle success.
          this.loading = false;
          console.log(response.data);
          //   let jwt = response.data.jwt;
          //   let user = response.data.user;
          //   this.$store.commit("SET_USER_STATE", user);
          //   this.$store.commit("SET_USER_TOKEN", jwt);
          //   localStorage.setItem("jwt", jwt);
          //   localStorage.setItem("user", JSON.stringify(user));
          //   this.$router.push("/dashboard");
        })
        .catch((error) => {
          // Handle error.
          this.loading = false;
          console.log("An error occurred:", error.response);
        });
    },
  },
};
</script>
