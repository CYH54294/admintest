import {request} from "./request"

//登录请求
export const reqLogin = ({username,password}) => request({url:'login', method:'post',data:{username,password}})

//请求左侧菜单栏项
export const reqMenu = () => request({url:'menus',method:'get'})