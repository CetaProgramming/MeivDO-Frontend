<template>
    <Popoup :titlePopUp="langs.Title" class="font-meivdo">
        <form class="flex flex-col gap-5">
            <div
                class="font-openSans grid grid-cols-1 items-center gap-5 md:gap-1  lg:grid-cols-1fr-auto md:justify-between ">
                <div class="flex flex-col gap-7">
                    <div class="grid lg:grid-cols-2 gap-4">
                        <div class="flex flex-col gap-4">
                            <InputLabelError ref="formToolCreateName" v-model="formGroupToolCreateUpdate.code"
                                :placeholder="langs.Placeholder" msg="langs.NameError" :name="langs.Code"
                                :default="formGroupToolCreateUpdate.code" />

                            <SelectLabelError class="w-full" ref="formTollCreateGroup" :msg="langs.CodeError"
                                :items="categories" :name="langs.Category" :default="formGroupToolCreateUpdate.id"
                                v-model="formGroupToolCreateUpdate.category" />
                            <SwitchLabel v-if="showActive" v-model="formGroupToolCreateUpdate.active" @change="changeValue"
                                :default="Boolean(formGroupToolCreateUpdate.active)  " :name="langs.Active" />
                        </div>
                        <div>
                            <ImgAndButton class="gap-3" @activeToast="activeToast" @changePicture="selectedFile"
                                image="formUserCreateUpdate.image" :btnTitle="langs.UploadNewPicture" />
                        </div>
                    </div>



                    <TextAreaLabel type="textarea" background="bg-zinc-300" :name="langs.Description"
                        :placeholder="langs.PlaceholderDescription"></TextAreaLabel>

                </div>
            </div>
            <Button :text="langs.Save"></Button>
        </form>
    </Popoup>
    <!-- v-if="showActive" -->
</template>

<script>
import Popoup from '../../public/Popoup.vue';
import { langStore } from '../../../store/langStore';
import InputLabelError from '../../forms/InputLabelError.vue';
import SelectLabelError from '../../forms/SelectLabelError.vue';
import SwitchLabel from '../../forms/SwitchLabel.vue';
import Button from '../../widgets/Button.vue';
import ImgAndButton from '../../forms/ImgAndButton.vue';
import TextAreaLabel from '../../forms/TextAreaLabel.vue';
export default {
    data() {
        return {
            formGroupToolCreateUpdate: {
                code: this.code ? this.tool.code : '',
                id: this.tool ? this.tool.id : '',
                category: this.tool ? this.tool.category : '',
                // image: this.groupTool ? this.user.image : usersStore().imgProfileDefault,
                active: this.tool ? this.tool.active : '',
                selectedImage: '',
            }
        };
    },
    computed: {
        langs() {
            return langStore().getLang.PageTool.PopupAddGroupTool
        }
    },
    methods: {
        activeToast(toast) {
            this.$emit('activeToast', toast);
        },
        changeValue() {
            this.formToolCreateUpdate.active = Number(this.formToolCreateUpdate.active)
        },
    },
    components: { Popoup, InputLabelError, SelectLabelError, SwitchLabel, Button, ImgAndButton, TextAreaLabel }
}
</script>
