<template>
   <form class="bg-white items  grid lg:grid-cols-1fr-auto gap-3 p-5 rounded-md dark:bg-MeivMatteBlack dark:text-white" @submit.prevent="doSearch">
    <div class="grid lg:grid-cols-2 gap-3">
         <InputSearch class="w-auto" ref="inputSearch"  :name="langsTool.Keyword"/>
        <SelectLabel ref="selectLabel"  name="group tools" items="Group Tools"/>
        <SelectLabel ref="selectLabel"  name="Status" items="Status"/>
        <SelectLabel ref="selectLabel"  name="Active" items="active"/>
     </div>
        <div class="flex flex-col md:flex-row lg:flex-col gap-4 justify-end">
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

