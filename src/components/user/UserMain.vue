<template>
    <div class="bg-MeivAsh  min-h-screen font-openSans dark:bg-zinc-900">
        <div class="px-8 md:px-16 py-8 flex flex-col gap-5">
            <HeaderUser />
            <MenuUsers />
            <div class="grid gap-1 lg:gap-0 lg:flex lg:flex-col lg:overflow-auto">
                <TableHeader :header=langsUser.UserHeader :style="GetLenght" />
                <TableBody :header=langsUser.UserHeader :items=items :style="GetLenght"/>
            </div>
            <Paginate />

        </div>
    </div>
</template>
<script>
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
            items: [
                {
                    id: {
                        type: 'Text',
                        value: 1
                    },
                    name: {
                        type: 'Text',
                        value:"dsad dsadsadsadsa dsadsadsadssadsa dsadsadsadsasad sdsadsadsadsad sdsadsadsad sdsadsada"
                    },
                    email: {
                        type: 'Text',
                        value:"admin@email.comddddddddddddddd"
                    },
                    role: {
                        type: 'Text',
                        value:"Administratordsadasdasdasdasd"
                    },
                    active: {
                        type: 'HTML',
                        value: `<div class="flex justify-center items-center gap-2"><circle class=\"${1 == 1 ? 'bg-green-400' : 'bg-red-400'} rounded-xl w-3 h-3 block\"></circle><p class=\"text-center\">${1 == 1 ? this.langsUser.Active : this.langsUser.Inactive}</p> </div>`,
                    },
                    email: {
                        type: 'Text',
                        value:"admin@email.comddddddddddddddd"
                    },
                    updated: {
                        type: 'Text',
                        value: "dasadsas",
                    },
                    actions: {
                        type: 'HTML',
                        value: "<select id=\"status\" class=\"bg-zinc-400 p-1 rounded-md text-center hover:cursor-pointer w-full lg:w-auto dark:bg-zinc-800\"><option value=\"\" disabled selected hidden>Options</option><option value=\"Update\">Update</option><option value=\"ResetPassword\">Reset Password</option><option value=\"Delete\">Delete</option></select>"
                    }
                },
                {
                    id: {
                        type: 'Text',
                        value: 1
                    },
                    name: {
                        type: 'Text',
                        value:"Bruno"
                    },
                    email: {
                        type: 'Text',
                        value:"admin@email.comddddddddddddddd"
                    },
                    role: {
                        type: 'Text',
                        value:"Administratordsadasdasdasdasd"
                    },
                    active: {
                        type: 'HTML',
                        value: `<div class="flex justify-center items-center gap-2"><circle class=\"${1 == 1 ? 'bg-green-400' : 'bg-red-400'} rounded-xl w-3 h-3 block\"></circle><p class=\"text-center\">${1 == 1 ? this.langsUser.Active : this.langsUser.Inactive}</p> </div>`,
                    },
                    email: {
                        type: 'Text',
                        value:"admin@email.comddddddddddddddd"
                    },
                    updated: {
                        type: 'Text',
                        value: "dasadsas",
                    },
                    actions: {
                        type: 'HTML',
                        value: "<select id=\"status\" class=\"bg-zinc-400 p-1 rounded-md text-center hover:cursor-pointer w-full lg:w-auto dark:bg-zinc-800\"><option value=\"\" disabled selected hidden>Options</option><option value=\"Update\">Update</option><option value=\"ResetPassword\">Reset Password</option><option value=\"Delete\">Delete</option></select>"
                    }
                },
            ]
        }
    },
    computed: {
        GetLenght() {
            return  `grid-template-columns: 50px repeat(${this.langsUser.UserHeader.length}, minmax(150px, 1fr));`
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