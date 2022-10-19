<template>
    <form class="bg-white items  grid lg:grid-cols-1fr-auto gap-3 p-5 rounded-md dark:bg-MeivMatteBlack dark:text-white"
        @submit.prevent="doSearch">
        <div class="grid lg:grid-cols-2 gap-3">
            <LabelSelectWithInput ref="selectLabelTool" v-model="FilterInspection.Tool" :name="langsInspection.Tools"
                :items="tools" itemFilter='code' :default="-1" :placeholder="langsInspection.PlaceHolder">
            </LabelSelectWithInput>
            <SelectLabel ref="selectLabelStatus" v-model="FilterInspection.Status" :name="langsInspection.Status.Text"
                :items="langsInspection.Status.Options" valueItem="value" />

        </div>
        <div class="flex gap-3">
            <ButtonIcon icon="fa-solid fa-magnifying-glass" text="" pad="p-3" bg="bg-blue-600" space="normal" />
            <ButtonIcon icon="fa-solid fa-trash" @click.stop.prevent="resetValues" text="" pad="p-3" space="normal" />
        </div>

    </form>
</template>

<script>
import LabelSelectWithInput from '../../forms/LabelSelectWithInput.vue';
import {inspectionCompletedStore} from '../../../store/inspectionCompletedStore'
import {toolsStore} from '../../../store/toolsStore'
import ButtonIcon from '../../widgets/ButtonIcon.vue';
import { langStore } from '../../../store/langStore'
import SelectLabel from '../../forms/SelectLabel.vue';
export default {
    data() {
        return {
            projects: [],
            tools: [],
            FilterInspection: {
                Tool: '',
                Status: '',
            }
        };
    },
    computed: {
        langsInspection() {
            return langStore().getLang.PageInspections.Filters
        },
    },
    async mounted(){
         const data = await toolsStore().getActiveTools("all");
            this.tools = data;
    },
    methods: {
        async doSearch() {
            await inspectionCompletedStore().doSearch(this.FilterInspection);
        },
        async resetValues() {
            this.FilterInspection.Tool = "";
            this.FilterInspection.Status = "";
            this.$refs['selectLabelTool'].resetValues();
            this.$refs['selectLabelStatus'].resetValues();
            await inspectionCompletedStore().doSearch(this.FilterInspection, true);
        }
    },
    components: {
        LabelSelectWithInput,
        ButtonIcon,
        SelectLabel
    }
}
</script>