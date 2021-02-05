<template>
  <validate-form @form-submit="onFormSubmit">
    <div class="mb-3">
      <label class="form-label">文章标题：</label>
      <validate-input :rules="titleRules" v-model="titleVal" placeholder="请输入文章标题" type="text" />
    </div>
    <div class="mb-3">
      <label class="form-label">文章详情：</label>
      <validate-input
        rows="10"
        tag="textarea"
        placeholder="请输入文章详情"
        :rules="contentRules"
        v-model="contentVal"
      />
    </div>
    <template #submit>
      <button class="btn btn-primary btn-large">发表文章</button>
    </template>
  </validate-form>
</template>

<script lang='ts'>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import ValidateInput, { RulesProps } from "@/components/validateInput.vue";
import validateForm from "@/components/validateForm.vue";
import { defineComponent } from "vue";
import { PostProps } from "../testData";
export default defineComponent({
  components: {
    ValidateInput,
    validateForm,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const titleRules: RulesProps = [
      {
        type: "required",
        message: "标题不能为空",
      },
    ];
    const contentRules: RulesProps = [
      {
        type: "required",
        message: "内容不能为空",
      },
    ];
    const titleVal = ref("");
    const contentVal = ref("");
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { columnId } = store.state.user;
        const newPost: PostProps = {
          id: new Date().getTime(),
          title: titleVal.value,
          content: contentVal.value,
          createdAt: new Date().toLocaleString(),
          columnId
        };
        store.commit("createPost", newPost);
        router.push({name:"column",params:{id:columnId}});
      }
    };
    return {
      titleVal,
      titleRules,
      contentRules,
      contentVal,onFormSubmit
    };
  },
});
</script>

<style>
</style>