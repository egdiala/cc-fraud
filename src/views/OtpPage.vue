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
          <div class="input-wrapper ">
            <PincodeInput v-model="code" placeholder="0" class="mx-auto" />
          </div>
          {{ codeRule() }}
        </v-col>
        <v-col cols="4">
          <v-btn
            :loading="loading"
            color="orange darken-3"
            depressed
            tile
            block
          >
            <span class="white--text">Verify</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PincodeInput from "vue-pincode-input";

export default {
  name: "OtpPage",
  components: {
    PincodeInput,
  },
  data() {
    return {
      loading: false,
      code: "",
    };
  },
  methods: {
    codeRule() {
      if (this.code) {
        return parseInt(this.code) === this.$store.state.otp
          ? "Match"
          : "Invalid";
      }
    },
  },
};
</script>
