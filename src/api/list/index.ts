import request from '@/utils/request'

export interface IList {
    companyId: number
}

export const getList = (data: IList) => request({
    url: '/getList',
    method: 'post',
    data
})