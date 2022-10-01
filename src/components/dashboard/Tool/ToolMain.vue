<template>
    <div class="bg-MeivAsh  min-h-screen font-openSans dark:bg-zinc-900">
        <div class="px-8 md:px-16 py-8 flex flex-col gap-5">
            <HeaderTool/>
            <MenuTools/>
        </div>
        
    </div>
</template>

<script>
import HeaderTool from './HeaderTool.vue';
import MenuTools from './MenuTools.vue';
export default {
    components:
     {
    HeaderTool,
    MenuTools
}
}
</script>

