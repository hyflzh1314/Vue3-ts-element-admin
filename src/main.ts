import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
const app = createApp(App)

// 引入 element plus
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

// 全局样式
import '@/styles/index.scss'

// svg-icon
const req = require.context('@/icons/svg', false, /\.svg$/)
const requireAll = (requireContext: any) => requireContext.keys().map(requireContext)
requireAll(req)
import SvgIcon from '@/components/SvgIcon/index.vue'
app.component('svg-icon', SvgIcon)


app.use(ElementPlus)
app.use(store).use(router).mount('#app')
