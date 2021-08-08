<template>
  <div class="cart">
    <v-container class="mt-3">
      <v-row align="center">
        <v-btn
          small
          text
          plain
          :ripple="false"
          class="text-capitalize font-weight-light"
          to="/"
        >
          <v-icon color="blue" left>
            mdi-arrow-left
          </v-icon>
          Back
        </v-btn>
        <h3 class="mx-auto">Cart summary</h3>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" v-for="(item, n) in $store.state.cart" :key="n">
          <v-card>
            <v-card-text>
              <v-list>
                <v-list-item two-line>
                  <v-list-item-avatar size="50" tile>
                    <img :src="item.image_url" />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{
                      item.sub_description
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn
                      color="red"
                      icon
                      @click="$store.state.cart.splice(n, 1)"
                      ><v-icon>mdi-trash-can-outline</v-icon></v-btn
                    >
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              <v-row justify="end" class="px-9">
                <strong class="text-button font-weight-bold black--text"
                  >${{ item.price }}</strong
                >
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <div class="float-right mr-9">
            <strong>Total: </strong>
            <span>${{ totalPrice }}</span>
          </div>
        </v-col>
        <v-col cols="12" lg="4" md="6">
          <v-btn
            :loading="loading"
            color="orange darken-3"
            depressed
            tile
            block
            @click="sendOtp"
          >
            <span class="white--text">Proceed</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="dialog" hide-overlay persistent width="300">
      <v-card color="primary" class="pt-2" dark>
        <v-card-text>
          Sending OTP...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Cart",
  data() {
    return {
      val: "",
      totalPrice: 0,
      loading: false,
      dialog: false,
    };
  },
  methods: {
    sendOtp() {
      this.loading = true;
      this.dialog = true;
      this.val = Math.floor(1000 + Math.random() * 9000);
      this.saveOtp();
      axios
        .post(`${process.env.VUE_APP_API_BASE_URL}/emails`, {
          email: this.$store.state.user.email,
          subject: "OTP Validation",
          custom_html: `<p>Kindly input the otp code: ${this.val}</p>`,
        })
        .then((response) => {
          // Handle success.
          this.loading = false;
          this.dialog = false;
          console.log(response.data);
          this.$router.push("/process");
        })
        .catch((error) => {
          // Handle error.
          this.loading = false;
          this.dialog = false;
          console.log("An error occurred:", error.response);
        });
    },
    total() {
      if (this.$store.state.cart[0]) {
        let items = this.$store.state.cart;
        for (let i = 0; i < items.length; i++) {
          this.totalPrice += items[i].price;
        }
      }
    },
    saveOtp() {
      this.$store.commit("SAVE_OTP", this.val);
    },
  },
  mounted() {
    this.total();
  },
};
</script>
