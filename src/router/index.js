import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            layout: "landing",
        },
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: {
            layout: "landing",
        },
    },
    {
        path: "/products/:pId",
        name: "Products",
        // route level code-splitting
        // this generates a separate chunk (Products.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "Products" */ "../views/Products.vue"),
        props: true,
    },
    {
        path: "/cart",
        name: "Cart",
        component: () =>
            import ( /* webpackChunkName: "Products" */ "../views/Cart.vue"),
    },
    {
        path: "/process",
        name: "OtpPage",
        component: () =>
            import ( /* webpackChunkName: "Products" */ "../views/OtpPage.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;