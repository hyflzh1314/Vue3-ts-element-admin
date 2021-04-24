import { defineComponent, onBeforeMount, onBeforeUnmount } from "vue"
import { useStore } from "vuex"

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

export default function () {
    const store = useStore()
    const rect = body.getBoundingClientRect()
    const resizeHandler = () => {
        if ((rect.width - 1) < WIDTH) {
            store.dispatch("app/closeSidebar")
        }
    }
    onBeforeMount(() => {
        window.addEventListener("resize", resizeHandler)
    })
    onBeforeUnmount(() => {
        window.removeEventListener("resize", resizeHandler)
    })
}