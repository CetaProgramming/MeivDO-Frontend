<template>
  <MenuDashboard/>
  <FeatureMenu/>
</template>

<script>
  import MenuDashboard from "./dashboard/MenuDashboard.vue";
  import FeatureMenu from "./dashboard/FeatureMenu.vue";

  export default {
    components: { 
      FeatureMenu,
      MenuDashboard
    }
  }
</script>