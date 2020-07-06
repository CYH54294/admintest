<template>
 <div>
<BreadcrumdNav :items="['首页','权限管理','角色列表']"></BreadcrumdNav>
 </div>
</template>

<script>
import BreadcrumdNav from "components/BreadcrumdNav.vue"
 export default {
  name: 'Roles',
  data () {
   return {

   }
  },
  components: {
    BreadcrumdNav
  }
 }
</script>

<style scoped>

 
</style>
