<template>
    <ComponentRowText :headerTitle="headerTitle" :item="item.name" />
</template>

<script>
import ComponentRowText from './ComponentRowText.vue';
    export default {
        props: {
            headerTitle: {
                type: String,
                required: true
            },
            item: {
                type: String,
                required: true
            }
        },
        components: { 
            ComponentRowText 
        }
}
</script>