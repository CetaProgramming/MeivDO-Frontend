<template>
    <div class="bg-MeivAsh  min-h-screen font-openSans dark:bg-zinc-900">
        <div class="px-8 md:px-16 py-8 flex flex-col gap-5">
            <HeaderTool @activeToast="showToast" :newOptions="tableOptionSelected" />
            <Transition name="hidden-old-item" appear>    
                <component :is="dynamicComponent('Filter')"/>
            </Transition>
            
            <TableOptions @tableChange="tableChange" />
            <div class="grid gap-1 lg:gap-0 lg:flex lg:flex-col lg:overflow-auto">
                <TableHeader ref="header" :header=langsTool.Headers[tableOptionSelected] :style="GetLenght" />
                <TableBody :header=langsTool.Headers[tableOptionSelected] :component="Components[tableOptionSelected]"
                    :items=store[tableOptionSelected].viewing :style="GetLenght" :selectItems="langsTool.Options"
                    @selectOption="popUpOpen" />
            </div>
            <Paginate v-if="store[tableOptionSelected].viewing.length" @selectPage="changePage" :pag="store[tableOptionSelected].pag" />
        </div>
    </div>
    <Transition appear>
        <component v-if="isActivePopUp" @activeToast="showToast" @closePopUp="isActivePopUp= false"
        :is="dynamicComponent(selectedOption)" v-bind="propsDynamicComponent"/>
    </Transition>
    <Transition name="slide-fade">
        <component :is="this.toast.type" v-if="this.toast.visible" :msg="this.toast.msg"
            @closeToast="this.toast.visible = false" />
    </Transition>
</template>

<script>
import { markRaw } from "vue";
import { langStore } from '../../store/langStore';
import { toolsStore } from '../../store/toolsStore'
import { categoryStore } from '../../store/categoryStore'
import { groupToolsStore } from "../../store/groupToolsStore";
import HeaderTool from './HeaderTool.vue';
import Button from '../widgets/Button.vue';
import TableHeader from '../public/Table/TableHeader.vue';
import TableBody from '../public/Table/TableBody.vue';
import ComponentRowText from "../public/Table/ComponentsTable/ComponentRowText.vue";
import ComponentRowStatus from "../public/Table/ComponentsTable/ComponentRowStatus.vue";
import ComponentRowObject from "../public/Table/ComponentsTable/ComponentRowObject.vue";
import ComponentTimePassed from "../public/Table/ComponentsTable/ComponentTimePassed.vue";
import Paginate from "../public/Table/Paginate.vue";
import TableOptions from "../public/Table/TableOptions.vue";
import FilterCategory from "./filters/FilterCategory.vue";
import FilterGroupTools from "./filters/FilterGroupTools.vue";
import FilterTools from "./filters/FilterTools.vue";
import ViewCategory from "./PopupsTool/ViewCategory.vue";
import ViewTools from "./PopupsTool/ViewTools.vue";
import ViewGroupTools from "./PopupsTool/ViewGroupTools.vue";
import AddUpdateTools from "./PopupsTool/AddUpdateTools.vue";
import AddUpdateCategory from "./PopupsTool/AddUpdateCategory.vue";
import AddUpdateGroupTools from "./PopupsTool/AddUpdateGroupTools.vue";
import DeleteTools from "./PopupsTool/DeleteTools.vue";
import DeleteGroupTools from "./PopupsTool/DeleteGroupTools.vue";
import DeleteCategory from "./PopupsTool/DeleteCategory.vue";
import ToastError from "./../public/Toast/ToastError.vue";

export default {
    data() {
        return {
            isActivePopUp: false,
            selectedOption: '',
            valueID: '',
            tableOptionSelected: "Tools",
            props: {
                Tools: this.getDataTool
            },
            Components: {
                Tools: [
                    markRaw(ComponentRowText),
                    markRaw(ComponentRowText),
                    markRaw(ComponentRowText),
                    markRaw(ComponentRowObject),
                    markRaw(ComponentRowStatus),
                    markRaw(ComponentTimePassed),

                ],
                GroupTools: [
                    markRaw(ComponentRowText),
                    markRaw(ComponentRowText),
                    markRaw(ComponentRowText),
                    markRaw(ComponentRowStatus),
                    markRaw(ComponentTimePassed),
                ],
                Category: [
                    markRaw(ComponentRowText),
                    markRaw(ComponentRowText),
                    markRaw(ComponentRowStatus),
                    markRaw(ComponentTimePassed),
                ],
            },
            isPicked: false,
            store: {
                Category: categoryStore(),
                GroupTools: groupToolsStore(),
                Tools: toolsStore()
            },
            toolStore: toolsStore(),
            groupToolStore: groupToolsStore(),
            selectItems: [

            ],
            toast: {
                msg: '',
                visible: false,
                type: ''
            }
        }
    },
    components:
    {
        HeaderTool,
        Button,
        TableHeader,
        TableBody,
        Paginate,
        TableOptions,
        FilterCategory,
        FilterGroupTools,
        FilterTools,
        ViewCategory,
        ViewTools,
        ViewGroupTools,
        AddUpdateTools,
        AddUpdateCategory,
        DeleteTools,
        DeleteGroupTools,
        DeleteCategory,
        AddUpdateGroupTools
    },
    computed: {
        getDataStore() {
            return this.store[this.tableOptionSelected].getData(this.valueID)
        },
        propsDynamicComponent() {
            if (this.selectedOption == 'View' || this.selectedOption == 'AddUpdate')
                return { value: this.getDataStore }
            if (this.selectedOption == 'Delete')
                return { value: this.valueID }
        },
        GetLenght() {
            return `grid-template-columns: 50px repeat(${this.langsTool.Headers[this.tableOptionSelected].length}, minmax(150px, 1fr));`
        },

        langsTool() {
            return langStore().getLang.PageTool.ToolFeature
        },
        pages() {
            return langStore().getLang.Paginate
        },
    },
    async mounted() {
        Promise.all([await this.store.Category.mount(),await this.store.GroupTools.mount(),await this.store.Tools.mount()])

    },
    methods: {
        dynamicComponent(option) {
            return `${option}${this.tableOptionSelected}`
        },
        tableChange(value) {
            this.tableOptionSelected = value
        },
        changePage(page) {
            (async () => {
                try {
                    await this.store[this.tableOptionSelected].get(page)
                    this.$refs.header.$el.scrollIntoView({ behavior: "smooth" });
                } catch (e) {
                    this.toast.msg = this.pages.PageNotFound;
                    this.toast.type = ToastError
                    this.toast.visible = true;
                }
            })()
        },
        showToast(data) {
            this.toast.msg = data.msg;
            this.toast.type = data.type;
            this.toast.visible = true;
        },
        popUpOpen(select, valueId) {
            this.valueID = valueId;
            this.selectedOption = select.charAt(0).toUpperCase() + select.slice(1)
            this.isActivePopUp = true
        }
    }
}
</script>