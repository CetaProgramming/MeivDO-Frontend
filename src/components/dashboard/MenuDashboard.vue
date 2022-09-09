<template>
<component :is="this.toast.type" v-if="this.toast.visible" :msg="this.toast.msg" @closeToast="this.toast.visible = false"/>
    <div class="bg-image p-4 text-white  ">
        <div class="flex justify-between items-center p-4">
            <Logo class="h-fit"/>
            <div class="relative font-openSans">
                <img class="cursor-pointer dropdown mr-6 w-14 h-14 rounded-full object-top object-cover" @click="isMenuClicked = !isMenuClicked" :src=image alt="profile" title="Menu"/>
                <div class="absolute mt-3 right-6 md:w-44 w-52 text-black bg-white rounded-md text-sm p-1 dark:bg-black dark:text-white before:content-[''] before:block before:absolute before:w-0 before:h-0 before:border-[150px] before:border-t-0 before:border-b-12 before:border-x-12 before:border-l-transparent before:border-r-transparent before:border-b-white dark:before:border-b-black before:right-4 before:top-[-12px]"
                    v-if="isMenuClicked">
                    <i class="fa-thin fa-user"></i>
                    <p @click="isProfileClicked = !isProfileClicked" class="duration-200 mb-1 p-1 hover:cursor-pointer sm:hover:bg-slate-200 dark:sm:hover:bg-zinc-900">
                        <fas class="mr-1" icon="fa-solid fa-user" /> {{langs.UserProf}}
                    </p>
                    <p @click="isPasswordClicked = !isPasswordClicked" class="duration-200 mb-1 p-1 hover:cursor-pointer sm:hover:bg-slate-200 dark:sm:hover:bg-zinc-900">
                        <fas class="mr-1" icon="fa-solid fa-lock-open" /> {{langs.ChangePass}}
                    </p>
                    <p @click="isSettingsClicked = !isSettingsClicked" class="duration-200 mb-1 p-1 hover:cursor-pointer sm:hover:bg-slate-200 dark:sm:hover:bg-zinc-900">
                        <fas class="mr-1" icon="fa-solid fa-gear" />{{langs.Settings}}
                    </p>
                    <p class="duration-200 mb-1 p-1 hover:cursor-pointer sm:hover:bg-slate-200 dark:sm:hover:bg-zinc-900">
                        <fas class="mr-1" icon="fa-solid fa-headset" />{{langs.Support}}
                    </p>
                    <hr>
                    <p class="duration-200 p-1 hover:cursor-pointer sm:hover:bg-slate-200 dark:sm:hover:bg-zinc-900" @click="logoutUser">{{langs.Logout}}</p>
                </div>
            </div>
        </div>
        <div class="justify-center flex  flex-col items-center mt-24 md:mt-4  gap-2 font-openSans">
            <h1 class="text-4xl">{{langs.HeadingMenu}}<span class="text-red-500 ">{{name}}</span></h1>
            <h1 class="text-2xl">{{langs.HeadingMenu2}}</h1>
            <input class="w-3/5 rounded-md text-black text-xl p-2 pl-2  dark:bg-black dark:text-white" type="text"
                @input="filterItemMenu" :placeholder="langs.SearchFeat" />
        </div>
    </div>
    <PopupProfile v-if="isProfileClicked" @closePopUp="isProfileClicked= false"/>
    <PopupPassword v-if="isPasswordClicked" @activeToast="showToast" @closePopUp="isPasswordClicked= false"/>
    <PopupSettings v-if="isSettingsClicked" @closePopUp="isSettingsClicked= false" />
</template>
  
<script>
import Logo from '../public/Logo.vue';
import Popoup from '../public/Popoup.vue';
import PopupProfile from './PopupsMenu/PopupProfile.vue';
import PopupPassword from './PopupsMenu/PopupPassword.vue';
import PopupSettings from './PopupsMenu/PopupSettings.vue';
import { computed } from 'vue';
import { langStore } from '../../store/langStore';
import { useDark, useToggle } from '@vueuse/core'
import { userLogin } from '../../store/userLogin';

export default {
    setup() {
        const store = langStore();
        const isDark = useDark()
        const toggleDark = useToggle(isDark)
        const { name, image, logout } = userLogin();

        const langs = computed(() => store.getLang.MenuDashboard);

        return {
            langs, toggleDark, isDark, name, image, logout
        }
    },
    data() {
        return {
            toast: {
                msg: '',
                visible: false,
                type: ''
            },
            isMenuClicked: false,
            isProfileClicked: false,
            isPasswordClicked: false,
            isSettingsClicked: false

        }
    },
    methods: {
        showToast(data){
            this.toast.msg = data.msg;
            this.toast.visible = true;
            this.toast.type = data.type;
        },
        filterItemMenu(event) {
            this.emitter.emit("filterItemMenu", event.target.value)
        },
        async logoutUser(){
            await this.logout();
            this.$router.push({name : 'login'});
        }
    }
    ,
    components: {
        Logo,
        Popoup,
        PopupProfile,
        PopupPassword,
        PopupSettings
    }
}
</script>
  
<style lang="scss" scoped>
</style>