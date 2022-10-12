<template>
    <form class="bg-white items  grid lg:grid-cols-1fr-auto gap-7 p-5 rounded-md dark:bg-MeivMatteBlack dark:text-white"
        @submit.prevent="doSearch">
        <div class="flex flex-col gap-3">
            <InputSearch class="w-auto" ref="inputSearch" v-model="FilterGroupTool.Code" :name="langsTool.Keyword" />
            <div class="lg:flex gap-4">
                <!-- <SelectLabel class="lg:w-2/4" ref="selectLabel" v-model="FilterGroupTool.Category" :name="langsTool.Category" :items="['Group', 'Tools']" /> -->
                <LabelSelectWithInput :name="langsTool.Category" ref="selectLabel" v-model="FilterGroupTool.Category" :items="categories" itemFilter='name' :default="-1" ></LabelSelectWithInput>
                <SelectLabel class="lg:w-2/4" ref="selectLabelActive"  v-model="FilterGroupTool.Active" :name="langsTool.Status.Text" :items="langsTool.Status.Options" />
            </div>
        </div>
        <div class="flex flex-col md:flex-row lg:flex-col gap-4 justify-end">
            <ButtonIcon icon="fa-solid fa-magnifying-glass" text="" pad="p-3" bg="bg-blue-600" space="normal" />
            <ButtonIcon icon="fa-solid fa-trash" @click.stop.prevent="resetValues" text="" pad="p-3" space="normal" />
        </div>
    </form>
</template>
<script>
import { langStore } from '../../../store/langStore';
import InputSearch from '../../forms/InputSearch.vue';
import SelectLabel from '../../forms/SelectLabel.vue';
import ButtonIcon from '../../widgets/ButtonIcon.vue';
import {groupToolsStore} from '../../../store/groupToolsStore'
import {categoryStore} from '../../../store/categoryStore'
import LabelSelectWithInput from '../../forms/LabelSelectWithInput.vue'; 
export default {
    data() {
        return {
            categoryStore: categoryStore(),
            categories: [],
            FilterGroupTool: {
                Code: '',
                Active: '',
                Category: ''
            }
        };
    },
    computed: {
        langsTool() {
            return langStore().getLang.PageTool.Filters;
        },
    },
    async mounted(){
         const data = await categoryStore().getActiveCategories(-1, "all");
            this.categories = data;
    },
    methods: {
        async doSearch() {
            await groupToolsStore().doSearch(this.FilterGroupTool);
        },
        async resetValues(){
            this.FilterGroupTool.Code = "";
            this.FilterGroupTool.Active = "";
            this.FilterGroupTool.Category = "";
            this.$refs['inputSearch'].resetValues();
            this.$refs['selectLabel'].resetValues();
            this.$refs['selectLabelActive'].resetValues();
            await groupToolsStore().doSearch(this.FilterGroupTool, true);
        }
    },
    components: { InputSearch, SelectLabel, ButtonIcon, LabelSelectWithInput }
}
</script>
