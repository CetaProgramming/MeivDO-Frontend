<template>
    <label :for="name" class="block text-sm font-medium" :class="color">{{msg}}</label>
</template>

<script>
    export default {
       props: {
        name: {
            type: String,
            required: true
        },
        color: {
            type: String,
            default: "text-gray-900 dark:text-white"
        },
        msg: {
            type: String,
            required: true
        }
       } 
    }
</script>