<template>
    <form
        class="bg-white items  grid md:grid-cols-1fr-auto-auto gap-3 p-5 rounded-md dark:bg-MeivMatteBlack dark:text-white"
        @submit.prevent="doSearch">

        <InputSearch class="w-auto" ref="inputSearch" v-model="FilterTool.Name" :name="langsTool.Keyword" />
        <SelectLabel ref="selectLabel" v-model="FilterTool.Active" :name="langsTool.Status.Text" :items="langsTool.Status.Options" />
        <div class="flex gap-3">
            <ButtonIcon icon="fa-solid fa-magnifying-glass" text="" pad="p-3" bg="bg-blue-600" space="normal" />
            <ButtonIcon icon="fa-solid fa-trash" @click.stop.prevent="resetValues" text="" pad="p-3" space="normal" />
        </div>
    </form>

</template>
<script>
import { langStore } from '../../../store/langStore';
import { categoryStore } from '../../../store/categoryStore'
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
    computed: {
        langsTool() {
            return langStore().getLang.PageTool.Filters;
        },
    },
    methods: {
        async doSearch() {
            await categoryStore().doSearch(this.FilterTool);
        },
        async resetValues(){
            this.FilterTool.Name = "";
            this.FilterTool.Active = "";
            this.$refs['inputSearch'].resetValues();
            this.$refs['selectLabel'].resetValues();
            await categoryStore().doSearch(this.FilterTool, true);
        }
    },
    components: { InputSearch, SelectLabel, ButtonIcon }
}
</script>
