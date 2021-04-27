import 'vue-router'
declare module 'vue-router' {
    interface RouteMeta {
        title?: string | any
        roles?: string[]
        isTag?: boolean //是否在tag-view中显示
        isSetTagTitle?: boolean //是否在tag-view中显示标题、如详情页显示title
    }
}