<template>
 <div>
<BreadcrumdNav :items="['首页','权限管理','角色列表']"></BreadcrumdNav>
    <el-card>
        <el-table :data="rolesList" style="width: 100%" border>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <RolesRightsCard :rowInfo="scope.row"></RolesRightsCard>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delect">删除</el-button>
            <el-button type="warning" size="mini" icon="el-icon-setting">分配权限</el-button>
          </template>
        </el-table-column>
        </el-table>
    </el-card>
 </div>
</template>

<script>
import BreadcrumdNav from "components/BreadcrumdNav.vue"
import RolesRightsCard from "./childCom/RolesRightsCard"
import {reqRoleList} from "network/api.js"
 export default {
  name: 'Roles',
  data () {
   return {
     rolesList:[]//角色列表
   }
  },
  components: {
    BreadcrumdNav,RolesRightsCard
  },
  created () {
    this.getRoleList()
  },
  methods: {
    async getRoleList(){
      const result =await reqRoleList()
      if(result.meta.status !==200) return this.$message.error('获取角色列表失败')
      this.rolesList = result.data
    }
  }
 }
</script>

<style scoped>

 
</style>
