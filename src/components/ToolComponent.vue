<template>
    <div>
        <div class="bg-image p-4 text-white ">
        <Header/>
        </div>
        <ToolMain/>
    </div>
</template>

<script>
import Header from './dashboard/Header.vue';
import ToolMain from './tool/ToolMain.vue';



export default {
    components:
    {
    Header,
    ToolMain
}
}

</script>

