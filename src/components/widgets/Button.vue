<template>
    <button type="submit" class="bg-MeivRed font-bold text-lg p-5 tracking-widest rounded w-full text-white">{{ text }}</button>
</template>

<script>
    export default {
      props: {
        text: {
          default: "Text",
          type: String
        }
      }  
    }
</script>

<style lang="scss" scoped>

</style>