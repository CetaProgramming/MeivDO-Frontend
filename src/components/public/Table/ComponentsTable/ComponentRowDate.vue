<template>
    <ComponentBaseTableRow :headerItem="headerTitle">
        <p :title="item" class="text-center truncate dark:text-white" :class="[isItem]">{{item ?? langInProgress}}</p>
    </ComponentBaseTableRow>
</template>

<script>
    import ComponentBaseTableRow from './ComponentBaseTableRow.vue';
    import { langStore } from '../../../../store/langStore';
    export default {
    computed:{
        isItem(){
            if(!this.item)
                return "font-bold text-orange-200 dark:text-orange-200"
        },
        langInProgress(){
            return langStore().getLang.Options.inProgress
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