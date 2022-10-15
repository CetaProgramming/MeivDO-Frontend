<template>
    <div class="flex flex-col gap-2">
        <Label :name="name" :msg="name"/>
        <div class="flex gap-10 justify-around">
            <ButtonIcon @click="changeValue(1)" class="flex flex-col items-center  hover:bg-blue-600" :bg="this.value == 1 ? 'bg-blue-600' : 'bg-zinc-300' "
                :text="text[0]" icon="fa-solid fa-thumbs-up"></ButtonIcon>
            <ButtonIcon @click="changeValue(0)" class="flex flex-col items-center   hover:bg-MeivRed"  :bg="this.value == 0 ? 'bg-MeivRed' : 'bg-zinc-300' "
                :text="text[1]" icon="fa-solid fa-thumbs-down"></ButtonIcon>
                <Label v-if="isError" :name="name" class="font-openSans text-xs" color="text-red-500" :msg="msg"/> 
        </div>
    </div>

</template>

<script>
import Label from '../widgets/Label.vue';
import ButtonIcon from '../widgets/ButtonIcon.vue';
export default {
    props:['name', 'text', 'msg'],
    data() {
        return {
            isError: false,
            value: null
        };
    },
    computed:{
        optionActive(){
            return this.value ? 'bg-blue-600' : 'bg-MeivRed'
        }
    },
    methods:{
        changeValue(value){
            this.value = value
            this.$emit('update:modelValue', value)
        },
        inputValid(){
            if(!this.value)
                return this.isError = true;
            return this.isError = false;
        }
    },
    components: { Label, ButtonIcon }
}
</script>

