import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/peoples',
    method: 'get',
    params: query
  })
}

export function deletePeople(id) {
  return request({
    url: `/peoples/${id}`,
    method: 'delete',
    params: {}
  })
}

export function createPeople(data) {
  return request({
    url: '/peoples',
    method: 'post',
    data
  })
}

export function updatePeople(data) {
  return request({
    url: `/peoples/${data.id}`,
    method: 'put',
    data
  })
}
