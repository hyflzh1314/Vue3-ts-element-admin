<template>
    <div class="tags-view-box">
        <ul class="tags-list">
            <li class="tags-list-item">
                <router-link to="/">Dashboard</router-link>
            </li>
             <li class="tags-list-item" v-for="(item, index) in routerList" :key="item.path">
                <router-link :to="item.path">{{ item.meta.title }}</router-link>
                <i class="el-icon-close" @click="deleteRoute(index)"></i>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'
import { useRoute, useRouter, RouteMeta } from 'vue-router'
import { toStringfy } from '@/utils/validate'
interface IRouteItem {
    path: string,
    meta: RouteMeta 
}
export default defineComponent({
    name: 'TagsView',
    setup() {
        const router = useRouter()
        const route = useRoute()
        const initRoute: IRouteItem = {
                path: route.path,
                meta: route.meta
        }
        
        const routerList: IRouteItem[] = reactive([initRoute])
        const filterArray = (arr:IRouteItem[], route:IRouteItem) => {
            for(const item of arr ) {
                if(toStringfy(item) === toStringfy(route)) {
                    return false
                }
            }
            return true
        }
        let prevPath = '/dashboard'
        const deleteRoute =( i:number) => {
            routerList.splice(i, 1)
            if( routerList.length > 0 ) {
               prevPath = routerList[routerList.length - 1].path
            } else {
                prevPath = '/dashboard'
            }
            router.push({
                path: prevPath
            })
             
        }


        watch(route, currentRoute => {
            const { path, meta } =  currentRoute
            const routeItem: IRouteItem = {
                path,
                meta
            }
            if(filterArray(routerList, routeItem) && meta.isTag && path !== prevPath ) {
                routerList.push(routeItem)
            }
        })
       

       return {
           routerList,
           deleteRoute
       }
    },
})
</script>
<style lang="scss" scoped>

.tags-view-box {
    border-bottom: 1px solid #eee;
    background-color: #fff;
    overflow: hidden;
    .tags-list {
        font-size: 0;

        .tags-list-item {
            display: inline-block;
            line-height: 38px;
            min-width: 80px;
            text-align: center;
            padding: 0 8px;
            cursor: pointer;
            border-right: 1px solid #eee;
            font-size: 14px;
            color: #333;

            .el-icon-close {
                font-size: 12px;
                margin-left: 8px;
                color: #ddd;
                background-color: #009c89;
                padding: 2px;
                border-radius: 50%;
                
            }
        }
    }
}
</style>
