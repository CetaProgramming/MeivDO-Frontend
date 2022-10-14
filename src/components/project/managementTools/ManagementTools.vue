<template>
    <div class=" flex flex-col gap-3 bg-MeivGray p-5  rounded dark:bg-MeivDarkGray">
        <div class="flex gap-5">
            <!-- <LabelSelectWithInputError ref="formToolCreateGroup" :name="langs.GroupTools" v-model="formToolCreateUpdate.groupTool" :default="formToolCreateUpdate.groupTool"
                            :items="activeGroupTools" itemFilter="code"
                        /> -->

            <!-- <LabelSelectWithInput :name="langs.Filters.CodeInput.Name" v-model="formFilterToolsAvailability.tool"/> -->
            <LabelSelectWithInput   :name="langs.Filters.GroupToolsInput.Name" 
                                    v-model="formFilterToolsAvailability.tool" 
                                    :placeholder="langs.Filters.GroupToolsInput.Placeholder" 
                                    :default="formFilterToolsAvailability.tool" 
                                    :items="activeGroupTools" 
                                    itemFilter="code"/>
            <!-- <InputLabel :name="langs.Filters.CodeInput.Name" :placeholder="langs.Filters.CodeInput.Placeholder" /> -->
            <!-- <SelectLabel :name="langs.Filters.GroupToolsInput.Name" :placeholder="langs.Filters.GroupToolsInput.Placeholder" pad="p-3" /> -->
            <div class="flex gap-4 justify-end">
                <ButtonIcon icon="fa-solid fa-magnifying-glass" text="" pad="p-3" bg="bg-blue-600" space="normal" />
                <ButtonIcon icon="fa-solid fa-trash" @click.stop.prevent="resetValues" text=""  pad="p-3"  space="normal" />
            </div>            
        </div>
        <div>
            <TableHeader :header=langs.TableHeader  class="grid-cols-2 text-md p-2"/>
            <!-- <TableBody :header=langs.TableHeader /> -->
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

    export default {
        async mounted(){
            this.activeGroupTools = await groupToolsStore().getActiveGroupTools(1, 'all');
        },
        data(){
            return {
                activeGroupTools: [],
                formFilterToolsAvailability: {
                    tool: -1,
                    groupTool: -1
                }
            }
        },
        computed: {
            langs(){
                return langStore().getLang.PageProjects.ManagementTools;
            }
        },
        components: { InputLabel, ButtonIcon, SelectLabel, TableHeader, TableBody, LabelSelectWithInput }
}
</script>