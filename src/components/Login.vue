<template>
  <div class="grid items-center grid-rows-1fr-auto lg:grid-cols-1fr-auto lg:grid-rows-auto-1fr bg-image min-h-screen lg:p-12">
    <div class="font-openSans flex justify-center my-2 gap-2 col-auto lg:col-span-2 lg:justify-end">
      <SelectLanguague />
    </div> 
    <div class="grid items-center grid-rows-1fr-auto lg:grid-cols-1fr-auto lg:grid-rows-none">
      <div class="flex flex-col gap-3 p-10 lg:p-0 lg:max-w-4/5">
        <h1 class="text-4xl text-white">{{langs.WelcomeMessage}}</h1>
        <p class="text-white font-openSans">{{langs.Slogan}}</p>
      </div>
      <div class="p-3 rounded h-fit bg-white dark:bg-black  flex flex-col justify-center gap-6 lg:p-10">
        <Logo/>
        <FormLogin />
      </div>
    </div>
  </div>
</template>

<script>
import FormLogin from './login/formLogin.vue';
import Logo from './public/Logo.vue'
import { langStore } from '../store/langStore';
import { computed } from 'vue';
import SelectLanguague from './public/Languague.vue';
import { useDark, useToggle } from '@vueuse/core'

export default {
  setup(){

    const store = langStore();
    const isDark= useDark()
        
    
    const langs = computed(() => store.getLang.Login);

    return {
      langs,isDark
    }
  },
  components: {
    Logo,
    FormLogin,
    SelectLanguague
}
}
</script>