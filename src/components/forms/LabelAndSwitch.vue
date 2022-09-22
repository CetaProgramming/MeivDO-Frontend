<template>
    <div class="flex flex-col gap-2">
       <Label name="{{title}}" :msg="title"/> 
        <!-- <label class="font-bold">{{title}}</label> -->
       
        <DarkModeSwitch />
    </div>
</template>

<script>
import SelectLabel from './SelectLabel.vue';
import DarkModeSwitch from '../dashboard/DarkModeSwitch.vue';
import Label from '../widgets/Label.vue';
export default {
    props: ['title'],
    setup() {
        return {};
    },
    components: {
   
    DarkModeSwitch,
    Label
}
}
</script>

