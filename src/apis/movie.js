import request from '../utils/request'

export default {
    query (data) {
        return request({
            url: '/api/j/search_subjects',
            method: 'get',
            params:data
        })
    }
}