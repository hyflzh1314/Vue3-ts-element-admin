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
    <div class="tag-menus">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <i class="el-icon-menu"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="el-icon-close" command="closeOther"
              >关闭其他</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-close" command="closeAll"
              >关闭全部</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, watch } from "vue";
import { useRoute, useRouter, RouteMeta } from "vue-router";
import { toStringfy, clearReactiveArray } from "@/utils/validate";
interface IRouteItem {
  path: string;
  meta: RouteMeta;
}
export default defineComponent({
  name: "TagsView",
  setup() {
    const router = useRouter();
    const route = useRoute();
    // 页面刷新时当前路由
    let initRoute: IRouteItem = {
      path: route.path,
      meta: route.meta,
    };

    let routerList: IRouteItem[] = reactive([]);
    let homePath = "/dashboard"; //首页路由
    let prevPath = homePath;

    if (!route.meta.affix) {
      // 固定显示tag
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
        path: path,
      });
    };
    const deleteRoute = (i: number) => {
      let deletePath = routerList[i].path;
      routerList.splice(i, 1);
      if (routerList.length > 0) {
        prevPath = routerList[routerList.length - 1].path;
      } else {
        prevPath = homePath;
      }
      if (deletePath === isCurrentPath.value) {
        //   删除当前tags时进行路由跳转
        router.push({
          path: prevPath,
        });
      }
    };

    // tag-menus handle
    const handleCommand = (command: string) => {
      if (command === "closeAll") {
        clearReactiveArray(routerList);
        router.push({
          path: homePath,
        });
      } else {
        if (isCurrentPath.value === homePath) {
          // 处理当前路由为首页时
          clearReactiveArray(routerList);
        } else {
          clearReactiveArray(routerList);
          routerList.push(initRoute);
        }
      }
    };

    // watch route
    watch(
      route,
      (currentRoute) => {
        const { path, meta } = currentRoute;
        const routeItem: IRouteItem = {
          path,
          meta,
        };
        if (filterArray(routerList, routeItem) && meta.isTag && !meta.affix) {
          routerList.push(routeItem);
        }
        isCurrentPath.value = routeItem.path;
        initRoute = routeItem;
      },
      {
        deep: false,
      }
    );

    return {
      routerList,
      isCurrentPath,
      tagsClick,
      deleteRoute,
      handleCommand,
    };
  },
});
</script>
<style lang="scss" scoped>
$tagColor: #009c89;
.tags-view-box {
  position: relative;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  padding: 0 40px 0 20px;
  overflow: hidden;

  .tags-list {
    font-size: 0;
    padding: 2px 0;

    .tags-list-item {
      display: inline-block;
      line-height: 34px;
      min-width: 80px;
      text-align: center;
      padding: 0 8px;
      cursor: pointer;
      font-size: 14px;
      color: #333;
      background-color: #eee;
      border-radius: 4px;
      margin-right: 8px;
      border: 1px solid transparent;
      &:hover {
        border: 1px solid $tagColor;
      }
      .el-icon-close {
        font-size: 12px;
        margin-left: 8px;
        color: #fff;
        background-color: $tagColor;
        padding: 2px;
        border-radius: 50%;
      }
    }
    .tags-list-item.is-active {
      color: #fff;
      background-color: $tagColor;

      .el-icon-close {
        color: $tagColor;
        background-color: #fff;
      }
    }
  }

  .tag-menus {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    transform-origin: center;
    .el-dropdown-link {
      .el-icon-menu {
        transition: transform 0.48s;
        font-size: 20px;
        cursor: pointer;
        color: #999;
      }
      &:hover .el-icon-menu {
        color: $tagColor;
        transform: rotate(90deg);
      }
    }
  }
}
</style>
