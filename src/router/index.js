import { createWebHistory, createRouter } from "vue-router";
import Restaurant from "@/views/Restaurant.vue";
import Menu from "@/views/Menu.vue";
const routes = [
    {
        path: "/",
        name: "restaurant",
        component: Restaurant,
    },
    {
        path: "/restaurant/:id",
        name: "restaurant.edit",
        component: () => import("@/views/RestaurantEdit.vue"),
        props: true 
    },
    {
        path: "/restaurant/add",
        name: "restaurant.add",
        component: () => import("@/views/RestaurantAdd.vue"),
        props: true 
    },
    {
        path: "/",
        name: "menu",
        component: Menu,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/menu/:id",
        name: "menu.edit",
        component: () => import("@/views/MenuEdit.vue"),
        props: true
    },
    {
        path: "/menu/add",
        name: "menu.add",
        component: () => import("@/views/MenuAdd.vue"),
        props: true
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;