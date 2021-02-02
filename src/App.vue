<template>
  <div class="container">
    <global-header :user="user"></global-header>
    <column-list :list="list"></column-list>
    <validate-form @form-submit="onFormSubmit">
    <validate-input :rules="rules1" v-model="emailVal" type="text"></validate-input>
    <validate-input :rules="rules2" v-model="passwordVal" type="password"></validate-input>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref,reactive } from "vue";
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnListProps } from "@/components/ColumnList.vue";
import GlobalHeader,{UserProps} from '@/components/GlobalHeader.vue'
import ValidateInput,{RulesProps} from "./components/validateInput.vue";
import validateForm from '@/components/validateForm.vue'
const currentUser:UserProps={
  isLogin:true,
  name:"vv"
}
const testList: ColumnListProps[] = [
  {
    id: "123",
    avatar: "https://baike.baidu.com/pic/Vue.js/19884851/1/43a7d933c895d143b1a710bb7df082025baf0750?fr=lemma&ct=single#aid=1&pic=43a7d933c895d143b1a710bb7df082025baf0750",
    title: "123",
    description: "qqqqqqq",
  },
  {
    id: "123",
    avatar: "https://baike.baidu.com/pic/Vue.js/19884851/1/43a7d933c895d143b1a710bb7df082025baf0750?fr=lemma&ct=single#aid=1&pic=43a7d933c895d143b1a710bb7df082025baf0750",
    title: "123",
    description: "qqqqqqq",
  },
  {
    id: "123",
    avatar: "",
    title: "123",
    description: "qqqqqqq",
  },
  {
    id: "123",
    avatar: "https://baike.baidu.com/pic/Vue.js/19884851/1/43a7d933c895d143b1a710bb7df082025baf0750?fr=lemma&ct=single#aid=1&pic=43a7d933c895d143b1a710bb7df082025baf0750",
    title: "123",
    description: "qqqqqqq",
  },
];
export default defineComponent({
  name: "App",
  components: {
    ColumnList,GlobalHeader,
    ValidateInput,validateForm
  },
  setup() {
    const rules1:RulesProps=[
      {type:"required",message:"输入值不能为空"},
      {type:"email",message:"输入邮箱格式不正确"}
    ]
    const rules2:RulesProps=[
      {type:"required",message:"输入值不能为空"},
    ]
    const emailVal=ref('')
    const paddwordVal=ref('')
    const inputRef=reactive({
      message:"",
      error:false,
      val:""
    })
    const onFormSubmit=(result:boolean)=>{
      console.log('result',result)
    }
    return {
      list:testList,
      user:currentUser,rules1,rules2,emailVal,paddwordVal,onFormSubmit
    };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
