<template>
    <div class="flex flex-col gap-3 top-0 fixed w-full z-101 text-white p-2 text-xs font-openSans cursor-pointer lg:w-auto lg:top-2 lg:right-2" @click="closeToast">
        <h3 class="text-center">{{ msg }}</h3>
    </div>
</template>

<script>
    export default {
        mounted(){
            setTimeout(() => this.closeToast(), 5000);
        },
        methods: {
            closeToast(){
                this.$emit('closeToast');
            }
        },
        props: {
            msg: String,
            background: String
        },
        emits: ['closeToast']
    }
</script>