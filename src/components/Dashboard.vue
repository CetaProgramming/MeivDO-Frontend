<template>
  <div class="grid grid-rows-auto-1fr min-h-screen">
    <MenuDashboard :showDetails="true" />
    <FeatureMenu />
  </div>
</template>

<script>
import MenuDashboard from "./dashboard/MenuDashboard.vue";
import FeatureMenu from "./dashboard/FeatureMenu.vue";

export default {
  components: {
    FeatureMenu,
    MenuDashboard },
}

</script>