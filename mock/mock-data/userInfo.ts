
const menus = [
    {
        id: 2,
        name: '数据统计',
        url: '',
        children: [
            {
                id: 21,
                name: '套餐统计',
                url: '',
                children: [
                    {
                        id: 211,
                        name: '我的套餐',
                        url: '',
                    }
                ]
            },
            {
                id: 22,
                name: '访客统计',
                url: '',
                children: []
            }
        ]
    },
    {
        id: 3,
        name: '组织架构管理',
        url: '',
        children: [
            {
                id: 31,
                name: '用户管理',
                url: '',
            }
        ]
    }
]
const roles = ['editor']

module.exports = {
    menus,
    roles
}