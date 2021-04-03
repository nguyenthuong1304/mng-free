import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/auth/me',
    method: 'post',
    params: {}
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}

export function changeSetting(data) {
  return request({
    url: '/users/change-setting',
    method: 'post',
    data
  })
}

export function updateProfile(data) {
  return request({
    url: '/users/update-profile',
    method: 'put',
    data
  })
}
