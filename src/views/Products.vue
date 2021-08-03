<template>
  <div class="products">
    <v-container class="mb-8">
      <v-row justify="center">
        <v-col cols="12">
          <v-btn color="black" class="text-capitalize" dark to="/"
            >Back to shop</v-btn
          >
        </v-col>
        <v-col cols="12" lg="4">
          <v-img :src="item.image_url" :alt="item.name" contain></v-img>
        </v-col>
        <v-col cols="12" lg="8">
          <h4 class="text-h4 mb-2">{{ item.name }}</h4>
          <h6 class="text-h6">
            <strong>${{ item.price }}</strong>
          </h6>
          <v-divider class="my-3"></v-divider>
          <p class="grey--text">{{ item.description }}</p>
          <p class="font-weight-bold">Quantity:</p>
          <p class="font-weight-bold">Category:</p>
          <v-btn color="black" class="text-capitalize" dark @click="addToCart">
            <span class="orange--text">Add to cart</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col cols="12" class="text-center">
          <h3>Related Products</h3>
          <v-divider class="my-3"></v-divider>
        </v-col>
        <v-col
          cols="12"
          lg="4"
          md="6"
          class="d-flex flex-column"
          v-for="(item, n) in item.related_products"
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
              <v-btn color="orange" text small @click="increment">
                Add to Cart
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Products",

  data: () => ({
    item: {},
  }),

  methods: {
    getProduct() {
      axios
        .get(
          `${process.env.VUE_APP_API_BASE_URL}/products/${this.$route.params.pId}`
        )
        .then((response) => {
          // Handle success.
          this.item = response.data;
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
    addToCart() {
      this.$store.commit("ADD_TO_CART", this.item);
      this.increment();
    },
  },

  created() {
    this.getProduct();
  },
};
</script>
