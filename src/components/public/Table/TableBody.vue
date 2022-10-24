<template>
    <TransitionGroup name="hidden-old-item">
    <div v-for="item in items"
        class="bg-white rounded-md flex flex-col min-w-fit md:flex-row md:flex-wrap gap-2 lg:grid py-2 px-4 mt-1 items-center md:overflow-auto dark:bg-MeivMatteBlack"
        :style="style" :key=item.id>
            <div v-for="subitem,index in Object.keys(item)"
            class="grid overflow-auto md:text-ellipsis lg:block w-full lg:w-auto gap-3 justify-items-start md:w-[49%] grid-cols-auto-1fr">
                <component :is="component[index]" v-bind="{ headerTitle: header[index], item: item[subitem] }" />
            </div>
            <Select v-if="showSelect" :select="resetSelect" :selectItems="selectItems" @selectOption="selectItem($event, item.id)" class="text-lg" />
            <Button v-else @click="selectItem('AddUpdate',item.id)" :text="selectItems[0].value" space="normal" pad="p-1" fontSize="text-md"></Button>
        </div>
    </TransitionGroup>
    <p v-if="!items.length"
        class="p-4 text-center bg-zinc-300 rounded-md text-xs dark:bg-MeivMatteBlack text-red-500 mt-2">
        {{lang.noDataFiltered}}</p>
</template>

<script>
import Select from './../Table/Select.vue'
import { langStore } from "./../../../store/langStore";
import Button from '../../widgets/Button.vue';

export default {
    data() {
        return {
            resetSelect: false
        }
    },
    computed: {
        lang() {
            return langStore().getLang.Options
        }
    },
    props: {
        style: {
            type: String,
            required: true
        }, items: {
            type: Array,
            required: true
        }, header: {
            type: Array,
            required: true
        }, selectItems: {
            type: Array,
            default: []
        },
        component: {

        },
        showSelect:{
            type: Boolean,
            default: true

        }
    },
    components: {
    Select,
    Button
},
    emits: ['selectOption'],
    methods: {
        selectItem(select, event) {
            this.$emit('selectOption', select, event);
            this.resetSelect = !this.resetSelect
        }
    }
}
</script>

