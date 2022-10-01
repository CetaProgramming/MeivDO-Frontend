<template>
    <form class="bg-white items  grid lg:grid-cols-1fr-auto gap-3 p-5 rounded-md dark:bg-MeivMatteBlack dark:text-white" @submit.prevent="doSearch">
     <div class="grid lg:grid-cols-2 gap-3">
        <InputSearch ref="inputSearch" v-model="FilterProject.Name" :name="langs.Keyword"/>
        <SelectLabel ref="selectLabel" v-model="FilterProject.Active" :name="langs.Status.Text" :items="langs.Status.Options"/>
        <SelectDate ref="selectDate"  v-model="FilterProject.StartDate" :name="langs.StartDate"/>
        <SelectDate ref="selectDate"  v-model="FilterProject.EndDate" :name="langs.EndDate"/>
      </div>
        <div class="flex flex-col md:flex-row lg:flex-col gap-4 justify-end">
            <ButtonIcon icon="fa-solid fa-magnifying-glass" text=""  pad="p-3" bg="bg-blue-600" space="normal" />
            <ButtonIcon icon="fa-solid fa-trash" @click.stop.prevent="resetValues" text=""  pad="p-3"  space="normal" />
        </div>
     </form>
 </template>

<script>
import DarkModeSwitch from '../dashboard/DarkModeSwitch.vue';
import { langStore } from '../../store/langStore';
import { projectStore } from '../../store/projectStore';
import SelectDate from '../forms/SelectDate.vue';
import SelectLabel from '../forms/SelectLabel.vue';
import InputSearch from '../forms/InputSearch.vue';
import ButtonIcon from '../widgets/ButtonIcon.vue';
    
export default {
    data(){
        return {
            FilterProject: {
                Name: '',
                Active: '',
                StartDate: '',
                EndDate: ''
            }
        }
    },
    computed: {
        langs(){
            return langStore().getLang.PageProjects.Filters;
        }
    },
    methods: {
        async doSearch(){
            await projectStore().doSearch(this.FilterProject);
        },
        async resetValues(){
            this.FilterProject.Name = "";
            this.FilterProject.Active = "";
            this.FilterProject.StartDate = "";
            this.FilterProject.EndDate = "";
            this.$refs['inputSearch'].resetValues();
            this.$refs['selectLabel'].resetValues();
            await projectStore().doSearch(this.FilterProject, true);
        }
    },
    components: { DarkModeSwitch, SelectDate, SelectLabel, InputSearch, ButtonIcon }
}
</script>