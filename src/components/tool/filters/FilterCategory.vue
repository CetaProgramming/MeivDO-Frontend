<template>
     <form class="bg-white items  grid md:grid-cols-1fr-auto-auto gap-3 p-5 rounded-md dark:bg-MeivMatteBlack dark:text-white" @submit.prevent="doSearch">
     
          <InputSearch class="w-auto" ref="inputSearch"  :name="langsTool.KeywordCategory"/>
         <SelectLabel ref="selectLabel" :name="langsTool.Status.Text" :items="langsTool.Status.Options"/>
         <div class="flex gap-3">
             <ButtonIcon icon="fa-solid fa-magnifying-glass" text=""  pad="p-3" bg="bg-blue-600" space="normal" />
             <ButtonIcon icon="fa-solid fa-trash" @click.stop.prevent="resetValues" text=""  pad="p-3"  space="normal" />
         </div>
     </form>
     
 </template>
<script>
    import { langStore } from '../../../store/langStore';
import InputSearch from '../../forms/InputSearch.vue';
import SelectLabel from '../../forms/SelectLabel.vue';
import ButtonIcon from '../../widgets/ButtonIcon.vue';
export default {
    setup() {
        return {
            FilterTool: {
                Name: '',
                Active: ''
            }
        };
    },
    computed:{
        langsTool(){
            return langStore().getLang.PageTool.Filters;
        },
    },
    components: { InputSearch, SelectLabel, ButtonIcon }
}
</script>
