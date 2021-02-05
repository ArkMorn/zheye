import {createStore } from 'vuex'
import {testData,testPosts,ColumnProps,PostProps} from './testData'
interface UserProps{
    columnId?:number;
    name?:string;
    id?:number;
    isLogin:boolean;
}
export interface DataProps{
    user:UserProps;
    columns:ColumnProps[];
    posts:PostProps[];
}
const store =createStore<DataProps>({
    state:{
        user:{isLogin:false,columnId:1},
        columns:testData,
        posts:testPosts
    },
    mutations:{
        login(state){
            state.user={...state.user,isLogin:true,name:"ww"}
        },
        createPost(state,post){
            state.posts.push(post)
        }
    },
    getters:{
        getColumnsById:(state)=>(id:number)=>{
            return state.columns.find(column=>column.id===id)
        },
        getPostsById:(state)=>(id:number)=>{

            return state.posts.filter(post=>post.columnId===id)
        }
    }
})
export default store    