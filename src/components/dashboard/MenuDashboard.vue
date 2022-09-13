<template>
    <div class="bg-image p-4 text-white ">
        <Header />
        <DetailsUser/>
    </div>
</template>
  
<script>
import DetailsUser from './DetailsUser.vue';
import Header from './Header.vue';

export default {
    components: {
    DetailsUser,
    Header
}
}
</script>