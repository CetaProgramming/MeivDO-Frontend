<template>
    <div class="bg-MeivAsh  min-h-screen font-openSans dark:bg-zinc-900">
        <div class="px-8 md:px-16 py-8 flex flex-col gap-5">
            <HeaderUser />
            <MenuUsers />
            <div class="grid gap-1 lg:gap-0 lg:flex lg:flex-col lg:overflow-auto">
                <TableHeader :header=langsUser.UserHeader :style="GetLenght" />
                <TableBody :header=langsUser.UserHeader :items=users :style="GetLenght" :selectItems="selectItems" @selectOption="popUpOpen"/>
            </div>
            <Paginate />

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

export default {
    setup() {
        const store = langStore();
        const user = userLogin();
        const langs = computed(() => store.getLang.ItemMenu);
        const langsUser = computed(() => store.getLang.UserFeature);
        const menuItems = computed(() => user.role && user.role.permissions.map(permission => permission.feature));
        return {
            langs, menuItems, langsUser
        }
    },
    data() {
        return {
            userStore: usersStore(),
            users: [],
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
        await this.userStore.get()
        this.userStore.users.forEach(user => this.users.push({
            id: {
                type: 'Text',
                value: user.id
            },
            name: {
                type: 'Text',
                value: user.name
            },
            email: {
                type: 'Text',
                value: user.email
            },
            role: {
                type: 'Text',
                value: user.role.name
            },
            active: {
                type: 'HTML',
                value: `<div class="flex justify-center items-center gap-2"><circle class=\"${user.active ? 'bg-green-400' : 'bg-red-400'} rounded-xl w-3 h-3 block\"></circle><p class=\"text-center\">${user.active ? this.langsUser.Active : this.langsUser.Inactive}</p></div>`,
            },
            updated: {
                type: 'Text',
                value: "dasadsas",
            }
        }));
    },
    computed: {
        GetLenght() {
            return  `grid-template-columns: 50px repeat(${this.langsUser.UserHeader.length}, minmax(150px, 1fr));`
        }
    },
    methods: {
        popUpOpen(select, userId){
            console.log(select, userId);
        }
    },
    components: {
        HeaderUser,
        MenuUsers,
        TableBody,
        Paginate,
        TableHeader
    },
    
}
</script>