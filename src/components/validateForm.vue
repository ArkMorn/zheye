<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
import mitt from "mitt";
export const emitter = mitt();
export type ValidateFnc = () => boolean;
export default defineComponent({
  name: "ValidateForm",
  emits:['form-submit'],
  setup(props,context) {
    const arrList: ValidateFnc[] = [];
    const submitForm = () => {
      const result=arrList.map(item=>item()).every(result=>result)
      context.emit('form-submit',result)
    };
    const callback = (fnc?: ValidateFnc) => {
      if (fnc) {
        arrList.push(fnc);
      }
    };
    emitter.on("form-item-create", callback);
    onUnmounted(() => {
      emitter.off("form-item-create", callback);
    });
    return { submitForm };
  },
});
</script>

<style lang="scss" scoped>
</style>