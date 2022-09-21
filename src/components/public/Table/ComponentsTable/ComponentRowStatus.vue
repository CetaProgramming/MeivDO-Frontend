<template>
    <ComponentBaseTableRow :headerItem="headerTitle">
        <div class="flex justify-center items-center gap-2">
            <circle class="rounded-xl w-3 h-3 block" :class="[background]"></circle>
        </div>
    </ComponentBaseTableRow>
</template>

<script>
    import ComponentBaseTableRow from './ComponentBaseTableRow.vue';
    export default {
    computed:{
        background(){
            return this.item && 'bg-green-400' || !this.item && 'bg-red-400';
        }
    },
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