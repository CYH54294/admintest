<template>
 <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">{{items[0]}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{items[1]}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{items[2]}}</el-breadcrumb-item>
    </el-breadcrumb>
 </div>
</template>

<script>
 export default {
  name: 'BreadcrumdNav',
  props:{
      items:{
          redirect: true,
          type:Array,
      }
  },
  components: {

  }
 }
</script>

<style scoped>
.el-breadcrumb{
    margin-bottom: 20px;
}
 
</style>
