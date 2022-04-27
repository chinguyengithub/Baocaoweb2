<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Món ăn
                <i class="fas "></i>
            </h4>
            <MenuList
                v-if="filteredMenusCount > 0"
                :menus="filteredMenus"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có thực đơn nào.</p>

            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-warning" @click="refreshList()">
                    <i class="fas fa-redo"></i> 
                </button>

                <button class="btn btn-sm btn-info" @click="goToAddMenu">
                    <i class="fas fa-plus"></i>
                </button>

                <button
                    class="btn btn-sm btn-danger"
                    @click="removeAllMenus"
                >
                    <i class="fas fa-trash"></i> 
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeMenu">
                <h4>
                    Thông tin về món ăn
                    <i class="fas fa-edit"></i>
                </h4>
                <MenuDetail :menu="activeMenu" />
                <router-link
                    :to="{
                        name: 'menu.edit',
                        params: { id: activeMenu.id },
                    }"
                >
                    <span class="mt-2 badge badge-warning">
                        <i class="fas fa-edit"></i>Sửa</span
                    >
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import MenuDetail from "@/components/MenuDetail.vue";
import InputSearch from "@/components/InputSearch.vue";
import MenuList from "@/components/MenuList.vue";
import MenuService from "@/services/menu.service";

export default {
    components: {
        MenuDetail,
        InputSearch,
        MenuList,
    },
    data() {
        return {
            menus: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        // Giám sát các thay đổi của biến searchText.
        //  Bỏ chọn phần tử đang được chọn trong danh sách.
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Chuyển các đối tượng menu thành chuỗi để tiện cho tìm kiếm.
        menuStrings() {
            return this.menus.map((menu) => {
                const { name, price, processingtime, image } = menu;
                return [name, price, processingtime, image].join("");
            });
        },
        // Trả về các menu có chứa thông tin cần tìm kiếm.
        filteredMenus() {
            if (!this.searchText) return this.menus;
            return this.menus.filter((menu, index) =>
                this.menuStrings[index].includes(this.searchText)
            );
        },
        activeMenu() {
            if (this.activeIndex < 0) return null;
            return this.filteredMenus[this.activeIndex];
        },
        filteredMenusCount() {
            return this.filteredMenus.length;
        },
    },
    methods: {
        async retrieveMenus() {
            try {
                this.menus = await MenuService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveMenus();
            this.activeIndex = -1;
        },

        async removeAllMenus() {
            if (confirm("Bạn muốn xóa tất cả thực đơn?")) {
                try {
                    await MenuService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },

        goToAddMenu() {
            this.$router.push({ name: "menu.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>

<style scoped>
.page {
    text-align: left;
    max-width:750px;
}

</style>