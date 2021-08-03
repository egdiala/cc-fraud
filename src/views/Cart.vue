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
          Continue shopping
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
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Cart",
};
</script>
