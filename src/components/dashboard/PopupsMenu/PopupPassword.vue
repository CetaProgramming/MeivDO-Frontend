<template>
    <Popoup :titlePopUp="langs.Title2">
        <form @submit.prevent="changePassword">
            <div class="font-openSans grid grid-cols-1  md:justify-between  md:flex-row gap-6 ">
                <div class="flex flex-col gap-2">
                    <label for="password" class="block text-sm font-medium text-gray-900 dark:text-white">{{ langs.Password }}</label>
                    <input type="password" id="password" v-model="formResetPassword.password"
                        class="font-openSans border border-gray-500 rounded text-neutral-900 text-sm  p-3 outline-none dark:bg-zinc-800 dark:text-white dark:border-zinc-800"
                        placeholder="*********" @change="inputValid">
                    <label v-if="errorsInputs.password" class="font-openSans text-xs text-red-500 ">{{langs.PasswordError
                    }}</label>
                </div>
                <div class=" grid md:grid-cols-2 gap-6">
                    <div class="flex flex-col gap-2 ">
                        <label for="password" class="block text-sm font-medium text-gray-900 dark:text-white  ">{{ langs.NewPassword
                        }}</label>
                        <input type="password" id="newPassword"
                            class="font-openSans border w-full border-gray-500 rounded text-neutral-900 text-sm  p-3 outline-none dark:bg-zinc-800 dark:text-white dark:border-zinc-800 "
                            placeholder="*********" @change="inputValid"
                            v-model="formResetPassword.newPassword">
                        <label v-if="errorsInputs.newPassword" class="font-openSans text-xs text-red-500 ">{{langs.newPasswordError
                    }}</label>
                    </div>
                    <div class="flex flex-col gap-2 " >
                        <label for="password" class="block text-sm font-medium text-gray-900 dark:text-white">{{ langs.ConfirmNewPassword
                        }}</label>
                        <input type="password" id="passwordConfirm"
                            class="font-openSans border w-full border-gray-500 rounded text-neutral-900 text-sm  p-3 outline-none dark:bg-zinc-800 dark:text-white dark:border-zinc-800"
                            placeholder="*********" @change="inputValid"
                            v-model="formResetPassword.passwordConfirm">
                        <label v-if="errorsInputs.passwordConfirm" class="font-openSans text-xs text-red-500 ">{{langs.passwordConfirmError
                    }}</label>
                    </div>
                </div>
            </div>
            <button class="bg-red-500 text-white rounded-md p-2 w-full mt-4  items-center">{{ langs.SavePass }}</button>
        </form>
    </Popoup>
</template>

<script>
import DataValidator from '../../mixins/DataValidator.js';
import Popoup from '../../public/Popoup.vue';
import { computed } from 'vue';
import { langStore } from '../../../store/langStore';
import {useDark, useToggle} from '@vueuse/core'
import ToastError from "../../public/Toast/ToastError.vue"
import ToastSuccess from "../../public/Toast/ToastSuccess.vue"
import {userLogin} from "../../../store/userLogin"

export default {
    setup() {
        const store = langStore();
        const isDark= useDark()
        const toggleDark = useToggle(isDark)

        const langs = computed(() => store.getLang.PopupPassword);

        return {
            langs,toggleDark,isDark
        }
    },
    components: {
        Popoup, ToastError, ToastSuccess,
    },
    data() {
        return {
            toast: {
                msg: '',
                visible: false,
                type: ''
            },
            errorsInputs: {
                password: false,
                newPassword: false,
                passwordConfirm: false

            },
            formResetPassword: {
                password: '',
                newPassword: '',
                passwordConfirm:'',
            }
        }
    },
    methods: {
        inputValid(event) {
            if (this.empty(this.formResetPassword[event.target.id]))
                return this.errorsInputs[event.target.id] = true;
            return this.errorsInputs[event.target.id] = false;
        },
        formValid(event) {
            try {
                let isError = false;
                const dataForm = JSON.parse(JSON.stringify(this.formLogin));
                Object.entries(dataForm).forEach(([key, value]) => {
                    if (!value) {
                        this.errorsInputs[key] = true;
                        isError = true;
                    }
                });
                if (!isError)
                    console.log('RequestAPI');
            } catch (e) {
                console.log(e);
            }
        },
        changePassword() {
            try {
                let isError = false;
                Object.entries(this.formResetPassword).forEach(([key, value]) => {
                    if(!value){
                        this.errorsInputs[key] = true;
                        return isError = true;
                    }
                    return this.errorsInputs[key] = false;
                });
                if(this.formResetPassword.newPassword != this.formResetPassword.passwordConfirm){
                        this.errorsInputs["passwordConfirm"] = true;
                        return isError = true;
                    }
                if(!isError)
                    (async () => {
                        try {
                            await this.userLoginStore.changePassword(this.formResetPassword);
                            // this.$router.push("/dashboard");
                        } catch (error) {
                            this.toast.msg = this.langs.LoginWrong;
                            this.toast.visible = true;
                            console.log(error);
                         }
                    })();
            } catch (e) {
                console.log(e);
            }
        },
    },
    mixins: [DataValidator]
}
</script>
