<template>
    <component :is="this.toast.type" v-if="this.toast.visible" :msg="this.toast.msg" @closeToast="this.toast.visible = false"/>
    <div class="bg-MeivAsh  min-h-screen font-openSans dark:bg-zinc-900">
        <div class="px-8 md:px-16 py-8 flex flex-col gap-5">
            <HeaderUser />
            <MenuUsers />
            <div class="grid gap-1 lg:gap-0 lg:flex lg:flex-col lg:overflow-auto">
                <TableHeader ref="header" :header=langsUser.UserHeader :style="GetLenght" />
                <TableBody :header=langsUser.UserHeader :component="ComponentUser" :items=userStore.viewing :style="GetLenght" :selectItems="selectItems" @selectOption="popUpOpen"/>
            </div>
            <Paginate @selectPage="changePage" :pag="userStore.pag" />
           <AddUserPop v-if="isUpdateClick" @closePopUp="isUpdateClick= false" :showActive="true" />
        </div>
    </div>
</template>
<script>
import { usersStore } from './../../store/usersStore';
import { langStore } from "../../store/langStore";
import HeaderUser from './HeaderUser.vue';
import MenuUsers from './MenuUsers.vue';
import TableHeader from './../public/Table/TableHeader.vue';
import TableBody from './../public/Table/TableBody.vue';
import Paginate from './../public/Table/Paginate.vue';
import AddUserPop from './PopupsUser/AddUserPop.vue';
import ComponentRowText from '../public/Table/ComponentsTable/ComponentRowText.vue';
import ComponentRowStatus from '../public/Table/ComponentsTable/ComponentRowStatus.vue';
import ComponentRowObject from '../public/Table/ComponentsTable/ComponentRowObject.vue';

export default {
    data() {
        return {
            ComponentUser: [ 
                ComponentRowText, 
                ComponentRowText,
                ComponentRowText, 
                ComponentRowObject,
                ComponentRowStatus,
                ComponentRowText
            ],
            isUpdateClick : false,
            userID: null,
            toast: {
                msg: '',
                visible: false,
                type: ''
            },
            userStore: usersStore(), 
            selectItems: [
                {
                    key: "",
                    disabled: true,
                    component: "",
                    value: "Options"
                },
                {
                    key: "update",
                    component: "",
                    value: "Updated"
                },
                {
                    key: "resetPassword",
                    component: "",
                    value: "Reset Password"
                },
                {
                    key: "deleted",
                    component: "",
                    value: "Deleted"
                }
            ]
        }
    },
    computed: {
        GetLenght() {
            return  `grid-template-columns: 50px repeat(${this.langsUser.UserHeader.length}, minmax(150px, 1fr));`
        },
        langsUser() {
            return langStore().getLang.UserFeature
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
            console.log(select, userId);
            this.userID = userId
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
        }
    },
    components: {
    HeaderUser,
    MenuUsers,
    TableBody,
    Paginate,
    TableHeader,
    AddUserPop,
    ComponentRowText,
    ComponentRowStatus,
    ComponentRowObject
},
    
}
</script>