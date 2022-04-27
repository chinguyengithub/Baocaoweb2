<script>
export default {
    props: {
        menu: { type: Object, required: true },
    },
};
</script>

<template>
    <div>
        <div class="p-1"> 
            <img :src="menu.image" class="imgdes"/>
        </div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ menu.name }}
        </div>
        <div class="p-1">
            <strong>Gía:</strong>
            {{ menu.price }}
        </div>
        <div class="p-1">
            <strong>Thời gian chế biến:</strong>
            {{ menu.processingtime }}
        </div>
    </div>
</template>

<style scoped>
.imgdes {
    width: 150px;
    height: 150px;
}
</style>