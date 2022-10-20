<template>
    <form class="bg-white items  grid lg:grid-cols-1fr-auto gap-3 p-5 rounded-md dark:bg-MeivMatteBlack dark:text-white"
        @submit.prevent="doSearch(false)">
        <div class="grid lg:grid-cols-2 gap-3">
            <LabelSelectWithInput ref="selectLabelTool" v-model="FilterRepair.Tool" :name="langsRepair.Tools"
                :items="tools" itemFilter='code' :default="-1" :placeholder="langsRepair.PlaceHolder">
            </LabelSelectWithInput>
            <!-- <SelectLabel ref="selectLabelStatus" v-model="FilterRepair.Status" :name="langsRepair.Status.Text"
                :items="langsRepair.Status.Options" valueItem="id" /> -->
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
import { repairCompletedStore } from '../../../store/repairCompletedStore'
import { repairMissingStore } from '../../../store/repairMissingStore'
export default {
    props: ['selectStore'],
    data() {
        return {
            tools: [],
            FilterRepair: {
                Tool: '',
                Inspection: '',
            },
            store: {
                Completed: repairCompletedStore(),
                Missing: repairMissingStore(),
            },
        };
    },
    computed: {
        langsRepair() {
            return langStore().getLang.PageRepairs.Filters
        },
    },
    watch: {
        async selectStore(value, oldValue) {
            if (value != oldValue){
                this.resetValues()
                await this.getdata()
            } 
        }
    },
    async mounted() {
        await this.getdata()
    },
    methods: {
        async getdata() {
            const data = await this.store[this.selectStore].getTools()
            this.tools = data;
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