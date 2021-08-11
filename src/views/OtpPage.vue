<template>
  <div class="otp-page">
    <v-container class="mt-3">
      <v-row align="center">
        <v-btn
          small
          text
          plain
          :ripple="false"
          class="text-capitalize font-weight-light"
          to="/cart"
        >
          <v-icon color="blue" left>
            mdi-arrow-left
          </v-icon>
          Back
        </v-btn>
        <div class="mx-auto"><h3>Enter Code</h3></div>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" lg="12" md="10" class="text-center">
          <div class="input-wrapper">
            <PincodeInput v-model="code" placeholder="0" class="mx-auto" />
          </div>
        </v-col>
        <v-col cols="8" lg="3" class="text-center">
          <v-btn
            :loading="loading"
            color="orange darken-3"
            class="mb-2"
            depressed
            tile
            block
            @click="verify"
          >
            <span class="white--text">Verify</span>
          </v-btn>
          Didn't get a code?
          <strong class="orange--text" @click="sendOtp">Resend</strong>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog
      v-model="errorModal"
      transition="dialog-top-transition"
      max-width="400"
    >
      <v-card>
        <v-card-text class="pa-12">
          <v-img contain src="@/assets/img/error.gif"></v-img>
          <div class="text-h4 text-center">{{ msg }}</div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import PincodeInput from "vue-pincode-input";
import axios from "axios";

export default {
  name: "OtpPage",
  components: {
    PincodeInput,
  },
  data() {
    return {
      loading: false,
      errorModal: false,
      msg: "",
      val: "",
      code: "",
    };
  },
  methods: {
    async codeRule() {
      if (this.code) {
        return parseInt(this.code) === this.$store.state.otp
          ? "Match"
          : "Invalid";
      }
    },
    async verify() {
      let valid = await this.codeRule();
      if (valid == "Invalid") {
        this.msg = "Invalid Code!!";
        this.errorModal = true;
      } else {
        if (
          this.$store.state.totalPrice > 100000 &&
          this.$store.state.user.email === "dialaegwuchukwu@gmail.com"
        ) {
          this.msg = "Potential fraud!!";
          this.errorModal = true;
        } else {
          this.errorModal = false;
          location.href = `https://diala-api.herokuapp.com/book?name=${this.$store.state.user.username}&email=${this.$store.state.user.email}&amount=${this.$store.state.totalPrice}`;
        }
      }
    },
    sendOtp() {
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
          console.log(response.data);
        })
        .catch((error) => {
          // Handle error.
          console.log("An error occurred:", error.response);
        });
    },
    saveOtp() {
      this.$store.commit("SAVE_OTP", this.val);
    },
  },
};
</script>
