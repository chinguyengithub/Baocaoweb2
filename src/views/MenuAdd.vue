<template>
	<div class="page">
		<div>
			<h4>Thêm món ăn</h4>
			<MenuForm
				:menu="{}"
				:resetAfterSubmit="false"
				@submit:menu="saveMenu"
			/>
		</div>
	</div>
</template>

<script>
import MenuForm from "@/components/MenuForm.vue";
import MenuService from "@/services/menu.service";

export default {
	components: {
		MenuForm,
	},
	methods: {
		async saveMenu(data) {
			try {
				await MenuService.create(data);
				swtoast.success({
					text: "Món ăn được thêm thành công.",
				});
			} catch (error) {
				console.log(error);
				swtoast.error({
					text: "Đã có lỗi xảy ra.",
				});
			}
		},
	},
};
</script>
