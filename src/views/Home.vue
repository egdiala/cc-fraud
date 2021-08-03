<template>
  <div>
    <v-img
      src="https://daniel-e-ccomerce.netlify.app/static/media/products-heading.67bc3f6c.jpg"
      min-height="400"
    >
      <v-container fluid fill-height>
        <v-row align="center" justify="center">
          <v-col cols="12" lg="8" md="6" class="text-center">
            <h4 class="text-uppercase orange--text text--darken-3">
              new arrivals
            </h4>
            <h2 class="text-uppercase white--text ls-5 text-h2">
              sixteen products
            </h2>
          </v-col>
        </v-row>
      </v-container>
    </v-img>
    <hello-world />
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld";

export default {
  name: "Home",

  components: {
    HelloWorld,
  },
};
</script>
