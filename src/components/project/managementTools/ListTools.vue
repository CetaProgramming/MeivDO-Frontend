<template>
    <div class="flex flex-col gap-1 max-h-60 overflow-auto">
        <div class="text-center gap-1 bg-white rounded p-2 grid grid-cols-2 lg:grid-cols-auto-1fr-1fr text-black dark:bg-zinc-800" v-for="item in items" :key="item.id">
            <Input class="h-5 col-span-2 mb-1 lg:col-auto" type="checkbox" v-model="select" @change="selectOptions(item.id)" :default="verifyIfCheck(item.id)" />
                <ComponentRowText :headerTitle="header[0]" :item="item.tool"/>
                <ComponentRowText :headerTitle="header[1]" :item="item.groupTool"/>
        </div>
        <p v-if="!items.length" class="p-4 text-center bg-zinc-300 rounded-md text-xs dark:bg-MeivMatteBlack text-red-500 mt-2">{{lang.noDataFiltered}}</p>
    </div>
</template>

<script>
import Input from '../../widgets/Input.vue';
import ComponentRowText from '../../public/Table/ComponentsTable/ComponentRowText.vue';
import Label from '../../widgets/Label.vue';
import { langStore } from './../../../store/langStore';
    export default {
        data(){
            return {
                select: false
            }
        },
        computed: {
            lang(){
                return langStore().getLang.Options
            }

        },
        props: {
            items: {
                required: true
            },
            header: {
                type: Array,
            }, 
            selectItems: {
                type: Array,
                default: []
            }
        },
        methods: {
            verifyIfCheck(value){
                return this.selectItems.includes(value);
            },
            selectOptions(value){
                this.$emit('toogleTool', value);
            }
        },
        components: { Input, ComponentRowText, Label },
        emits: ['toogleTool']
}
</script>

<style lang="scss" scoped>

</style>