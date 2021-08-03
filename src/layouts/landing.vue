<template>
  <v-main>
    <v-container fluid fill-height>
      <v-row align-content="center" justify="center">
        <v-col cols="12" lg="4" md="5" class="text-center">
          <router-view />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
