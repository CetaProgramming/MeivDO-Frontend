<template>
   
   <form class="bg-white items  grid lg:grid-cols-1fr-auto gap-3 p-5 rounded-md dark:bg-MeivMatteBlack dark:text-white" @submit.prevent="doSearch">
    <div class="grid lg:grid-cols-2 gap-3">
         <InputSearch class="w-auto" ref="inputSearch" v-model="FilterTool.Code"  :name="langsTool.Keyword"/>
        <!-- <SelectLabel ref="selectLabelGroup" v-model="FilterTool.GroupTools"  :name="langsTool.GroupTools" items="Group Tools"/> -->
        <LabelSelectWithInput ref="selectLabelGroup" v-model="FilterTool.GroupTools" :name="langsTool.GroupTools" :placeholder="langsTool.GroupToolsPlaceholder" :items="groupTools" itemFilter='code' :default="-1" ></LabelSelectWithInput>
        <SelectLabel ref="selectLabelStatus" v-model="FilterTool.Status"  :name="langsTool.Text" :items="status" valueItem="id"/>
        <SelectLabel ref="selectLabelActive" v-model="FilterTool.Active"  :name="langsTool.Status.Text" :items="langsTool.Status.Options"/>
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
import {toolsStore} from '../../../store/toolsStore'
import LabelSelectWithInput from '../../forms/LabelSelectWithInput.vue';
import {groupToolsStore} from '../../../store/groupToolsStore'
export default {
    data() {
        return {
            status: [],
            groupTools: [],
            FilterTool: {
                Code: '',
                Active: '',
                GroupTools: '',
                Status: ''
            }
        };
    },
    computed:{
        langsTool(){
            return langStore().getLang.PageTool.Filters;
        },
    },
    async mounted(){
         const data = await groupToolsStore().getActiveGroupTools(-1, "all");
            this.groupTools = data;

         const dataStatus = await toolsStore().getStatus();
        this.status = dataStatus

    },
    methods: {
        async doSearch() {
            await toolsStore().doSearch(this.FilterTool);
        },
        async resetValues(){
            this.FilterTool.Code = "";
            this.FilterTool.Active = "";
            this.FilterTool.Status = "";
            this.FilterTool.GroupTools = "";
            this.$refs['inputSearch'].resetValues();
            this.$refs['selectLabelActive'].resetValues();
            this.$refs['selectLabelStatus'].resetValues();
            this.$refs['selectLabelGroup'].resetValues();
            await toolsStore().doSearch(this.FilterTool, true);
        }
    },
    components: { InputSearch, SelectLabel, ButtonIcon, LabelSelectWithInput }
}
</script>

