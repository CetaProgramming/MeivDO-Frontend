<template>
     <Transition name="slide-fade">
         <component :is="this.toast.type" v-if="this.toast.visible" :msg="this.toast.msg" @closeToast="this.toast.visible = false"/>
     </Transition>
    <div class="bg-MeivAsh  min-h-screen font-openSans dark:bg-zinc-900">
        <div class="px-8 md:px-16 py-8 flex flex-col gap-5">
            <HeaderInspection @activeToast="showToast" :isCompleted="this.tableOptionSelected"/>
            <component :is="dynamicComponent('Filter')"/>
            <TableOptions valueIncome="Completed" title="PageInspections" @tableChange="tableChange"></TableOptions>
            <div class="grid gap-1 lg:gap-0 lg:flex lg:flex-col lg:overflow-auto">
                <TableHeader ref="header"  :header=langsInspection.Headers[tableOptionSelected] :style="GetLenght" />
                <TableBody :showSelect="tableOptionSelected == 'Missing' ? false: true" :header=langsInspection.Headers[tableOptionSelected] :component="Components[tableOptionSelected]" 
                    :items=store[tableOptionSelected].viewing :style="GetLenght" :selectItems="langsInspection.Options[tableOptionSelected]" @selectOption="popUpOpen" />
            </div>
            <Paginate v-if="store[tableOptionSelected].viewing.length" @selectPage="changePage" :pag="store[tableOptionSelected].pag" /> 
        </div>
    </div>
    <Transition>
        <component v-if="isActivePopUp" @activeToast="showToast" @closePopUp="isActivePopUp= false"
            :is="dynamicComponent(selectedOption)" v-bind="propsDynamicComponent"/>
    </Transition>
</template>
<script>
import { markRaw } from "vue";
import { inspectionCompletedStore } from './../../store/inspectionCompletedStore';
import { inspectionMissingStore } from './../../store/inspectionMissingStore';
import { langStore } from "../../store/langStore";
import HeaderInspection from './HeaderInspection.vue';
import FilterCompleted from "./filters/FilterCompleted.vue";
import FilterMissing from "./filters/FilterMissing.vue";
import TableOptions from "../public/Table/TableOptions.vue";
import TableHeader from "../public/Table/TableHeader.vue";
import TableBody from './../public/Table/TableBody.vue';
import Paginate from './../public/Table/Paginate.vue';
import ComponentRowText from '../public/Table/ComponentsTable/ComponentRowText.vue';
import ComponentRowStatusWord from '../public/Table/ComponentsTable/ComponentRowStatusWord.vue';
import ComponentTimePassed from "../public/Table/ComponentsTable/ComponentTimePassed.vue";
import DeleteCompleted from "./PopupsInspection/DeleteCompleted.vue";
import AddUpdateCompleted from "./PopupsInspection/AddUpdateCompleted.vue";
import ViewCompleted from "./PopupsInspection/ViewCompleted.vue";
import AddUpdateMissing from "./PopupsInspection/AddUpdateMissing.vue";


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
                    markRaw(ComponentRowStatusWord),
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
                Completed: inspectionCompletedStore(),
                Missing: inspectionMissingStore(),
            },     
            selectItems: {
                
            }
        }
    },
    computed: {
        getDataStore() {
            return this.store[this.tableOptionSelected].getData(this.valueID)
        },
         GetLenght() {
            return `grid-template-columns: 50px repeat(${this.langsInspection.Headers[this.tableOptionSelected].length}, minmax(150px, 1fr));`
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
        pages(){
            return langStore().getLang.Paginate
        }
    },
    async mounted() {
        Promise.all([await this.store.Completed.mount(),await this.store.Missing.mount()])
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
        changePage(page){
            (async () => {
                try {
                    await this.store[this.tableOptionSelected].get(page)
                    this.$refs.header.$el.scrollIntoView({ behavior: "smooth" });
                } catch (e){
                    this.toast.msg = this.pages.PageNotFound;
                    this.toast.type = ToastError
                    this.toast.visible = true;
                }
                })()
        },
        showToast(data){
            this.toast.msg = data.msg;
            this.toast.type = data.type;
            this.toast.visible = true;
        },
    },
    components: {
    HeaderInspection,
    FilterCompleted,
    FilterMissing,
    TableOptions,
    TableHeader,
    TableBody,
    Paginate,
    DeleteCompleted,
    AddUpdateCompleted,
    ViewCompleted,
    AddUpdateMissing
},
    
}
</script>