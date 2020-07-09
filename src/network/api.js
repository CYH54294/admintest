import {request} from "./request"

//登录请求
export const reqLogin = ({username,password}) => request({url:'login', method:'post',data:{username,password}})

//请求左侧菜单栏项
export const reqMenu = () => request({url:'menus',method:'get'})

//请求获取用户列表
export const reqUserList = (params) => request({url:'users',method:'get',params})

//修改用户列表状态
export const reqUpdatestate = (uId ,type) => request({url:`users/${uId}/state/${type}`,method:'put'})

//添加用户信息
export const reqAddUser = (userInfo) => request({url:'users',method:'post',data:userInfo})

//编辑用户信息
export const reqUpdateUser = (id,email,mobile) => request({url:`users/${id}`,method:'put',data:{email,mobile}})

//删除用户信息
export const reqdelUser = (id) => request({url:`users/${id}`,method:'delete'})

//获取角色列表
export const reqRoleList = () => request({url:'roles',method:'get'})

//分配角色
export const reqRoleUser = (id,rid) => request({url:`users/${id}/role`,method:'put',data:{rid}})

//获取权限列表
export const reqRightsList = () => request({url:'rights/list',method:'get'})

//删除指定的权限
export const reqDelRights = (roleId,rightId) => request({url:`roles/${roleId}/rights/${rightId}`,method:'delete'})

//获取树状权限列表
export const reqRightsTreeList = () => request({url:'rights/tree',method:'get'})

//角色授权
export const reqRoleRights = (roleId,rids) => request({url:`roles/${roleId}/rights`,method:'post',data:{rids}})
