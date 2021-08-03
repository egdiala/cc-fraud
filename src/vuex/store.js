import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 0,
        user: null,
        jwt: "",
        cart: [],
    },
    mutations: {
        increment(state) {
            state.count++;
        },
        SET_USER_STATE(state, user) {
            state.user = user;
        },
        SET_USER_TOKEN(state, jwt) {
            state.jwt = jwt;
        },
        ADD_TO_CART(state, item) {
            state.cart.push(item);
        },
        CLEAR_USER_DATA(state) {
            localStorage.clear();
            state.user = null;
            router.push("/login");
        },
    },
    actions: {
        logout({ commit }) {
            commit("CLEAR_USER_DATA");
            router.push("/login");
            return;
        },
    },
    getters: {
        loggedIn(state) {
            return !!state.user;
        },
    },
    plugins: [createPersistedState()],
});