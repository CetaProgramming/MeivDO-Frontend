<template>
  <div class="grid grid-rows-1fr-auto lg:grid-cols-2 lg:grid-rows-none h-screen">
    <div class="image h-full">
      <img src="../assets/christopher-burns-Wiu3w-99tNg-unsplash.jpg" alt="worker" class="h-full w-full object-cover">
      <div class="company">
      </div>
    </div>
    <div class="py-5 bg-white flex flex-col justify-center">
      <Logo/>
      <form id="form" class="bg-white z-10 py-10 flex flex-col items-center gap-5">  
          <label for="email" class="block text-sm font-medium text-gray-900">Email</label>
          <input type="email" id="email" class="border border-gray-500 rounded text-neutral-900 text-sm w-80 p-3" placeholder="example@email.com">
          <label for="password" class="block text-sm font-medium text-gray-900">Password</label>
          <input type="password" id="password" class="border border-gray-500 rounded text-neutral-900 text-sm w-80 p-3 " placeholder="*********">
        <button type="submit" class="btn bg-MeivRed font-bold text-lg p-5 tracking-widest rounded w-80 my-7 text-white">LOGIN</button>
        <div class="text-center">
          <a href="">Forgot Password?</a>
      </div>
      </form>
    </div>
  </div>
</template>

<script>
import Logo from './public/Logo.vue'
export default {
    data() {
        return {
            show1: false,
            password: "Password",
        };
    },
    components: { Logo }
}
</script>