<template>
    <Popoup :titlePopUp="langs.Title1">
    <form @submit.prevent="updateProfile">
        <div class="font-openSans grid grid-cols-1 items-center gap-5 md:gap-1 md:grid-cols-2  md:grid-cols-1fr-auto md:justify-between  md:flex-row ">
        <div class="flex flex-col gap-7">
            <div class="flex flex-col gap-2">
                <label class="font-bold">{{langs.Name}}</label>
                <!-- necessário ir a base de dados buscar os dados de utilizador -->
                <input id="name" class="p-3 rounded-md text-black text-sm bg-gray-300 pl-2 placeholder-black dark:placeholder-white dark:text-white dark:bg-zinc-800 md:w-4/5"
                 type="text" v-model="formUpdateInfo.name" @change="inputValid"/>
                 <label v-if="errorsInputs.name" class="font-openSans text-xs text-red-500 ">{{langs.nameError}}</label>
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-bold">Email</label>
                <h2 class="ml-4">{{email}}</h2>
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-bold">{{langs.Role}}</label>
                <h2 class="ml-4 capitalize">{{role.name}}</h2>
            </div>
        </div>
            <div class="flex flex-col justify-center items-center">
                <img class="dropdown w-28 h-28 md:w-32 md:h-32 rounded-full" @click="isMenuClicked = !isMenuClicked" :src=formUpdateInfo.image alt="f" />
                <input class="hidden" type="file" @change="changePicture" ref="fileInput">
                <button class="bg-black text-white p-3 rounded-lg mt-2 dark:bg-zinc-800" @click.prevent="$refs.fileInput.click()">{{langs.Picture}}</button>
            </div>

        </div>
        <button class="bg-red-500 text-white rounded-md p-2 w-full mt-4  items-center">{{langs.SaveProf}}</button>
    </form>
    </Popoup>
</template>

<script>
import DataValidator from '../../mixins/DataValidator.js';
import Popoup from '../../public/Popoup.vue';
import { computed } from 'vue';
import { langStore } from '../../../store/langStore';
import {useDark, useToggle} from '@vueuse/core';
import { userLogin } from '../../../store/userLogin';
import ToastError from "../../public/Toast/ToastError.vue"
import ToastSuccess from "../../public/Toast/ToastSuccess.vue"
import axios from 'axios';


export default {
    setup() {
        const store = langStore();

        const isDark= useDark()
        const toggleDark = useToggle(isDark)
        const { name, image, email, role, updateProfile } = userLogin();

        const langs = computed(() => store.getLang.PopupProfile);

        return {
            langs,toggleDark,isDark, name, image, email, role, updateProfile
        }
    },
    components: {
        Popoup,  ToastError, ToastSuccess,
    },
    data(){
        return {
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
                name: this.name,
                image: this.image,
                selectedFile: null,
            }
        }
    },
    methods: {
        inputValid(event) {
            if (this.empty(this.formUpdateInfo[event.target.id]))
                return this.errorsInputs[event.target.id] = true;
            return this.errorsInputs[event.target.id] = false;
        },
        changePicture(event){
            const selectedFile = event.target.files[0];
            if(!selectedFile.type.includes("image")){
                this.$emit("activeToast", {
                    msg: this.langs.notImage,
                    type: ToastError
                });
                return;
            };
            if(selectedFile.size > 1024 * 1024 *2){
                this.$emit("activeToast", {
                    msg: this.langs.bigFile,
                    type: ToastError
                });
                return;
            };
            this.formUpdateInfo.selectedFile = selectedFile;
            this.formUpdateInfo.image = URL.createObjectURL(selectedFile);
            console.log(event.target.files[0])
        },
        updateProfile() {
            try {
                let isError = false;
                    if(!this.formUpdateInfo.name){
                        this.errorsInputs.name = true;
                        return isError = true;
                    };
                if(!isError)
                    (async () => {
                        try {
                            await this.updateProfile(this.formUpdateInfo);
                            this.$emit("closePopUp");
                            this.$emit("activeToast", {
                                msg: this.langs.updateSucess,
                                type: ToastSuccess
                            });
                        } catch (error) {
                            console.log(error)
                            this.$emit("activeToast", {
                                msg: this.langs.updateFailed,
                                type: ToastError
                            });
                         }
                    })();
            } catch (e) {
                console.log(e);
            }
        },
    },
    mixins: [DataValidator],
}
</script>
