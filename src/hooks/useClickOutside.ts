import { onMounted, onUnmounted,Ref,ref} from 'vue'
const useClickOutside=(elementRef:Ref<null|HTMLElement>)=>{
    const isClickOutside=ref(false)
    const handler=(event:MouseEvent)=>{
        if(elementRef.value){
            if(!elementRef.value.contains(event.target as HTMLElement)){
                isClickOutside.value=true
            }else{
                isClickOutside.value=false
            }
        }
    }
    onMounted(()=>{
        document.addEventListener('click',handler)
    })
    onUnmounted(()=>{
        document.removeEventListener('click',handler)
    })
    return isClickOutside
}
export default useClickOutside