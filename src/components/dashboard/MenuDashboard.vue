<template>
    <div class="bg-image p-4 text-white  ">
        <div class="flex justify-between items-center p-4">
            <Logo class="h-fit"/>
            <div class="relative font-openSans">
                <img class="cursor-pointer dropdown mr-6 w-14 h-14 rounded-full object-top object-cover" @click="isMenuClicked = !isMenuClicked" :src=image alt="profile" title="Menu"/>
                <div class="absolute md:right-10 right-0 md:w-44 w-52 text-black bg-white rounded-md text-sm p-1 dark:bg-black dark:text-white"
                    v-if="isMenuClicked">
                    <i class="fa-thin fa-user"></i>
                    <p @click="isProfileClicked = !isProfileClicked" class="mb-1 hover:cursor-pointer">
                        <fas class="mr-1" icon="fa-solid fa-user" /> {{langs.UserProf}}
                    </p>
                    <p @click="isPasswordClicked = !isPasswordClicked" class="mb-1 hover:cursor-pointer">
                        <fas class="mr-1" icon="fa-solid fa-lock-open" /> {{langs.ChangePass}}
                    </p>
                    <p @click="isSettingsClicked = !isSettingsClicked" class="mb-1 hover:cursor-pointer">
                        <fas class="mr-1" icon="fa-solid fa-gear" />{{langs.Settings}}
                    </p>
                    <p class="mb-1 hover:cursor-pointer">
                        <fas class="mr-1" icon="fa-solid fa-headset" />{{langs.Support}}
                    </p>
                    <hr>
                    <p class="hover:cursor-pointer" @click="logoutUser">{{langs.Logout}}</p>
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
    <PopupProfile v-if="isProfileClicked" @closePopUp="isProfileClicked= false" />
    <PopupPassword v-if="isPasswordClicked" @closePopUp="isPasswordClicked= false"></PopupPassword>
    <PopupSettings v-if="isSettingsClicked" @closePopUp="isSettingsClicked= false"></PopupSettings>
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
            isMenuClicked: false,
            isProfileClicked: false,
            isPasswordClicked: false,
            isSettingsClicked: false

        }
    },
    methods: {
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