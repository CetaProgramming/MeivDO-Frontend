<template>
    <Popoup :titlePopUp="langs.Title2" >
        <form @submit.prevent="changePassword" class="flex flex-col gap-5">
            <div class="font-openSans grid grid-cols-1  md:justify-between  md:flex-row gap-6 ">
                <InputLabelError ref="formPasswordPassword" type="password" v-model="formResetPassword.password" placeholder="********" :msg="langs.PasswordError" :name="langs.Password"/>
                <div class=" grid md:grid-cols-2 gap-6">
                    <InputLabelError ref="formPasswordNewPassword" type="password" v-model="formResetPassword.newPassword" placeholder="********" :msg="langs.newPasswordError" :name="langs.NewPassword"/>
                    <InputLabelError ref="formPasswordConfPassword" type="password" v-model="formResetPassword.passwordConfirm" placeholder="********" :msg="langs.passwordConfirmError" :name="langs.ConfirmNewPassword"/>
                </div>
            </div>
            <Button :text="langs.SavePass"/>
        </form>
    </Popoup>
</template>

<script>
import Popoup from '../../public/Popoup.vue';
import { ref } from 'vue';
import { langStore } from '../../../store/langStore';
import {useDark, useToggle} from '@vueuse/core'
import ToastError from "../../public/Toast/ToastError.vue"
import ToastSuccess from "../../public/Toast/ToastSuccess.vue"
import {userLogin} from "../../../store/userLogin"
import InputLabelError from '../../forms/InputLabelError.vue';
import Button from '../../widgets/Button.vue';
import FormValidate from '../../mixins/FormValidate';
import { markRaw } from 'vue';

export default {
    data() {
        return {
            toggleDark: useToggle(useDark()),
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
    computed: {
        langs(){
            return langStore().getLang.PopupPassword;
        }
    },
    methods: {
        changePassword() {
            try {
                const isError = ref(false);
                isError.value = !this.validateData({password: this.formResetPassword.password, newPassword: this.formResetPassword.password}, {
                    password: this.$refs.formPasswordPassword,
                    newPassword: this.$refs.formPasswordNewPassword
                });
                const equal = this.equalData(this.formResetPassword.newPassword, this.formResetPassword.passwordConfirm);
                if(!equal){
                    isError.value = true;           
                    this.$refs.formPasswordConfPassword.$data.isError = true;
                }
                if(!isError.value)
                    (async () => {
                        try {
                            await userLogin().changePassword({
                                password: this.formResetPassword.password,
                                newPassword: this.formResetPassword.newPassword,
                            });
                            this.$emit("closePopUp");
                            this.$emit("activeToast", {
                                msg: this.langs.changedSucess,
                                type: markRaw(ToastSuccess)
                            });
                        } catch (error) {
                            this.$emit("activeToast", {
                                msg: this.langs.changedFailed,
                                type: markRaw(ToastError)
                            });
                         }
                    })();
            } catch (e) {
                console.error(e);
            }
        },
    },
    components: {
        Popoup,
        ToastError,
        ToastSuccess,
        InputLabelError,
        Button
    },
    mixins: [FormValidate]
}
</script>
