<template>
    <Popoup :titlePopUp="langs.Title" class="font-meivdo">
        <form class="flex flex-col gap-5">
            <div
                class="font-openSans grid grid-cols-1 items-center gap-5 md:gap-1  lg:grid-cols-1fr-auto md:justify-between ">
                <div class="flex flex-col gap-7">
                    <InputLabelError ref="formCategoryCreateName" v-model="formCategoryCreateUpdate.name"
                        :placeholder="langs.Placeholder" msg="langs.NameError" :name="langs.Name"
                        :default="formCategoryCreateUpdate.name" />
                    <SwitchLabel v-if="showActive"  v-model="formCategoryCreateUpdate.active" @change="changeValue"
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
import InputLabelError from '../../forms/InputLabelError.vue';
import SwitchLabel from '../../forms/SwitchLabel.vue';
import Button from '../../widgets/Button.vue';
export default {
    data() {
        return {
            formCategoryCreateUpdate: {
                name: this.name ? this.category.name : '',
                id: this.tool ? this.tool.id : '',
                active: this.tool ? this.tool.active : '',
            }
        };
    },
    computed: {
        langs() {
            return langStore().getLang.PageTool.PopupAddCategory
        }
    },
    methods: {
        changeValue() {
            this.formToolCreateUpdate.active = Number(this.formToolCreateUpdate.active)
        },
    },
    components: {
    Popoup,
    InputLabelError,
    SwitchLabel,
    Button
}
}
</script>
  