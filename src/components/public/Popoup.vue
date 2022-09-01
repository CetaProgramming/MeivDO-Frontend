<template>
    <div class="absolute bg-black bg-opacity-30 flex justify-center items-center min-h-screen top-0 w-screen">
        <div class="md:w-3/5 w-full min-h-screen md:min-h-fit  bg-yellow-300  " >
            <div>
                <div>
                    <h1>{{titlePopUp}}</h1>
                 <button @click="closePopUp">x</button>
                </div>
            <slot></slot>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    setup () {
        

        return {}
    },
    props:{
        titlePopUp: String
    },
    methods: {
        closePopUp(){
            this.$emit("closePopUp")
        }
    }, 
    emits: ["closePopUp"]
   
}
</script>
