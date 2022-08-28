<template>
    <ToastLayout class="bg-orange-600" :msg="msg"/>
</template>

<script>
    import ToastLayout from './ToastLayout.vue';
    export default {
        components: {
            ToastLayout
        },
        props: {
            msg: String
        }
    }
</script>