<template>
    <div class="flex flex-col justify-center items-center">
        <img class="dropdown w-28 h-28 md:w-32 md:h-32 rounded-full object-top object-cover" :src="photo" alt="foto" />
        <input class="hidden" type="file" @change="changePicture" ref="fileInput">
        <Button :width="w-2/5" class=" p-3  dark:bg-zinc-800" :text="btnTitle" bg="bg-black"
            @click.prevent="$refs.fileInput.click()" />
    </div>

</template>

<script>
import { markRaw } from 'vue';
import Button from '../widgets/Button.vue';
import { langStore } from '../../store/langStore';
import ToastError from '../public/Toast/ToastError.vue';

export default {
    props: ['btnTitle', 'image'],
    data(){
        return{
            photo: this.image,
            selectedFile: ""
        }
    },
    computed:{
        langs(){
            return langStore().getLang.PopupProfile;
        }
    },
    methods: {
        changePicture(event) {
            const selectedFile = event.target.files[0];
            if (!selectedFile.type.includes("image")) {
                this.$emit("activeToast", {
                    msg: this.langs.notImage,
                    type: markRaw(ToastError) 
                });
                return;
            };
            if (selectedFile.size > 1024 * 1024 * 2) {
                this.$emit("activeToast", {
                    msg: this.langs.bigFile,
                    type: markRaw(ToastError) 
                });
                return;
            };
            this.selectedFile = selectedFile;
            this.photo = URL.createObjectURL(selectedFile);
            this.$emit('changePicture', this.selectedFile)
        }
    },
    components: {
        Button
    }
}
</script>

