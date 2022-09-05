<template>
    <Popoup titlePopUp="Change Password">
        <div class="font-openSans grid grid-cols-1  md:justify-between  md:flex-row gap-6 ">
            <div class="flex flex-col gap-2">
                <label for="password" class="block text-sm font-medium text-gray-900 dark:text-white">{{ langs.Password }}</label>
                <input type="password" id="password" v-model="formLogin.password"
                    class="font-openSans border border-gray-500 rounded text-neutral-900 text-sm  p-3 outline-none dark:bg-zinc-800 dark:text-white dark:border-zinc-800"
                    placeholder="*********" @change="inputValid">
                <label v-if="errorsInputs.password" class="font-openSans text-xs text-red-500 ">{{langs.PasswordError
                }}</label>
            </div>
            <div class=" grid md:grid-cols-2 gap-6">
                <div class="flex flex-col gap-2 ">
                    <label for="password" class="block text-sm font-medium text-gray-900 dark:text-white  ">{{ langs.NewPassword
                    }}</label>
                    <input type="password" id="Newpassword"
                        class="font-openSans border w-full border-gray-500 rounded text-neutral-900 text-sm  p-3 outline-none dark:bg-zinc-800 dark:text-white dark:border-zinc-800 "
                        placeholder="*********" @change="inputValid">
                </div>
                <div class="flex flex-col gap-2 " >
                    <label for="password" class="block text-sm font-medium text-gray-900 dark:text-white">{{ langs.ConfirmNewPassword
                    }}</label>
                    <input type="password" id="Newpassword"
                        class="font-openSans border w-full border-gray-500 rounded text-neutral-900 text-sm  p-3 outline-none dark:bg-zinc-800 dark:text-white dark:border-zinc-800"
                        placeholder="*********" @change="inputValid">
                </div>
                <!-- <label class="font-openSans text-xs text-red-500">{{langs.PasswordError}}</label> -->

            </div>
        </div>
        <button class="bg-red-500 text-white rounded-md p-2 w-full mt-4  items-center">{{ langs.SavePass }}</button>
    </Popoup>
</template>

<script>
import DataValidator from '../../mixins/DataValidator.js';
import Popoup from '../../public/Popoup.vue';
import { computed } from 'vue';
import { langStore } from '../../../store/langStore';
import {useDark, useToggle} from '@vueuse/core'

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
        Popoup
    },
    data() {
        return {
            formLogin: {
                email: '',
                password: '',
            },
            errorsInputs: {
                email: false,
                password: false
            }
        }
    },
    methods: {
        languageChanged() {
            SelectLanguague.computed.langs()
                .then(data => this.langs = data.Login);
        },
        inputValid(event) {
            if (this.empty(this.formLogin[event.target.id]))
                this.errorsInputs[event.target.id] = true;
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
        }
    },
    mixins: [DataValidator]
}
</script>
