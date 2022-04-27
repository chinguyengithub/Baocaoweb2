<template>
    <div v-if="menu" class="page">
        <h4>Cập Nhật Món Ăn</h4>
        <MenuForm
            :menu="menu"
            @submit:menu="updateMenu"
            @delete:menu="deleteMenu"
        />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import MenuForm from "@/components/MenuForm.vue";
import MenuService from "@/services/menu.service";

export default {
    components: {
        MenuForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            menu: null,
            message: "",
        };
    },
    methods: {
        async getMenu(id) {
            try {
                this.menu = await MenuService.get(id);
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },

        async updateMenu(data) {
            try {
                await MenuService.update(this.menu.id, data);
                this.message = "Món ăn được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },

        async deleteMenu() {
            if (confirm("Bạn muốn xóa món ăn này?")) {
                try {
                    await MenuService.delete(this.menu.id);
                    this.$router.push({ name: "menu" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getMenu(this.id);
        this.message = "";
    },
};
</script>