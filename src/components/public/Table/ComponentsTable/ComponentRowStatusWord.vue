<template>
    <ComponentBaseTableRow :headerItem="headerTitle">
        <div class="flex justify-center items-center gap-2">
            <circle class="rounded-xl w-3 h-3 block" :class="[background]"></circle>
            <span class="text-center truncate dark:text-white">{{word}}</span>
        </div>
    </ComponentBaseTableRow>
</template>

<script>
    import ComponentBaseTableRow from './ComponentBaseTableRow.vue';
    import { langStore } from '../../../../store/langStore';
    export default {
    computed:{
        background(){
            const value = Number(this.item)
            return value && 'bg-green-400' || !value && 'bg-red-400';
        },
        pageLocales(){
            return `PageProjects`
        },
        word(){
            const value = Number(this.item)
            return value && langStore().getLang[this.pageLocales].Filters.Status.Options[1].name || !value && langStore().getLang[this.pageLocales].Filters.Status.Options[2].name;
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