<template>
<el-container class="home">
  <el-header>
      <div class="logo">
          <img src="~assets/img/logo.png" alt="">
          <h1>电商后台管理系统</h1>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
  </el-header>
  <el-container>
    <el-aside :width="menuFlage ? '64px' : '200px'">
        <div class="toggle-menu" @click="toggleMenu">|||</div>
        <el-menu background-color="#333744" text-color="#fff" :unique-opened="true" :collapse="menuFlage" 
        :collapse-transition='false' router :default-active="activePath">
            <el-submenu v-for="item in menuList" :key="item.id" :index="item.id + ''">
                <template slot="title">
                    <i :class="icons[item.id]"></i>
                    <span>{{item.authName}}</span>
                </template>
                <el-menu-item v-for="citem in item.children" :key="citem.id" :index="'/' + citem.path">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>{{citem.authName}}</span>
                    </template>  
                </el-menu-item>
            </el-submenu>
    </el-menu>
    </el-aside>
    <el-main>
        <router-view></router-view>
        
    </el-main>
  </el-container>
</el-container>
</template>

<script>
 import {reqMenu} from 'network/api'
 export default {
  name: 'Home',
  data () {
   return {
       menuList:[],
       icons:{
           '125':'iconfont icon-user',
           '103':'iconfont icon-tijikongjian',
           '101':'iconfont icon-shangpin',
           '102':'iconfont icon-danju',
           '145':'iconfont icon-baobiao',
       },
       menuFlage:false
   }
  },
  created(){
      this.getmenu()
  },
  methods: {
      //请求menu
      async getmenu(){
        const result = await reqMenu()
        if(result.meta.status !== 200) return this.$message.error('获取导航栏信息失败')
        this.menuList = result.data 
        
      },
      //退出
      logout(){
        this.$confirm('确定要退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('/login')
          sessionStorage.clear()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消退出'
          });          
        });
      },
      toggleMenu(){
          this.menuFlage = !this.menuFlage
      }
  },
  computed:{
      //激活当前路由 刷新页面后不会改变
      activePath(){
          let childs = []
          this.menuList.forEach(item => {
              item.children.forEach(cItem => {
                  childs.push('/' + cItem.path)
              })
          })
          const cItem = childs.find(item => {
              return this.$route.path.indexOf(item) >=0
          })
          return cItem
          
      }
  },
 }
</script>

<style scoped lang='less'>
.home{
    height: 100%;
    .el-container{
        height: 100%;
    }
    .logo{
        width: 300px;
        height: 100%;
    }
    .toggle-menu{
        background-color: #4a5064;
        color: white;
        font-size: 12px;
        text-align: center;
        height: 24px;
        line-height: 24px;
        cursor: pointer;
    }
    .el-menu{
        border-right: none;
    }
}
.el-header{
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo{
        width: 300px;
        height: 100%;
        display: flex;
        align-items: center;
        img{
            width: 55px;
            height: 55px;
        }
        h1{
            font-size: 20px;
            color: white;
            margin-left: 15px;
        }
    }
}
.el-aside{
    background-color: #333744;
}
.el-main{
    background-color: #eaedf1;
}
.iconfont{
    margin-right: 10px;
}
</style>
