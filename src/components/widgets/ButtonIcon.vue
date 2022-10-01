<template>
    <button type="submit"  class="rounded" :class="bg, color, typeFont, pad, fontSize, width, space"><fas :icon="icon" />{{ text }} </button>
</template>

<script>
    export default {
      props: {
        space: {
          default: "tracking-widest",
          type: String
        },
        text: {
          default: "Text",
          type: String
        },
        bg: {
          default: "bg-MeivRed",
          type: String
        },
        color: {
          default: "text-white",
          type: String
        },
        typeFont: {
          default: "font-bold",
          type: String
        },
        pad: {
          default: "p-5",
          type: String
        },
        fontSize: {
          default: "text-lg",
          type: String
        },
        width: {
          default: "w-full",
          type: String
        },
        icon: {
            required: true,
            type: String
        }


      }  
    }
</script>

<style lang="scss" scoped>

</style>