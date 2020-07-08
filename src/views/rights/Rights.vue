<template>
 <div>
    <BreadcrumdNav :items="['首页','权限管理','权限列表']"></BreadcrumdNav>
    <el-card class="box-card">
        <el-table :data="rightsList" style="width: 100%" border>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column label="权限等级">
            <template slot-scope="scope">
                <el-tag v-if="scope.row.level === '0'">一级</el-tag>
                <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
                <el-tag type="warning" v-else>三级</el-tag>
            </template>
        </el-table-column>
        </el-table>
    </el-card>
    
 </div>
</template>

<script>
 import BreadcrumdNav from "components/BreadcrumdNav.vue"
 import {reqRightsList} from "network/api.js"
 export default {
  name: 'Rights',
  data () {
   return {
       rightsList:[]
   }
  },
  components: {
    BreadcrumdNav,
  },
  created () {
      this.getRightsList()
  },
  methods: {
      //获取权限列表
      async getRightsList(){
          const result =await reqRightsList()
          if(result.meta.status !== 200) return this.$message.error('获取权限列表失败')
          this.rightsList = result.data
          
      }
  }
 }
</script>

<style scoped>

 
</style>
