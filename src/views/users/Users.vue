<template>
 <div>
     <!-- 导航 -->
    <BreadcrumdNav :items="['首页','用户管理','用户列表']"></BreadcrumdNav>
    <!-- 卡片 -->
    <el-card>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-input placeholder="请输入内容" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="primary">搜索</el-button>
            </el-col>

        </el-row>
    </el-card>
 </div>
</template>

<script>
import BreadcrumdNav from "components/BreadcrumdNav.vue"
 export default {
  name: 'Users',
  components:{
      BreadcrumdNav
  },
  data () {
   return {

   }
  }
 }
</script>

<style scoped>

 
</style>
