<template>
  <div class="tags-view-box">
    <ul class="tags-list">
      <li
        class="tags-list-item"
        :class="{ 'is-active': isCurrentPath === '/dashboard' }"
        @click="tagsClick('/dashboard')"
      >
         <span>Dashboard</span>
      </li>
      <li
        class="tags-list-item"
        v-for="(item, index) in routerList"
        :class="{ 'is-active': isCurrentPath === item.path }"
        :key="item.path"
        @click="tagsClick(item.path)"
      >
        <span>{{ item.meta.title }}</span>
        <i class="el-icon-close" @click.stop="deleteRoute(index)"></i>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, watch } from "vue";
import { useRoute, useRouter, RouteMeta } from "vue-router";
import { toStringfy } from "@/utils/validate";
interface IRouteItem {
  path: string;
  meta: RouteMeta;
}
export default defineComponent({
  name: "TagsView",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const initRoute: IRouteItem = {
      path: route.path,
      meta: route.meta,
    };
    const routerList: IRouteItem[] = reactive([]);
    let prevPath = "/dashboard"; //首页
    if (!route.meta.affix) {
      routerList.push(initRoute);
    }
    const filterArray = (arr: IRouteItem[], route: IRouteItem) => {
      for (const item of arr) {
        if (toStringfy(item) === toStringfy(route)) {
          return false;
        }
      }
      return true;
    };
    let isCurrentPath = ref(initRoute.path);
    const tagsClick = (path: string) => {
      isCurrentPath.value = path;
      router.push({
          path: path
      })
    };
    const deleteRoute = (i: number) => {
      let deletePath = routerList[i].path
      routerList.splice(i, 1);
      if (routerList.length > 0) {
        prevPath = routerList[routerList.length - 1].path;
        
      } else {
        prevPath = "/dashboard";
      }
      if(deletePath === isCurrentPath.value) {
        //   删除当前tags时进行路由跳转
        router.push({
            path: prevPath,
        });
      } else {
        //  isCurrentPath.value = prevPath
      }
      
    };

    watch(route, (currentRoute) => {
      const { path, meta } = currentRoute;
      const routeItem: IRouteItem = {
        path,
        meta,
      };
      if (filterArray(routerList, routeItem) && meta.isTag && !meta.affix) {
        routerList.push(routeItem);
      }
      isCurrentPath.value = routeItem.path;
    });

    return {
      routerList,
      isCurrentPath,
      tagsClick,
      deleteRoute,
    };
  },
});
</script>
<style lang="scss" scoped>
.tags-view-box {
  border-bottom: 1px solid #eee;
  background-color: #fff;
  overflow: hidden;
  .tags-list {
    font-size: 0;
    padding: 2px 4px;
    .tags-list-item {
      display: inline-block;
      line-height: 36px;
      min-width: 80px;
      text-align: center;
      padding: 0 8px;
      cursor: pointer;
      font-size: 14px;
      color: #333;
      background-color: #eee;
      border-radius: 4px;
      margin-right: 8px;
      .el-icon-close {
        font-size: 12px;
        margin-left: 8px;
        color: #fff;
        background-color: #009c89;
        padding: 2px;
        border-radius: 50%;
      }
    }
    .tags-list-item.is-active {
      color: #fff;
      background-color: #009c89;
      .el-icon-close {
        color: #009c89;
        background-color: #fff;
      }
    }
  }
}
</style>
