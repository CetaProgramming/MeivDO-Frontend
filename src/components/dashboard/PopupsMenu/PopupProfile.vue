<template>
    <Popoup :titlePopUp="langs.Title1">
    <form @submit.prevent="updateProfile" class="flex flex-col gap-5">
        <div class="font-openSans grid grid-cols-1 items-center gap-5 md:gap-1  md:grid-cols-1fr-auto md:justify-between  md:flex-row ">
        <div class="flex flex-col gap-7">
            <InputLabelError ref="formUpdateInfoName" v-model="formUpdateInfo.name" :default="formUpdateInfo.name" class="md:w-4/5" :placeholder="langs.Name" :msg="langs.nameError" :name="langs.Name"/>
            <div class="flex flex-col gap-2">
                <label class="font-bold">Email</label>
                <h2 class="ml-4">{{userLogin.email}}</h2>
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-bold">{{langs.Role}}</label>
                <h2 class="ml-4 capitalize">{{userLogin.role.name}}</h2>
            </div>
        </div>
            <div class="flex flex-col justify-center items-center">
                <img class="dropdown w-28 h-28 md:w-32 md:h-32 rounded-full object-top object-cover" @click="isMenuClicked = !isMenuClicked" :src=formUpdateInfo.image alt="f" />
                <input class="hidden" type="file" @change="changePicture" ref="fileInput">
                <button class="bg-black text-white p-3 rounded-lg mt-2 dark:bg-zinc-800" @click.prevent="$refs.fileInput.click()">{{langs.Picture}}</button>
            </div>
        </div>
        <Button :text="langs.SaveProf" />
    </form>
    </Popoup>
</template>

<script>
import DataManipule from "./../../../helpers/DataManipulate";
import Popoup from '../../public/Popoup.vue';
import { langStore } from '../../../store/langStore';
import {useDark, useToggle} from '@vueuse/core';
import { userLogin } from '../../../store/userLogin';
import ToastError from "../../public/Toast/ToastError.vue"
import ToastSuccess from "../../public/Toast/ToastSuccess.vue"
import InputLabelError from '../../forms/InputLabelError.vue';
import Button from '../../widgets/Button.vue';
import FormValidate from '../../mixins/FormValidate';
import { markRaw } from 'vue';

export default {
    data(){
        return {
            userLogin: userLogin(),
            toggleDark: useToggle(useDark()),
            toast: {
                msg: '',
                visible: false,
                type: ''
            },
            errorsInputs: {
                name: false,
                image: false,

            },
            formUpdateInfo: {
                name: userLogin().name,
                image: userLogin().image,
                selectedFile: "",
            }
        }
    },
    computed: {
        langs(){
            return langStore().getLang.PopupProfile;
        }
    },
    methods: {
        changePicture(event){
            const selectedFile = event.target.files[0];
            if(!selectedFile.type.includes("image")){
                this.$emit("activeToast", {
                    msg: this.langs.notImage,
                    type: markRaw(ToastError)
                });
                return;
            };
            if(selectedFile.size > 1024 * 1024 *2){
                this.$emit("activeToast", {
                    msg: this.langs.bigFile,
                    type: markRaw(ToastError)
                });
                return;
            };
            this.formUpdateInfo.selectedFile = selectedFile;
            this.formUpdateInfo.image = URL.createObjectURL(selectedFile);
        },
        updateProfile() {
            try {
                if (this.validateData({name: this.formUpdateInfo.name}, {
                        name: this.$refs.formUpdateInfoName,
                }))
                    (async () => {
                        try {
                            await this.userLogin.updateProfile(
                                DataManipule.formDataImage({
                                    name: this.formUpdateInfo.name,
                                    image: this.formUpdateInfo.selectedFile
                                }, true)
                                );
                            this.$emit("closePopUp");
                            this.$emit("activeToast", {
                                msg: this.langs.updateSucess,
                                type: markRaw(ToastSuccess)
                            });
                        } catch (error) {
                            console.log(error)
                            this.$emit("activeToast", {
                                msg: this.langs.updateFailed,
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
    mixins: [FormValidate],
}
</script>
