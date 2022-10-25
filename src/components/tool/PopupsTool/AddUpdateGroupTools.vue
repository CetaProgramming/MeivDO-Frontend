<template>
    <Popoup :titlePopUp="langs.Title" class="font-meivdo" @closePopUp="$emit('closePopUp')">
        <form @submit.prevent="updateGroupTool" class="flex flex-col gap-5">
            <div
                class="font-openSans grid grid-cols-1 items-center gap-5 md:gap-1  lg:grid-cols-1fr-auto md:justify-between ">
                <div class="flex flex-col gap-1">
                    <div class="grid lg:grid-cols-2 gap-4">
                        <div class="flex flex-col gap-4">
                            <InputLabelError ref="formGroupToolCreateCode" v-model="formGroupToolCreateUpdate.code"
                                :placeholder="langs.Placeholder" :msg="langs.CodeError" :name="langs.Code"
                                :default="formGroupToolCreateUpdate.code" />
                            <LabelSelectWithInputError ref="formGroupToolCategory" itemFilter="name" v-model="formGroupToolCreateUpdate.category" :default="formGroupToolCreateUpdate.category" :placeholder="langs.OptionCategory" :name="langs.Category" :msg="langs.CategoryError" :items="activeCategories"/>
                            <SwitchLabel v-if="value" v-model="formGroupToolCreateUpdate.active" @change="changeValue"
                                :default="Boolean(formGroupToolCreateUpdate.active)  " :name="langs.Active" />
                        </div>
                        <div>
                            <ImgAndButton class="gap-3" @activeToast="activeToast" @changePicture="selectedFile"
                                :image="formGroupToolCreateUpdate.image" :btnTitle="langs.UploadNewPicture" />
                        </div>
                    </div>
                    <TextAreaLabel ref="formGroupToolDescription" :name="langs.Description"
                        :placeholder="langs.PlaceholderDescription" :msg="langs.DescriptionError" v-model="formGroupToolCreateUpdate.description" :default="formGroupToolCreateUpdate.description"></TextAreaLabel>
                </div>
            </div>
            <Button :text="langs.Save"></Button>
        </form>
    </Popoup>
</template>

<script>
import DataManipulate from "../../../helpers/DataManipulate";
import Popoup from '../../public/Popoup.vue';
import { langStore } from '../../../store/langStore';
import { groupToolsStore } from '../../../store/groupToolsStore';
import { categoryStore } from "../../../store/categoryStore";
import InputLabelError from '../../forms/InputLabelError.vue';
import SelectLabelError from '../../forms/SelectLabelError.vue';
import SwitchLabel from '../../forms/SwitchLabel.vue';
import Button from '../../widgets/Button.vue';
import ImgAndButton from '../../forms/ImgAndButton.vue';
import TextAreaLabel from '../../forms/TextAreaLabel.vue';
import ToastError from "../../public/Toast/ToastError.vue"
import ToastSuccess from "../../public/Toast/ToastSuccess.vue"
import FormValidate from "../../mixins/FormValidate";
import LabelSelectWithInputError from "../../forms/LabelSelectWithInputError.vue";
import { markRaw } from 'vue';


export default {
    props: ['value'],
    data() {
        return {
            activeCategories: [],
            groupToolStore: groupToolsStore(),
            categoryStore: categoryStore(),
            formGroupToolCreateUpdate: {
                code: this.value ? this.value.code : '',
                id: this.value ? this.value.id : '',
                category: this.value ? this.value.category.id : -1,
                description: this.value ? this.value.description : '',
                image: this.value ? this.value.image : groupToolsStore().imgProfileDefault,
                active: this.value ? this.value.active : '',
                selectedImage: '',
            }
        };
    },
    computed: {
        langs() {
            return langStore().getLang.PageTool.PopupAddGroupTool
        },
    },
    async mounted(){
        await this.getActiveCategories();
    },
    methods: {
        async getActiveCategories(){
            const data = await categoryStore().getActiveCategories(this.formGroupToolCreateUpdate.category);
            this.activeCategories = data;
        },
        activeToast(toast) {
            this.$emit('activeToast', toast);
        },
        changeValue() {
            this.formGroupToolCreateUpdate.active = Number(this.formGroupToolCreateUpdate.active)
        },
        selectedFile(fileImage) {
            this.formGroupToolCreateUpdate.selectedImage = fileImage
        },
        updateGroupTool() {
            try {
                if (this.validateDataEqualsOrEmpty({
                    code: this.formGroupToolCreateUpdate.code,
                    category: this.formGroupToolCreateUpdate.category,
                    description: this.formGroupToolCreateUpdate.description
                }, {
                    code: this.$refs.formGroupToolCreateCode,
                    category: this.$refs.formGroupToolCategory,
                    description: this.$refs.formGroupToolDescription
                }, -1))
                    (async () => {
                        try {
                            this.value &&
                                await this.groupToolStore.update(this.value.id,
                                    DataManipulate.formDataImage({
                                        code: this.formGroupToolCreateUpdate.code,
                                        category: this.formGroupToolCreateUpdate.category,
                                        image: this.formGroupToolCreateUpdate.selectedImage,
                                        description: this.formGroupToolCreateUpdate.description,
                                        active: this.formGroupToolCreateUpdate.active,
                                    }, true)
                                );

                            !this.value &&
                                await this.groupToolStore.add(
                                    DataManipulate.formDataImage({
                                        code: this.formGroupToolCreateUpdate.code,
                                        category: this.formGroupToolCreateUpdate.category,
                                        image: this.formGroupToolCreateUpdate.selectedImage,
                                        description: this.formGroupToolCreateUpdate.description,
                                        active: this.formGroupToolCreateUpdate.active,
                                    })
                                );
                            this.$emit("closePopUp");
                            this.$emit("activeToast", {
                                msg: this.value && this.langs.updatedSucess || !this.value && this.langs.createdSucess,
                                type: markRaw(ToastSuccess)
                            });
                        } catch (error) {
                            this.$emit("activeToast", {
                                msg: this.langs.errorCreatedUpdated,
                                type: markRaw(ToastError)
                            });
                        }
                    })();
            } catch (e) {
                console.error(e);
            }
        },
    },
    components: {
    Popoup,
    InputLabelError,
    SelectLabelError,
    SwitchLabel,
    Button,
    ImgAndButton,
    TextAreaLabel,
    LabelSelectWithInputError
    },
    emits: ['activeToast', 'closePopUp'],
    mixins: [FormValidate]
}
</script>
