<template>
    <div class="bg-image p-4 text-white  ">
        <div class="flex justify-between p-4">
            <Logo />
            <div class="relative font-openSans">
                <img class="dropdown mr-6" @click="isMenuClicked = !isMenuClicked" src="" alt="f" />
                <div class="absolute md:right-10 right-0 md:w-44 w-52 text-black bg-white rounded-md text-sm p-1"
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
                    <p class="hover:cursor-pointer">{{langs.Logout}}</p>
                </div>
            </div>
        </div>
        <div class="justify-center flex  flex-col items-center mt-24 md:mt-4  gap-2 font-openSans">
            <h1 class="text-4xl">{{langs.HeadingMenu}}<span class="text-red-500 ">Bruno Costa</span></h1>
            <h1 class="text-2xl">{{langs.HeadingMenu2}}</h1>
            <input class="w-3/5 rounded-md text-black text-xl p-2 pl-2 " type="text" v-model="input" :placeholder="langs.SearchFeat" />
        </div>
    </div>
    <PopupProfile v-if="isProfileClicked" @closePopUp="isProfileClicked= false"/>
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

export default {
    setup() {
        const store = langStore();

        const langs = computed(() => store.getLang.MenuDashboard);

        return {
            langs
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