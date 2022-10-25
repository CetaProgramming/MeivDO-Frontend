<template>
  <!-- <div class="toggle-wrapper">
    <label class="toggle">
      <input type="checkbox" :checked="(isDarkMode === 'auto') ? 'checked' : false" @change="ChangeMode" />
      <span class="toggler round"></span>
    </label>
  </div> -->
  <Switch v-model="enable"  @change="ChangeMode" :default="defaultValue"/>
</template>
<script>
import Switch from '../widgets/Switch.vue';
export default {
  data() {
    return {
      isDarkMode: localStorage.getItem("vueuse-color-scheme") || "light",
      enable: true
    };
  },
  computed:{
    defaultValue(){
      return this.isDarkMode == 'auto'
    }
  },
  methods: {
    ChangeMode() {
      this.isDarkMode = this.isDarkMode === "auto" ? "light" : "auto";
      this.$emit("toggle");
    }
  },

  components: { Switch }
}
</script>
