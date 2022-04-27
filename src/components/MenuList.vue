<script>
export default {
    props: {
        menus: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        select(index) {
            this.$emit("update:activeIndex", index);
        }
    }
};
</script>

<template>
    <ul class="list-group">
        <li
            class="list-group-item"
            v-for="(menu, index) in menus"
            :key="menu.id"
            :class="{ active: index === activeIndex }"
            @click="select(index)"
        >
            {{ menu.name }}
        </li>
    </ul>
</template>