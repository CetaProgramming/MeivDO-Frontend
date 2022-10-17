<template>
    <div class=" flex flex-col gap-3 bg-MeivGray p-5  rounded dark:bg-MeivDarkGray">
        <FilterTools v-if="getActiveAndAvailableTools.length" :items="[getActiveAndAvailableTools, activeGroupTools]" @searchData="searchData" @resetSearch="resetSearch"/>
        <div>
            <TableHeader v-if="getActiveAndAvailableTools.length" :header=langs.TableHeader  class="grid-cols-2 text-md p-2"/>
            <ListTools :header=langs.TableHeader :items="itemsFiltered ?? getCodeAndGroupToolActive" @toogleTool="$emit('toogleTool', $event)" :selectItems="itemsSelect"/>
        </div>
    </div>
</template>

<script>
import InputLabel from '../../forms/InputLabel.vue';
import ButtonIcon from '../../widgets/ButtonIcon.vue';
import { langStore } from '../../../store/langStore';
import SelectLabel from '../../forms/SelectLabel.vue';
import TableHeader from '../../public/Table/TableHeader.vue';
import TableBody from '../../public/Table/TableBody.vue';
import LabelSelectWithInput from '../../forms/LabelSelectWithInput.vue';
import {groupToolsStore} from './../../../store/groupToolsStore';
import {toolsStore} from './../../../store/toolsStore';
import ListTools from './ListTools.vue';
import FilterTools from './FilterTools.vue';

    export default {
        async mounted(){
            this.activeGroupTools = await groupToolsStore().getActiveGroupTools(1, 'all');
            this.activeTools = await toolsStore().getActiveTools();
        },
        data(){
            return {
                activeGroupTools: [],
                activeTools: [],
                itemsFiltered: null
            }
        },
        computed: {
            langs(){
                return langStore().getLang.PageProjects.ManagementTools;
            },
            getCodeAndGroupToolActive(){
                return this.activeTools.length && this.filterToolGroup(this.getActiveAndAvailableTools);
            },
            getActiveAndAvailableTools(){
                return this.activeTools.length && this.activeTools.filter(item => item.status.id == 2);
            }
        },
        props: {
            itemsSelect: {
                type: Array,
                default: []
            }
        },
        methods: {
            searchData(form){
                this.itemsFiltered =  this.filterToolGroup(this.activeTools.filter(tool =>  
                    (form.tool == -1 || (form.tool && tool.id === form.tool)) 
                    && 
                    (form.groupTool == -1 || (form.groupTool && tool.group.id === form.groupTool))
                ));
            },
            resetSearch(){
                this.itemsFiltered = null;
            },
            filterToolGroup(variavel){
                return variavel.map(tool => {
                    return {
                        id: tool.id,
                        tool: tool.code,
                        groupTool: tool.group.code
                    }
                })
            }
        },
        components: { InputLabel, ButtonIcon, SelectLabel, TableHeader, TableBody, LabelSelectWithInput, ListTools, FilterTools }
}
</script>