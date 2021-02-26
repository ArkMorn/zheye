import axios from 'axios'
import {createStore,Commit } from 'vuex'

export interface ImageProps{
    _id?: string;
  url?: string;
  createdAt?: string;
  fitUrl?: string;
}
export interface ColumnProps{
    _id:number;
    avatar?:ImageProps;
    title:string;
    description:string;
    createdAt:string;
}
export interface PostProps{
    _id:number;
    column:number;
    title:string;
    content?:string;
    image?:string;
    createdAt:string;
    excerpt?:string;
}
interface UserProps{
    columnId?:number;
    name?:string;
    id?:number;
    isLogin:boolean;
}
interface ErrorProps{
    status:Boolean;
    message?:String;
}
export interface DataProps{
    user:UserProps;
    columns:ColumnProps[];
    posts:PostProps[];
    isLoading:Boolean;
    error:ErrorProps;
}
const getAndCommit=async (url:string,mutations:string,commit:Commit)=>{
    const {data}=await axios.get(url)
    commit(mutations,data)
}
const store =createStore<DataProps>({
    state:{
        user:{isLogin:true,columnId:1},
        columns:[],
        posts:[],
        isLoading:false,
        error:{
            status:false
        }
    },
    mutations:{
        setLoading(state,status){
            state.isLoading=status
        },
        setError(state,status:ErrorProps){
            state.error=status
        },
        login(state){
            state.user={...state.user,isLogin:true,name:"ww"}
        },
        createPost(state,post){
            state.posts.push(post)
        },
        fetchColumns(state,rawData){
            state.columns=rawData.data.list
        },
        fetchColumn(state,rawData){
            state.columns=[rawData.data]
        },
        fetchPosts(state,rawData){
            state.posts=rawData.data.list
        }
    },
    actions:{
        fetchColumns({commit}){
            getAndCommit('/api/columns','fetchColumns',commit)
        },
        fetchColumn({commit},id){
            getAndCommit(`/api/columns/${id}`,'fetchColumn',commit)
        },
        fetchPosts({commit},id){
            getAndCommit(`/api/columns/${id}/posts`,'fetchPosts',commit)
        },
    },
    getters:{
        getColumnsById:(state)=>(id:number)=>{
            return state.columns.find(column=>column._id===id)
        },
        getPostsById:(state)=>(id:number)=>{

            return state.posts.filter(post=>post.column===id)
        }
    }
})
export default store