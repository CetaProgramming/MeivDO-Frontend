<template>
  <component :is="this.toast.type" v-if="this.toast.visible" :msg="this.langs.LoginWrong" @closeToast="this.toast.visible= false"/>
  <div class="grid items-center grid-rows-1fr-auto lg:grid-cols-1fr-auto lg:grid-rows-none bg-image min-h-screen lg:p-12">
    <div class="font-openSans flex justify-center my-2 gap-2 col-auto lg:col-span-2 lg:justify-end">
      <SelectLanguague @languagueChangedEvent="languageChanged"/>
    </div> 
    <div class="grid items-center grid-rows-1fr-auto lg:grid-cols-1fr-auto lg:grid-rows-none">
      <div class="flex flex-col gap-3 p-10 lg:p-0 lg:max-w-4/5">
        <h1 class="text-4xl text-white">{{this.langs.WelcomeMessage}}</h1>
        <p class="text-white font-openSans">{{this.langs.Slogan}}</p>
        <h1 class="text-4xl text-white">{{langs.WelcomeMessage}}</h1>
        <p class="text-white font-openSans">{{langs.Slogan}}</p>
      </div>
      <div class="p-3 rounded h-fit bg-white flex flex-col justify-center gap-6 lg:p-10">
        <Logo/>
        <FormLogin />
      </div>
    </div>
  </div>
</template>

<script>
import SelectLanguague from './public/Languague.vue';
import FormLogin from './login/formLogin.vue';
import Logo from './public/Logo.vue'
import ToastInfo from './public/Toast/ToastInfo.vue';
import ToastError from './public/Toast/ToastError.vue';
import ToastWarning from './public/Toast/ToastWarning.vue';
import ToastSuccess from './public/Toast/ToastSuccess.vue';
import { langStore } from '../store/langStore';
import { computed } from 'vue';

export default {
  mounted(){
    this.languageChanged()
  setup(){

    const store = langStore();

    const langs = computed(() => store.getLang.Login);

    return {
      langs
    }
  },
  data(){
    return {
      langs: {},
      toast: {
        type: ToastError,
        visible: false
      }
    }
  },
  methods: {
    languageChanged(){
      SelectLanguague.computed.langs()
        .then(data => this.langs = data.Login);
    },
    
    
  },
  components: {
    Logo,
    SelectLanguague,
    FormLogin,
    ToastInfo,
    ToastError,
    ToastWarning,
    ToastSuccess,
    ToastError
}
}
</script>