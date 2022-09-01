<template>
    <div class="bg-image h-72 md:h-52 text-white  ">
        <div class="flex justify-between p-4">
            <Logo />
            <div class="relative font-openSans">
                <img class="dropdown mr-6" @click="isMenuClicked = !isMenuClicked" src="" alt="f" />
                <div class="absolute md:right-10 right-0 md:w-44 w-52 text-black bg-white rounded-md text-sm p-1"
                    v-if="isMenuClicked">
                    <i class="fa-thin fa-user"></i>
                    <p @click="isProfileClicked = !isProfileClicked" class="mb-1 hover:cursor-pointer">
                        <fas class="mr-1" icon="fa-solid fa-user" /> User Profile
                    </p>
                    <p class="mb-1 hover:cursor-pointer">
                        <fas class="mr-1" icon="fa-solid fa-lock-open" /> Change Password
                    </p>
                    <p class="mb-1 hover:cursor-pointer">
                        <fas class="mr-1" icon="fa-solid fa-gear" />Settings
                    </p>
                    <p class="mb-1 hover:cursor-pointer">
                        <fas class="mr-1" icon="fa-solid fa-headset" />Support
                    </p>
                    <hr>
                    <p class="hover:cursor-pointer">Logout</p>
                </div>
            </div>
        </div>
        <div class="justify-center flex  flex-col items-center mt-24 md:mt-4 text-2xl gap-2 font-openSans">
            <h1>Welcome, <span class="text-red-500">Bruno Costa</span></h1>
            <h1>What do you want to do today?</h1>
            <input class="w-3/5 rounded-md text-black text-xl p-2 pl-2 " type="text" v-model="input"
                placeholder="Search feature..." />
        </div>
    </div>
    <Popoup titlePopUp="teste" v-if="isProfileClicked" @closePopUp="isProfileClicked= false">
        <h3>testeee</h3>
    </Popoup>
    
</template>
  
  <script>
import Logo from '../public/Logo.vue';
import Popoup from '../public/Popoup.vue';

export default {
    setup() {
        return {};
    },
    data() {
        return {
            isMenuClicked: false,
            isProfileClicked: false

        }
    },
    components: {
        Logo,
        Popoup
    }
}
</script>
  
  <style lang="scss" scoped>
  </style>