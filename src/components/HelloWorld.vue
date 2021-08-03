<template>
  <v-container>
    <v-row v-if="items.length > 0">
      <v-col cols="12" class="text-center"> <h3>Our Products</h3></v-col>
      <v-col
        cols="12"
        lg="4"
        md="6"
        class="d-flex flex-column"
        v-for="(item, n) in items"
        :key="n"
      >
        <v-card
          class="flex d-flex flex-column"
          link
          :to="{ name: 'Products', params: { pId: item.id } }"
        >
          <v-img
            class="white--text align-end cardImg"
            contain
            :src="item.image_url"
          >
          </v-img>
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-subtitle class="font-weight-bold">
            ${{ item.price }}
          </v-card-subtitle>

          <v-card-actions>
            <v-btn color="orange" text small>
              View Item
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" class="text-center"> <h3>Our Products</h3></v-col>
      <v-col
        cols="12"
        lg="4"
        md="6"
        class="d-flex flex-column"
        v-for="n in 9"
        :key="n"
      >
        <v-skeleton-loader type="card"></v-skeleton-loader
      ></v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",

  data: () => ({
    items: [],
  }),

  methods: {
    getProducts() {
      axios
        .get(`${process.env.VUE_APP_API_BASE_URL}/products`)
        .then((response) => {
          // Handle success.
          this.items = response.data;
          //   let jwt = response.data.jwt;
          //   this.$store.commit("SET_USER_STATE", user);
          //   this.$store.commit("SET_USER_TOKEN", jwt);
          //   localStorage.setItem("jwt", jwt);
          //   localStorage.setItem("user", JSON.stringify(user));
          //   this.$router.push("/dashboard");
        })
        .catch((error) => {
          // Handle error.
          console.log("An error occurred:", error.response);
        });
    },
    increment() {
      this.$store.commit("increment");
    },
  },

  created() {
    this.getProducts();
  },
};
</script>
