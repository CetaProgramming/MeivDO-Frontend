<template>
    <ComponentBaseTableRow :headerItem="headerTitle">
        <p :title="item" class="text-center truncate dark:text-white">{{item}}</p>
    </ComponentBaseTableRow>
</template>

<script>
    import ComponentBaseTableRow from './ComponentBaseTableRow.vue';
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
        ComponentBaseTableRow 
    }
}
</script>