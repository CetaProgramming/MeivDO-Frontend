<template>
    <form id="form" class="bg-white z-10 flex flex-col items-center gap-5" @submit.prevent="formValid">
        <div class="flex flex-col gap-2">
            <label for="email" class="block text-sm font-medium text-gray-900">{{langs.EmailInput}}</label>
            <input type="email" id="email" v-model="formLogin.email" class="font-openSans border border-gray-500 rounded text-neutral-900 text-sm w-80 p-3 outline-none" placeholder="example@email.com" @change="inputValid">
            <label v-if="errorsInputs.email" class="font-openSans text-xs text-red-500">{{langs.EmailError}}</label>
        </div>
        <div class="flex flex-col gap-2">
            <label for="password" class="block text-sm font-medium text-gray-900">{{langs.PasswordInput}}</label>
            <input type="password" id="password" v-model="formLogin.password" class="font-openSans border border-gray-500 rounded text-neutral-900 text-sm w-80 p-3 outline-none" placeholder="*********" @change="inputValid">
            <label v-if="errorsInputs.password" class="font-openSans text-xs text-red-500">{{langs.PasswordError}}</label>
        </div>
        <button type="submit" class="btn bg-MeivRed font-bold text-lg p-5 tracking-widest rounded w-80 text-white mt-5">{{langs.LoginButton}}</button>
    </form>
</template>

<script>
    import SelectLanguague from '../public/Languague.vue';
    import DataValidator from '../mixins/DataValidator.js';
    import { computed } from 'vue';
    import { langStore } from '../../store/langStore'
    
    export default {
        setup(){
            const store = langStore();

            const langs = computed(() => store.getLang.Login);

            return {
                langs
            }
        },
        data(){
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
            languageChanged(){
                SelectLanguague.computed.langs()
                    .then(data => this.langs = data.Login);
            },
            inputValid(event){
                if(this.empty(this.formLogin[event.target.id]))
                    this.errorsInputs[event.target.id] = true;
            },
            formValid(event){
                try {
                    let isError = false;
                    const dataForm = JSON.parse(JSON.stringify(this.formLogin));
                    Object.entries(dataForm).forEach(([key, value]) => {
                        if(!value){
                            this.errorsInputs[key] = true;
                            isError = true;
                        }
                    });
                    if(!isError)
                        console.log('RequestAPI');
                } catch (e) {
                    console.log(e);
                }
            }
        },
        mixins: [ DataValidator ]
    }
</script>