<template>
    <form class="bg-white items  grid lg:grid-cols-1fr-auto gap-3 p-5 rounded-md dark:bg-MeivMatteBlack dark:text-white"
        @submit.prevent="doSearch(false)">
        <div class="grid lg:grid-cols-2 gap-3">
            <LabelSelectWithInput ref="selectLabelTool" v-model="FilterRepair.Tool" :name="langsRepair.Tools"
            :items="tools" itemFilter='code' :default="-1" :placeholder="langsRepair.PlaceHolder">
        </LabelSelectWithInput>
        <InputSearch ref="inputSearchInspection" v-model="FilterRepair.Inspection"
        :name="langsRepair.KeywordInspection" />
        
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
import InputSearch from '../../forms/InputSearch.vue';
import { repairMissingStore } from '../../../store/repairMissingStore'
import { repairCompletedStore } from '../../../store/repairCompletedStore'
import { mapState } from 'pinia';
export default {
    props: ['selectStore'],
    data() {
        return {
            FilterRepair: {
                Tool: '',
                Inspection: '',
            },
            tools: [],
            store: {
                Completed: repairCompletedStore(),
                Missing: repairMissingStore(),
            }
        };
    },
    computed: {
        ...mapState(repairCompletedStore, ['getToolsCompleted']),
        ...mapState(repairMissingStore, ['getToolsMissing']),
        langsRepair() {
            return langStore().getLang.PageRepairs.Filters
        }
    },
    watch: {
        async selectStore(value, oldValue) {
            if (value != oldValue){
                this.resetValues()
                await this.getdata()
            } 
        },
        getToolsMissing(value){
            this.tools = [];
            if(value.length && this.selectStore != 'Missing')
                return;
            this.tools = value;
        },
        getToolsCompleted(value){
            this.tools = [];
            if(value.length && this.selectStore != 'Completed')
                return;
            if(!this.getMissingTotal)
                return;
            this.tools = value;
        }
    },
    async mounted() {
        await this.getdata()
    },
    methods: {
        async getdata() {
            await this.store[this.selectStore].getTools()
        },
        async doSearch(reset = false) {
            await this.store[this.selectStore].doSearch(this.FilterRepair, reset);
        },
        async resetValues() {
            this.FilterRepair.Tool = "";
            this.FilterRepair.Inspection = "";
            this.$refs['selectLabelTool'].resetValues();
            this.$refs['inputSearchInspection'].resetValues();
            await this.doSearch(true)
        }
    },
    components: {
        LabelSelectWithInput,
        ButtonIcon,
        SelectLabel,
        InputSearch
    }
}
</script>