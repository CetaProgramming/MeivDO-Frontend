<template>
    <component :is="this.toast.type" v-if="this.toast.visible" :msg="this.toast.msg" @closeToast="this.toast.visible = false"/>
    <div class="flex justify-between items-center p-4" @mouseleave="showHideMenu(false)">
        <Logo class="h-fit"/>
        <div class="relative font-openSans">
            <img class="cursor-pointer dropdown mr-6 w-14 h-14 rounded-full object-top object-cover" @click="showHideMenu(null)" :src=loginStoreImage alt="profile" title="Menu"/>
            <Transition>
            <div class="absolute mt-3 right-6 md:w-44 w-52 text-black bg-white rounded-md text-sm p-1 dark:bg-MeivMatteBlack dark:text-white before:content-[''] before:block before:absolute before:w-0 before:h-0 before:border-[150px] before:border-t-0 before:border-b-12 before:border-x-12 before:border-l-transparent before:border-r-transparent before:border-b-white dark:before:border-b-black before:right-4 before:top-[-12px]"
                v-if="isMenuClicked" @click="showHideMenu(false)">
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
                <hr>
                <p class="duration-200 p-1 hover:cursor-pointer sm:hover:bg-slate-200 dark:sm:hover:bg-zinc-900" @click="logoutUser">{{langs.Logout}}</p>
            </div>
            </Transition>
        </div>
        <Transition appear>
            <PopupProfile v-if="isProfileClicked" @activeToast="showToast" @closePopUp="isProfileClicked= false"/>
        </Transition>
        <Transition appear>
            <PopupPassword v-if="isPasswordClicked" @activeToast="showToast" @closePopUp="isPasswordClicked= false"/>
        </Transition>
        <Transition appear>
            <PopupSettings v-if="isSettingsClicked" @closePopUp="isSettingsClicked= false" />
        </Transition>
    </div>
</template>

<script>
    import Logo from '../public/Logo.vue';
    import PopupProfile from './PopupsMenu/PopupProfile.vue';
    import PopupPassword from './PopupsMenu/PopupPassword.vue';
    import PopupSettings from './PopupsMenu/PopupSettings.vue';
    import { langStore } from '../../store/langStore';
    import { useDark, useToggle } from '@vueuse/core'
    import { userLogin } from '../../store/userLogin';
    export default {
        data() {
            return {
                toggleDark: useToggle(useDark()),
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
        computed: {
            langs(){
                return langStore().getLang.MenuDashboard;
            },
            loginStoreImage(){
                return userLogin().image;
            },
        },
        methods: {
            showHideMenu(option = null){
                this.isMenuClicked = option ?? !this.isMenuClicked;
            },
            showToast(data){
                this.toast.msg = data.msg;
                this.toast.visible = true;
                this.toast.type = data.type;
            },
            async logoutUser(){
                await userLogin().logout();
                this.$router.push({name : 'login'});
            }
        },
        components: {
            Logo,
            PopupProfile,
            PopupPassword,
            PopupSettings,
        }
    }
</script>