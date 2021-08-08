<template>
  <div>
    <v-app-bar app dense>
      <div class="d-flex align-center">
        <v-app-bar-title
          >Dee
          <strong class="orange--text text--darken-3"
            >STORES</strong
          ></v-app-bar-title
        >
      </div>

      <v-spacer></v-spacer>
      <v-badge
        bordered
        transition="fade"
        overlap
        color="red lighten-1"
        :content="$store.state.cart.length < 1 ? '0' : $store.state.cart.length"
      >
        <v-btn
          small
          plain
          icon
          color="orange darken-3"
          :ripple="false"
          to="/cart"
        >
          <v-icon>mdi-cart-outline</v-icon>
        </v-btn>
      </v-badge>
      <v-divider inset vertical class="mx-4"></v-divider>
      <v-btn
        v-if="$store.state.user == null"
        text
        plain
        :ripple="false"
        to="/login"
        class="text-capitalize"
        >Login</v-btn
      >
      <v-menu
        transition="slide-x-transition"
        offset-y
        v-if="$store.state.user != null"
      >
        <template v-slot:activator="{ attrs, on }">
          <v-avatar v-bind="attrs" v-on="on" size="35">
            <img src="@/assets/img/no-img.png" alt="John" />
          </v-avatar>
        </template>

        <v-list>
          <v-list-item two-line>
            <v-list-item-avatar>
              <img src="@/assets/img/no-img.png" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{
                $store.state.user.username
              }}</v-list-item-title>
              <v-list-item-subtitle>{{
                $store.state.user.email
              }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn class="ma-2" text icon color="red" @click="logout">
                <v-icon>mdi-power</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.commit("CLEAR_USER_DATA");
    },
  },
};
</script>
