<template>
    <div class=" flex flex-col gap-3 bg-MeivGray p-5  rounded dark:bg-MeivDarkGray">
        <div class="flex gap-5">
            <InputLabel :name="langs.Filters.CodeInput.Name" :placeholder="langs.Filters.CodeInput.Placeholder" />
            <SelectLabel :name="langs.Filters.GroupToolsInput.Name" :placeholder="langs.Filters.GroupToolsInput.Placeholder" pad="p-3" />
            <div class="flex gap-4 justify-end">
                <ButtonIcon icon="fa-solid fa-magnifying-glass" text="" pad="p-3" bg="bg-blue-600" space="normal" />
                <ButtonIcon icon="fa-solid fa-trash" @click.stop.prevent="resetValues" text=""  pad="p-3"  space="normal" />
            </div>            
        </div>
        <div>
            <TableHeader :header=langs.TableHeader />
        </div>
    </div>
</template>

<script>
import InputLabel from '../../forms/InputLabel.vue';
import ButtonIcon from '../../widgets/ButtonIcon.vue';
import { langStore } from '../../../store/langStore';
import SelectLabel from '../../forms/SelectLabel.vue';
import TableHeader from '../../public/Table/TableHeader.vue';
    export default {
        computed: {
            langs(){
                return langStore().getLang.Options.ManagementTools;
            }
        },
        components: { InputLabel, ButtonIcon, SelectLabel, TableHeader }
}
</script>