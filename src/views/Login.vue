<template>
  <div class="login-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">登录到者也</h5>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          :rules="emailRules"
          v-model="emailVal"
          placeholder="请输入邮箱地址"
          type="text"
          ref="inputRef"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          type="password"
          placeholder="请输入密码"
          :rules="passwordRules"
          v-model="passwordVal"
        />
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary btn-block btn-large">登录</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from "vue";
import ValidateInput, { RulesProps } from "@/components/validateInput.vue";
import validateForm from "@/components/validateForm.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    ValidateInput,
    validateForm,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const emailRules: RulesProps = [
      {
        type: "required",
        message: "输入值为空！",
      },
      {
        type: "email",
        message: "必须输入邮箱！",
      },
    ];
    const passwordRules: RulesProps = [
      {
        type: "required",
        message: "输入值为空！",
      },
    ];
    const emailVal = ref("");
    const passwordVal = ref("");
    const onFormSubmit = (result: boolean) => {
      store.commit("login");
      router.push("/");
    };
    return { emailRules, passwordRules, emailVal, passwordVal, onFormSubmit };
  },
});
</script>

<style>
</style>