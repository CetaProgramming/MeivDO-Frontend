<template>
  <div class="grid items-center grid-rows-1fr-auto lg:grid-cols-1fr-auto lg:grid-rows-none min-h-screen bg-image p-12">
    <div class="flex flex-col gap-3 max-w-4/5">
      <h1 class="text-4xl text-white">Welcome</h1>
      <p class="text-white font-openSans">Here you can manage your tools, projects, inspections and reparations, and mutch more!</p>
    </div>
    <div class="p-10 rounded h-fit bg-white flex flex-col justify-center gap-6">
      <Logo/>
      <form id="form" class="bg-white z-10 flex flex-col items-center gap-5" @submit="formValid">
          <div class="flex flex-col gap-2">
            <label for="email" class="block text-sm font-medium text-gray-900">Email</label>
            <input type="email" id="email" class="font-openSans border border-gray-500 rounded text-neutral-900 text-sm w-80 p-3 outline-none" placeholder="example@email.com" @change="inputEventChange">
            <label v-if="emailerror" class="font-openSans text-xs text-red-500">Email is required!</label>
          </div>
          <div class="flex flex-col gap-2">
            <label for="password" class="block text-sm font-medium text-gray-900">Password</label>
            <input type="password" id="password" class="font-openSans border border-gray-500 rounded text-neutral-900 text-sm w-80 p-3 outline-none" placeholder="*********" @change="inputEventChange">
            <label v-if="passworderror" class="font-openSans text-xs text-red-500">Password is required!</label>
          </div>
        <button type="submit" class="btn bg-MeivRed font-bold text-lg p-5 tracking-widest rounded w-80 text-white mt-5">LOGIN</button>
      </form>
    </div>
  </div>
</template>

<script>
import Logo from './public/Logo.vue'
export default {
    components: { Logo }
}
</script>