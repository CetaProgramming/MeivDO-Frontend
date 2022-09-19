<template>
    <component :is="this.toast.type" v-if="this.toast.visible" :msg="this.toast.msg" @closeToast="this.toast.visible = false"/>
    <div class="bg-MeivAsh  min-h-screen font-openSans dark:bg-zinc-900">
        <div class="px-8 md:px-16 py-8 flex flex-col gap-5">
            <HeaderUser />
            <MenuUsers />
            <div class="grid gap-1 lg:gap-0 lg:flex lg:flex-col lg:overflow-auto">
                <TableHeader ref="header" :header=langsUser.UserHeader :style="GetLenght" />
                <TableBody :header=langsUser.UserHeader :items=userStore.viewing :style="GetLenght" :selectItems="selectItems" @selectOption="popUpOpen"/>
            </div>
            <Paginate @selectPage="changePage" :pag="userStore.pag" />

            <AddUserPop v-if="isUpdatedUserClicked" @closePopUp="isUpdatedUserClicked= false"/>
        </div>
    </div>
</template>
<script>
import { usersStore } from './../../store/usersStore';
import { computed } from 'vue';
import { langStore } from "../../store/langStore";
import { userLogin } from "../../store/userLogin"
import HeaderUser from './HeaderUser.vue';
import MenuUsers from './MenuUsers.vue';
import TableHeader from './../public/Table/TableHeader.vue';
import TableBody from './../public/Table/TableBody.vue';
import Paginate from './../public/Table/Paginate.vue';
import AddUserPop from './Popups User/AddUserPop.vue';
import ToastError from '../public/Toast/ToastError.vue';
import ToastSuccess from '../public/Toast/ToastSuccess.vue';

export default {
    setup() {
        const store = langStore();
        const user = userLogin();
        const langs = computed(() => store.getLang.ItemMenu);
        const pages = computed(() => store.getLang.Paginate);
        const langsUser = computed(() => store.getLang.UserFeature);
        const menuItems = computed(() => user.role && user.role.permissions.map(permission => permission.feature));
        return {
            langs, menuItems, langsUser, pages
        }
    },
    data() {
        return {
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
    async mounted(){
        await this.userStore.mount()
    },
    computed: {
        GetLenght() {
            return  `grid-template-columns: 50px repeat(${this.langsUser.UserHeader.length}, minmax(150px, 1fr));`
        }
    },
    methods: {
        popUpOpen(select, userId){
            console.log(select, userId);
        },
        changePage(page){
            (async () => {
                try {
                    await this.userStore.get(page)
                    this.$refs.header.$el.scrollIntoView({ behavior: "smooth" });
                } catch (e){
                    this.toast.msg = this.pages.PageNotFound;;
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
        AddUserPop
    },
    
}
</script>