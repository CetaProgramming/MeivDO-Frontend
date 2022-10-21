<template>
    <component :is="this.toast.type" v-if="this.toast.visible" :msg="this.toast.msg"
        @closeToast="this.toast.visible = false" />
    <div class="bg-MeivAsh  min-h-screen font-openSans dark:bg-zinc-900">
        <div class="px-8 md:px-16 py-8 flex flex-col gap-5">
            <HeaderRepair @activeToast="showToast" :isCompleted="this.tableOptionSelected" />
            <FilterCompleted :selectStore="tableOptionSelected"></FilterCompleted>
            <TableOptions valueIncome="Completed" title="PageRepairs" @tableChange="tableChange"></TableOptions>
            <div class="grid gap-1 lg:gap-0 lg:flex lg:flex-col lg:overflow-auto">
                <TableHeader ref="header" :header=langsRepair.RepairHeader :style="GetLenght" />
                <TableBody :showSelect="tableOptionSelected == 'Missing' ? false: true" :header=langsRepair.RepairHeader
                    :component="Components[tableOptionSelected]" :items=store[tableOptionSelected].viewing
                    :style="GetLenght" :selectItems="langsInspection.Options[tableOptionSelected]" @selectOption="popUpOpen" />
            </div>

            <Paginate @selectPage="changePage" :pag="store[tableOptionSelected].pag" />
        </div>
    </div>
     <component v-if="isActivePopUp" @activeToast="showToast" @closePopUp="isActivePopUp= false"
        :is="dynamicComponent(selectedOption)" v-bind="propsDynamicComponent"/>
    <component :is="this.toast.type" v-if="this.toast.visible" :msg="this.toast.msg"
        @closeToast="this.toast.visible = false" /> 
</template>
<script>
import { markRaw } from "vue";
import { repairCompletedStore } from './../../store/repairCompletedStore';
import { repairMissingStore } from './../../store/repairMissingStore';
import { langStore } from "../../store/langStore";
import HeaderRepair from './HeaderRepair.vue';
import FilterCompleted from "./filters/FilterCompleted.vue";
import TableOptions from "../public/Table/TableOptions.vue";
import Paginate from './../public/Table/Paginate.vue';
import ComponentRowText from '../public/Table/ComponentsTable/ComponentRowText.vue';
import ComponentTimePassed from "../public/Table/ComponentsTable/ComponentTimePassed.vue";
import TableHeader from "../public/Table/TableHeader.vue";
import TableBody from "../public/Table/TableBody.vue";
import AddUpdateCompleted from "./PopupsRepair/AddUpdateCompleted.vue";
import AddUpdateMissing from "./PopupsRepair/AddUpdateMissing.vue";
import ViewCompleted from "./PopupsRepair/ViewCompleted.vue";
import DeleteCompleted from "./PopupsRepair/DeleteCompleted.vue";



export default {
    data() {
        return {
            isActivePopUp: false,
            selectedOption: '',
            valueID: '',
            tableOptionSelected: "Completed",
            toast: {
                msg: '',
                visible: false,
                type: ''
            },
            Components: {
                Completed: [
                    markRaw(ComponentRowText),
                    markRaw(ComponentRowText),
                    markRaw(ComponentRowText),
                    markRaw(ComponentTimePassed),

                ],
                Missing: [
                    markRaw(ComponentRowText),
                    markRaw(ComponentRowText),
                    markRaw(ComponentRowText),
                    markRaw(ComponentTimePassed),
                ],
            },
            store: {
                Completed: repairCompletedStore(),
                Missing: repairMissingStore(),
            },
            selectItems: {
                Completed: [
                        {
                            key: "",
                            disabled: true,
                            component: "",
                            value: "Options"
                        },
                        {
                            key: "view",
                            component: "",
                            value: "View"
                        },
                        {
                            key: "addUpdate",
                            component: "",
                            value: "Update"
                        },
                        {
                            key: "delete",
                            component: "",
                            value: "Delete"
                        }
                ],
                Missing: [
                        {
                            value: "Create"
                        }
                ],

            }
        }
    },
    computed: {
        getDataStore() {
            return this.store[this.tableOptionSelected].getData(this.valueID)
        },
        GetLenght() {
            return `grid-template-columns: 50px repeat(${this.langsRepair.RepairHeader.length}, minmax(150px, 1fr));`
        },
        propsDynamicComponent() {
            if (this.selectedOption == 'View' || this.selectedOption == 'AddUpdate')
                return { value: this.getDataStore }
            if (this.selectedOption == 'Delete')
                return { value: this.valueID }
        },
        langsInspection() {
            return langStore().getLang.PageInspections.InspectionFeature
        },
        langsRepair() {
            return langStore().getLang.PageRepairs.RepairFeature
        },
        pages() {
            return langStore().getLang.Paginate
        }
    },
    async mounted() {
        Promise.all([await this.store.Completed.mount(), await this.store.Missing.mount()])
    },
    methods: {
        dynamicComponent(option) {
            return `${option}${this.tableOptionSelected}`
        },
        tableChange(value) {
            this.tableOptionSelected = value
        },
        popUpOpen(select, valueId) {
            this.valueID = valueId;
            this.selectedOption = select.charAt(0).toUpperCase() + select.slice(1)
            this.isActivePopUp = true
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
    },
    components: {
    HeaderRepair,
    FilterCompleted,
    TableOptions,
    // TableHeader,
    // TableBody,
    Paginate,
    TableHeader,
    TableBody,
    AddUpdateCompleted,
    AddUpdateMissing,
    ViewCompleted,
    DeleteCompleted
},

}
</script>