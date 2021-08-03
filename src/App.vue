<template>
  <v-app>
    <transition name="slide" mode="out-in">
      <vue-extend-layouts />
    </transition>
  </v-app>
</template>

<script>
import VueExtendLayouts from "vue-extend-layout";
export default {
  name: "App",
  components: { VueExtendLayouts },

  data: () => ({
    //
  }),
};
</script>
<style>
#nav a.router-link-exact-active {
  color: #42b983;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 1s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
}

.link {
  text-decoration: none;
}

.ls-5 {
  letter-spacing: 5px;
}

.cardImg {
  background-color: #f2f5ff;
}
</style>
