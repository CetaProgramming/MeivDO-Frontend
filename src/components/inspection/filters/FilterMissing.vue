<template>
    <form class="bg-white items  grid lg:grid-cols-1fr-auto gap-3 p-5 rounded-md dark:bg-MeivMatteBlack dark:text-white"
        @submit.prevent="doSearch">
        <div class="grid lg:grid-cols-2 gap-3">
            <LabelSelectWithInput ref="selectLabelTool" v-model="FilterInspection.Tool" :name="langsInspection.Tools"
                :items="tools" itemFilter='code' :default="-1" :placeholder="langsInspection.PlaceHolder">
            </LabelSelectWithInput>
            <LabelSelectWithInput ref="selectLabelProject" v-model="FilterInspection.Project" :name="langsInspection.Project"
                :items="projects" itemFilter='name' :default="-1" :placeholder="langsInspection.PlaceHolderProject">
            </LabelSelectWithInput>
        </div>
        <div class="flex gap-3">
            <ButtonIcon icon="fa-solid fa-magnifying-glass" text="" pad="p-3" bg="bg-blue-600" space="normal" />
            <ButtonIcon icon="fa-solid fa-trash" @click.stop.prevent="resetValues" text="" pad="p-3" space="normal" />
        </div>

    </form>
</template>

<script>
import LabelSelectWithInput from '../../forms/LabelSelectWithInput.vue';
import ButtonIcon from '../../widgets/ButtonIcon.vue';
import { langStore } from '../../../store/langStore'
import SelectLabel from '../../forms/SelectLabel.vue';
import {inspectionMissingStore} from '../../../store/inspectionMissingStore'
import { mapState } from 'pinia';
export default {
    data() {
        return {
            projects:[],
            tools: [],
            FilterInspection: {
                Tool: '',
                Project: '',

            }
        };
    },
    watch: {
        getToolsAndProjectsInInspections(value){
            if(!value.every(value => value.length))
                return;
            this.tools = value[0];
            this.projects = value[1];
        }
    },
    computed: {
        ...mapState(inspectionMissingStore, ['getToolsAndProjectsInInspections']),
        langsInspection() {
            return langStore().getLang.PageInspections.Filters
        },
    },
    async mounted(){
        await this.getToolsAndProject();
    },
    methods:{
        async getToolsAndProject(){
            await inspectionMissingStore().getToolsAndProjects();
        },
        async doSearch() {
            await inspectionMissingStore().doSearch(this.FilterInspection);
        },
        async resetValues(){
            this.FilterInspection.Tool = "";
            this.FilterInspection.Project = "";
            this.$refs['selectLabelTool'].resetValues();
            this.$refs['selectLabelProject'].resetValues();
            await inspectionMissingStore().doSearch(this.FilterInspection, true);
        }
    },
    components: {
        LabelSelectWithInput,
        ButtonIcon,
        SelectLabel
    }
}
</script>