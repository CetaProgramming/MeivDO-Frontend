<template>
    <form class="bg-white items  grid lg:grid-cols-1fr-auto gap-3 p-5 rounded-md dark:bg-MeivMatteBlack dark:text-white"
        @submit.prevent="doSearch">
        <div class="grid lg:grid-cols-2 gap-3">
            <LabelSelectWithInput ref="selectLabelTool" v-model="FilterRepair.Tool" :name="langsRepair.Tools"
                items="tools" itemFilter='code' :default="-1" :placeholder="langsRepair.PlaceHolder">
            </LabelSelectWithInput>
            <SelectLabel ref="selectLabelStatus" v-model="FilterRepair.Status" :name="langsRepair.Status.Text"
                :items="langsRepair.Status.Options" valueItem="id" />

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
export default {
    data() {
        return {
            tools: [],
            FilterRepair: {
                Tool: '',
                Status: '',

            }
        };
    },
    computed: {
        langsRepair() {
            return langStore().getLang.PageRepairs.Filters
        },
    },
    methods: {
        async resetValues() {
            this.FilterRepair.Tool = "";
            this.FilterRepair.Status = "";
            this.$refs['selectLabelTool'].resetValues();
            this.$refs['selectLabelStatus'].resetValues();
            // await toolsStore().doSearch(this.FilterTool, true);
        }
    },
    components: {
        LabelSelectWithInput,
        ButtonIcon,
        SelectLabel
    }
}
</script>