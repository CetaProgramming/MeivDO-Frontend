<template>
    <Popoup :titlePopUp="langs.Title" class="font-meivdo" @closePopUp="$emit('closePopUp')">
        <form @submit.prevent="updateCategory" class="flex flex-col gap-5">
            <div
                class="font-openSans grid grid-cols-1 items-center gap-5 md:gap-1  lg:grid-cols-1fr-auto md:justify-between ">
                <div class="flex flex-col gap-7">
                    <InputLabelError ref="formCategoryCreateName" v-model="formCategoryCreateUpdate.name"
                        :placeholder="langs.Placeholder" :msg="langs.NameError" :name="langs.Name"
                        :default="formCategoryCreateUpdate.name" />
                    <SwitchLabel v-if="value" v-model="formCategoryCreateUpdate.active" @change="changeValue"
                        :default="Boolean(formCategoryCreateUpdate.active)  " :name="langs.Active" />
                </div>
            </div>
            <Button :text="langs.Save"></Button>
        </form>
    </Popoup>

</template>
  
<script>
import Popoup from '../../public/Popoup.vue';
import { langStore } from '../../../store/langStore';
import { categoryStore } from '../../../store/categoryStore';
import InputLabelError from '../../forms/InputLabelError.vue';
import SwitchLabel from '../../forms/SwitchLabel.vue';
import Button from '../../widgets/Button.vue';
import ToastError from "../../public/Toast/ToastError.vue"
import ToastSuccess from "../../public/Toast/ToastSuccess.vue"
import FormValidate from "../../mixins/FormValidate";
import { markRaw } from 'vue';

export default {
    props: ['value'],
    data() {
        return {
            categoryStore: categoryStore(),
            formCategoryCreateUpdate: {
                name: this.value ? this.value.name : '',
                id: this.value ? this.value.id : '',
                active: this.value ? this.value.active : '',
            }
        };
    },
    computed: {
        langs() {
            return langStore().getLang.PageTool.PopupAddCategory
        },
    },
    methods: {
        changeValue() {
            this.formCategoryCreateUpdate.active = Number(this.formCategoryCreateUpdate.active)
        },
        updateCategory() {
            try {
                if (this.validateData({
                    name: this.formCategoryCreateUpdate.name, 
                }, {
                    name: this.$refs.formCategoryCreateName,

                }))
                    (async () => {
                        try {
                            this.value &&
                                await this.categoryStore.update(this.value.id,
                                    {
                                        name: this.formCategoryCreateUpdate.name,
                                        active: this.formCategoryCreateUpdate.active,
                                    }
                                );

                            !this.value &&
                                await this.categoryStore.add(
                                    {
                                        name: this.formCategoryCreateUpdate.name
                                    }
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
                console.log(e);
            }
        },
    },
    components: {
        Popoup,
        InputLabelError,
        SwitchLabel,
        Button
    },
    emits: ['activeToast', 'closePopUp'],
    mixins: [FormValidate]
}
</script>
  