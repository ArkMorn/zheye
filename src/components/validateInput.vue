<template>
  <div class="validate-input-container pb-3">
    <input
      class="form-control"
      :class="{'is-invalid': inputRef.error}"
      @blur="validateInput"
      :value="inputRef.val"
      @input="updateValue"
      v-bind="$attrs"
      v-if="tag==='input'"
    >
    <textarea
      v-else
      class="form-control"
      :class="{'is-invalid': inputRef.error}"
      @blur="validateInput"
      v-model="inputRef.val"
      v-bind="$attrs"
    >
    </textarea>
    <span v-if="inputRef.error" class="invalid-feedback">{{inputRef.message}}</span>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, PropType ,onMounted} from "vue";
import {emitter} from './validateForm.vue'
interface RuleProps {
  type: "required" | "email";
  message: string;
}
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export type RulesProps = RuleProps[];
type inputTag='input'|'textarea'
export default defineComponent({
  name: "ValidateInput",
  props: {
    rules: Array as PropType<RulesProps>,
    modelValue:String,
    tag:{
      type:String as PropType<inputTag>,
      default:"input"
    }
  },
  inheritAttrs:false,
  setup(props,context) {
    const inputRef = reactive({
      val: props.modelValue||"",
      error: false,
      message: "",
    });
    const updateValue=(e:KeyboardEvent)=>{
      const targetValue=(e.target as HTMLInputElement).value
      inputRef.val=targetValue
      context.emit('update:modelValue',targetValue)
    }
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every((rule) => {
          let passed = true;
          inputRef.message = rule.message;
          switch (rule.type) {
            case "required":
              passed = inputRef.val.trim() !== "";
              break;
            case "email":
              passed = emailReg.test(inputRef.val);
              break;
          }
          return passed;
        });
        inputRef.error = !allPassed;
        return allPassed;
      }
      return true
    };
    onMounted(()=>{
      emitter.emit('form-item-create',validateInput)
    })
    return {
      inputRef,
      validateInput,updateValue
    };
  },
});
</script>

<style>
</style>