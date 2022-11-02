<template>
    <Transition name="slide-fade">
        <component :is="this.toast.type" v-if="this.toast.visible" :msg="this.toast.msg" @closeToast="this.toast.visible = false"/>
    </Transition>
    <div class="bg-MeivAsh  min-h-screen font-openSans dark:bg-zinc-900">
        <div class="px-8 md:px-16 py-8 flex flex-col gap-5">
            <HeaderUser @activeToast="showToast"/>
            <FilterUsers />
            <div class="grid gap-1 lg:gap-0 lg:flex lg:flex-col lg:overflow-auto">
                <TableHeader ref="header" :header=langsUser.UserHeader :style="GetLenght" />
                <TableBody :header=langsUser.UserHeader :component="ComponentUser" :items=userStore.viewing :style="GetLenght" :selectItems="langsUser.Options" @selectOption="popUpOpen" />
            </div>
            <Paginate v-if="userStore.viewing.length" @selectPage="changePage" :pag="userStore.pag" />
        </div>
    </div>
        <Transition>
            <PopupResetPassword v-if="isResetClicked" @activeToast="showToast" @closePopUp="isResetClicked= false" :IdUser="userID"/>
        </Transition>
        <Transition>
            <PopupDeleteUser v-if="isDeleteClicked" @activeToast="showToast" @closePopUp="isDeleteClicked= false" :IdUser="userID"/>
        </Transition>
        <Transition>
            <AddUserPop v-if="isUpdateClick" @activeToast="showToast" @closePopUp="isUpdateClick= false" :user="getDataUser" :showActive="true" />
        </Transition>
</template>
<script>
import { markRaw } from "vue";
import { usersStore } from './../../store/usersStore';
import { langStore } from "../../store/langStore";
import HeaderUser from './HeaderUser.vue';
import TableHeader from './../public/Table/TableHeader.vue';
import TableBody from './../public/Table/TableBody.vue';
import Paginate from './../public/Table/Paginate.vue';
import PopupResetPassword from '../../components/user/PopupsUser/PopupResetPassword.vue';
import PopupDeleteUser from '../../components/user/PopupsUser/PopupDeleteUser.vue';
import AddUserPop from './PopupsUser/AddUserPop.vue';
import ComponentRowText from '../public/Table/ComponentsTable/ComponentRowText.vue';
import ComponentRowStatus from '../public/Table/ComponentsTable/ComponentRowStatus.vue';
import ComponentRowObject from '../public/Table/ComponentsTable/ComponentRowObject.vue';
import ComponentTimePassed from "../public/Table/ComponentsTable/ComponentTimePassed.vue";
import FilterUsers from "./FilterUsers.vue";

export default {
    data() {
        return {
            ComponentUser: [ 
                markRaw(ComponentRowText), 
                markRaw(ComponentRowText),
                markRaw(ComponentRowText), 
                markRaw(ComponentRowObject),
                markRaw(ComponentRowStatus),
                markRaw(ComponentTimePassed)
            ],
            isUpdateClick : false,
            userID: null,
            toast: {
                msg: '',
                visible: false,
                type: ''
            },
            isResetClicked : false,
            isDeleteClicked : false,
            userStore: usersStore(),
            selectItems: [
                
            ]
        }
    },
    computed: {
        GetLenght() {
            return  `grid-template-columns: 50px repeat(${this.langsUser.UserHeader.length}, minmax(150px, 1fr));`
        },
        getDataUser(){
            
            return this.userStore.users.find(user =>  this.userID == user.id)
            
        },
        langsUser() {
            return langStore().getLang.PageUsers.UserFeature
        },
        pages(){
            return langStore().getLang.Paginate
        }
    },
    async mounted(){
        await this.userStore.mount()
    },
    methods: {
        popUpOpen(select, userId){
            this.userID = userId;
            if(select == "resetPassword"){
                this.isResetClicked = true;
            }
            if(select == "deleted"){
                this.isDeleteClicked = true;
            }
            if(select == "update") {this.isUpdateClick = true}
        },
        changePage(page){
            (async () => {
                try {
                    await this.userStore.get(page)
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
    HeaderUser,
    TableBody,
    Paginate,
    TableHeader,
    PopupResetPassword,
    PopupDeleteUser,
    AddUserPop,
    ComponentRowText,
    ComponentRowStatus,
    ComponentRowObject,
    ComponentTimePassed,
    FilterUsers
},
    
}
</script>