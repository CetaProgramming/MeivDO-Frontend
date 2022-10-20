<template>
    <div class="flex flex-col gap-2">
        <Label :name="name" :msg="name"/>
        <div class="flex flex-col gap-3 justify-around">
            <div class="flex gap-10">
                <ButtonIcon @click.stop.prevent="changeValue(1, $event)" class="flex flex-col items-center text-black dark:text-white  hover:bg-blue-600" :bg="this.value == 1 ? 'bg-blue-600' : 'bg-zinc-300 dark:bg-zinc-700' "
                :text="text[0]" icon="fa-solid fa-thumbs-up"></ButtonIcon>
                <ButtonIcon @click.stop.prevent="changeValue(0, $event)" class="flex flex-col items-center text-black dark:text-white  hover:bg-MeivRed"  :bg="this.value == 0 ? 'bg-MeivRed' : 'bg-zinc-300 dark:bg-zinc-700' "
                :text="text[1]" icon="fa-solid fa-thumbs-down"></ButtonIcon>
            </div>
            
            <Label v-if="isError" :name="name" class="font-openSans text-xs" color="text-red-500" :msg="msg"/> 
        </div>
    </div>

</template>

<script>
import Label from '../widgets/Label.vue';
import ButtonIcon from '../widgets/ButtonIcon.vue';
export default {
    props:['name', 'text', 'msg', 'default'],
    data() {
        return {
            isError: false,
            value: this.default
        };
    },
    computed:{
        optionActive(){
            return this.value ? 'bg-blue-600' : 'bg-MeivRed'
        }
    },
    methods:{
        changeValue(value){
            if(this.isError)
                this.isError = false;
            this.value = value
            this.$emit('update:modelValue', value)
        },
    },
    components: { Label, ButtonIcon }
}
</script>

