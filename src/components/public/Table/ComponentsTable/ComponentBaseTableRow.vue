<template>
    <p class="font-bold lg:hidden dark:text-white">{{headerItem}}</p>
    <slot></slot>
</template>

<script>
    export default {
        props: {
            headerItem: {
                type: String,
                required: true
            }
        }
    }
</script>