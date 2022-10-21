<template>
    <Transition name="slide-fade">
        <component :is="this.toast.type" v-if="this.toast.visible" :msg="this.toast.msg" @closeToast="this.toast.visible = false"/>
    </Transition>
    <div class="bg-MeivAsh  min-h-screen font-openSans dark:bg-zinc-900">
        <div class="px-8 md:px-16 py-8 flex flex-col gap-5">
            <HeaderProject @activeToast="showToast"/>
            <FilterProjects />
            <div class="grid gap-1 lg:gap-0 lg:flex lg:flex-col lg:overflow-auto">
                <TableHeader ref="header" :header=langsProject.ProjectHeader :style="GetLenght" />
                <TableBody :header=langsProject.ProjectHeader :component="ComponentProject" :items=projectStore.viewing :style="GetLenght" :selectItems="langsProject.Options" @selectOption="popUpOpen" />
            </div>
            <Paginate @selectPage="changePage" :pag="projectStore.pag" />
        </div>
    </div>
    <Transition>
        <PopupDeleteProject v-if="isDeleteClicked" @activeToast="showToast" @closePopUp="isDeleteClicked= false" :IdProject="projectID"/>
    </Transition>
    <Transition>
        <AddProjectPop v-if="isUpdateClick" @activeToast="showToast" @closePopUp="isUpdateClick= false" :project="getDataProject" :showActive="true" />
    </Transition>
    <Transition>
        <ShowProjectPop v-if="isShowClick" @activeToast="showToast" @closePopUp="isShowClick= false" :project="getDataProject" :showActive="true" />
    </Transition>
    <Transition>
        <ChangeStatusPop v-if="isStatusClick" @activeToast="showToast" @closePopUp="isStatusClick= false" :IdProject="projectID" :project="getDataProject" :showActive="true" />
    </Transition>
</template>
<script>
import { markRaw } from "vue";
import { projectStore } from './../../store/projectStore';
import { langStore } from "../../store/langStore";
import HeaderProject from './HeaderProject.vue';
import FilterProjects from './FilterProjects.vue';
import TableHeader from './../public/Table/TableHeader.vue';
import TableBody from './../public/Table/TableBody.vue';
import Paginate from './../public/Table/Paginate.vue';
import PopupDeleteProject from '../../components/project/PopupsProject/PopupDeleteProject.vue';
import AddProjectPop from './PopupsProject/AddProjectPop.vue';
import ShowProjectPop from './PopupsProject/ShowProjectPop.vue';
import ChangeStatusPop from "./PopupsProject/ChangeStatusPop.vue";
import ComponentRowText from '../public/Table/ComponentsTable/ComponentRowText.vue';
import ComponentRowStatus from '../public/Table/ComponentsTable/ComponentRowStatus.vue';
import ComponentRowStatusWord from '../public/Table/ComponentsTable/ComponentRowStatusWord.vue';
import ComponentRowObject from '../public/Table/ComponentsTable/ComponentRowObject.vue';
import ComponentTimePassed from "../public/Table/ComponentsTable/ComponentTimePassed.vue";

export default {
    data() {
        return {
            ComponentProject: [ 
                markRaw(ComponentRowText), 
                markRaw(ComponentRowText),
                markRaw(ComponentRowText),
                markRaw(ComponentRowText),
                markRaw(ComponentRowStatusWord),
                markRaw(ComponentTimePassed),
            ],
            isShowClick: false,
            isUpdateClick : false,
            isStatusClick : false,
            isDeleteClicked : false,
            projectID: null,
            toast: {
                msg: '',
                visible: false,
                type: ''
            },
            projectStore: projectStore(),
            selectItems: [

            ]
        }
    },
    computed: {
        GetLenght() {
            return  `grid-template-columns: 50px repeat(${this.langsProject.ProjectHeader.length}, minmax(150px, 1fr));`
        },
        getDataProject(){
            
            return this.projectStore.projects.find(project =>  this.projectID == project.id)
            
        },
        langsProject() {
            return langStore().getLang.PageProjects.ProjectFeature
        },
        pages(){
            return langStore().getLang.Paginate
        }
    },
    async mounted(){
        await this.projectStore.mount()
    },
    methods: {
        popUpOpen(select, projectId){
            this.projectID = projectId;
            if(select == "show"){
                this.isShowClick = true;
            }
            if(select == "deleted"){
                this.isDeleteClicked = true;
            }
            if(select == "update") {
                this.isUpdateClick = true
            }
            if(select == "status") {
                this.isStatusClick = true
            }
        },
        changePage(page){
            (async () => {
                try {
                    await this.projectStore.get(page)
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
    HeaderProject,
    FilterProjects,
    TableBody,
    Paginate,
    TableHeader,
    PopupDeleteProject,
    AddProjectPop,
    ShowProjectPop,
    ChangeStatusPop,
    ComponentRowText,
    ComponentRowStatus,
    ComponentRowStatusWord,
    ComponentRowObject,
    ComponentTimePassed
},
    
}
</script>