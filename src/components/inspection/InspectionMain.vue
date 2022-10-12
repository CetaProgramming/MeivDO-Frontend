<template>
    <component :is="this.toast.type" v-if="this.toast.visible" :msg="this.toast.msg" @closeToast="this.toast.visible = false"/>
    <div class="bg-MeivAsh  min-h-screen font-openSans dark:bg-zinc-900">
        <div class="px-8 md:px-16 py-8 flex flex-col gap-5">
            <HeaderInspection @activeToast="showToast"/>
            <!-- <FilterInspections />
            <div class="grid gap-1 lg:gap-0 lg:flex lg:flex-col lg:overflow-auto">
                <TableHeader ref="header" :header=langsInspection.InspectionHeader :style="GetLenght" />
                <TableBody :header=langsInspection.InspectionHeader :component="ComponentInspection" :items=inspectionStore.viewing :style="GetLenght" :selectItems="selectItems" @selectOption="popUpOpen" />
            </div>
            <Paginate @selectPage="changePage" :pag="inspectionStore.pag" /> -->
        </div>
    </div>
        <!-- <PopupDeleteInspection v-if="isDeleteClicked" @activeToast="showToast" @closePopUp="isDeleteClicked= false" :IdInspection="inspectionID"/>
        <AddInspectionPop v-if="isUpdateClick" @activeToast="showToast" @closePopUp="isUpdateClick= false" :inspection="getDataInspection" :showActive="true" />
        <ShowInspectionPop v-if="isShowClick" @activeToast="showToast" @closePopUp="isShowClick= false" :inspection="getDataInspection" :showActive="true" /> -->
</template>
<script>
// import { markRaw } from "vue";
// import { inspectionStore } from './../../store/inspectionStore';
import { langStore } from "../../store/langStore";
import HeaderInspection from './HeaderInspection.vue';
// import FilterInspections from './FilterInspections.vue';
// import TableHeader from './../public/Table/TableHeader.vue';
// import TableBody from './../public/Table/TableBody.vue';
// import Paginate from './../public/Table/Paginate.vue';
// import PopupDeleteInspection from '../../components/inspection/PopupsInspection/PopupDeleteInspection.vue';
// import AddInspectionPop from './PopupsInspection/AddInspectionPop.vue';
// import ShowInspectionPop from './PopupsInspection/ShowInspectionPop.vue';
// import ComponentRowText from '../public/Table/ComponentsTable/ComponentRowText.vue';
// import ComponentRowStatus from '../public/Table/ComponentsTable/ComponentRowStatus.vue';
// import ComponentRowStatusWord from '../public/Table/ComponentsTable/ComponentRowStatusWord.vue';
// import ComponentRowObject from '../public/Table/ComponentsTable/ComponentRowObject.vue';
// import ComponentTimePassed from "../public/Table/ComponentsTable/ComponentTimePassed.vue";

export default {
    data() {
        return {
            // ComponentInspection: [ 
            //     markRaw(ComponentRowText), 
            //     markRaw(ComponentRowText),
            //     markRaw(ComponentRowText),
            //     markRaw(ComponentRowText),
            //     markRaw(ComponentRowStatusWord),
            //     markRaw(ComponentTimePassed),
            // ],
            // isShowClick: false,
            // isUpdateClick : false,
            // inspectionID: null,
            toast: {
                msg: '',
                visible: false,
                type: ''
            },
            // isDeleteClicked : false,
            // inspectionStore: inspectionStore(),
            // selectItems: [
            //     {
            //         key: "",
            //         disabled: true,
            //         component: "",
            //         value: "Options"
            //     },
            //     {
            //         key: "show",
            //         component: "",
            //         value: "Show"
            //     },
            //     {
            //         key: "update",
            //         component: "",
            //         value: "Update"
            //     },
            //     {
            //         key: "deleted",
            //         component: "",
            //         value: "Delete"
            //     }
            // ]
        }
    },
    computed: {
        // GetLenght() {
        //     return  `grid-template-columns: 50px repeat(${this.langsInspection.InspectionHeader.length}, minmax(150px, 1fr));`
        // },
        // getDataInspection(){
            
        //     return this.inspectionStore.inspections.find(inspection =>  this.inspectionID == inspection.id)
            
        // },
        langsInspection() {
            return langStore().getLang.PageInspections.InspectionFeature
        },
        // pages(){
        //     return langStore().getLang.Paginate
        // }
    },
    // async mounted(){
    //     await this.inspectionStore.mount()
    // },
    methods: {
        // popUpOpen(select, inspectionId){
        //     this.inspectionID = inspectionId;
        //     if(select == "show"){
        //         this.isShowClick = true;
        //     }
        //     if(select == "deleted"){
        //         this.isDeleteClicked = true;
        //     }
        //     if(select == "update") {
        //         this.isUpdateClick = true
        //     }
        // },
        // changePage(page){
        //     (async () => {
        //         try {
        //             await this.inspectionStore.get(page)
        //             this.$refs.header.$el.scrollIntoView({ behavior: "smooth" });
        //         } catch (e){
        //             this.toast.msg = this.pages.PageNotFound;
        //             this.toast.type = ToastError
        //             this.toast.visible = true;
        //         }
        //         })()
        // },
        showToast(data){
            this.toast.msg = data.msg;
            this.toast.type = data.type;
            this.toast.visible = true;
        },
    },
    components: {
    HeaderInspection,
    // FilterInspections,
    // TableBody,
    // Paginate,
    // TableHeader,
    // PopupDeleteInspection,
    // AddInspectionPop,
    // ShowInspectionPop,
    // ComponentRowText,
    // ComponentRowStatus,
    // ComponentRowStatusWord,
    // ComponentRowObject,
    // ComponentTimePassed
},
    
}
</script>