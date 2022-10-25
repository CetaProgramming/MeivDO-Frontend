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
            const value = Number(this.item)
            return value && 'bg-green-400' || !value && 'bg-red-400';
        }
    },
    props: {
        headerTitle: {
            type: String,
            required: true
        },
        item: {
            type: Number,
            required: true
        }
    },
    components: { 
        ComponentBaseTableRow 
    }
}
</script>