<template>
     <form class="flex gap-5" @submit.prevent="searchData">
        <LabelSelectWithInput   ref="formFilterToolsAvailabilityTool" 
                                :name="langs.Filters.CodeInput.Name" 
                                v-model="formFilterToolsAvailability.tool"
                                :placeholder="langs.Filters.CodeInput.Placeholder" 
                                :items="items[0]"
                                itemFilter="code" />
        <LabelSelectWithInput   ref="formFilterToolsAvailabilityGroup"  
                                :name="langs.Filters.GroupToolsInput.Name" 
                                v-model="formFilterToolsAvailability.groupTool" 
                                :placeholder="langs.Filters.GroupToolsInput.Placeholder"  
                                :items="items[1]" 
                                itemFilter="code"/>
       <div class="flex gap-4 justify-end">
            <ButtonIcon icon="fa-solid fa-magnifying-glass" text="" pad="p-3" bg="bg-blue-600" space="normal" />
            <ButtonIcon icon="fa-solid fa-trash" @click.stop.prevent="resetValues" text=""  pad="p-3"  space="normal" />
        </div> 
    </form>
</template>

<script>
    import { langStore } from './../../../store/langStore';
    import LabelSelectWithInput from '../../forms/LabelSelectWithInput.vue';
    import ButtonIcon from '../../widgets/ButtonIcon.vue';

    export default {
    data() {
        return {
            formFilterToolsAvailability: {
                tool: -1,
                groupTool: -1
            }
        };
    },
    computed: {
        langs() {
            return langStore().getLang.PageProjects.ManagementTools;
        }
    },
    props: ['items'],
    methods: {
        searchData() {
            this.$emit('searchData', this.formFilterToolsAvailability);
        },
        resetValues(){
            this.formFilterToolsAvailability.tool = -1;
            this.formFilterToolsAvailability.groupTool = -1;
            this.$refs['formFilterToolsAvailabilityTool'].resetValues();
            this.$refs['formFilterToolsAvailabilityGroup'].resetValues();
            this.$emit('resetSearch');
        }
    },
    emits: ['searchData', 'resetSearch'],
    components: { LabelSelectWithInput, ButtonIcon }
}
</script>
