<template>
  <div class="app-breadcrumb">
    <el-breadcrumb  separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
          <span v-if="index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
          <a v-else >{{ item.meta.title }}</a>
        </el-breadcrumb-item>
      </transition-group>

      <!-- 右侧下拉框 -->
    <div class="right-menu">
      <el-dropdown>
        <span class="el-dropdown-link">
          退出<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span style="display:block;" @click="goBack">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    </el-breadcrumb>
  </div>
</template>

<script>
import {removeToken} from '@/utils/token'
import {logout} from '@/api/article'

export default {
  name: 'Home',
  data() {
    return {
      levelList: null
    }
  },
  created() {
    this.getBreadcrumb()
  },
  watch: {
    $route(to,from) {   //监听路由变化
      this.getBreadcrumb()
    }
  },
  methods:{
    getBreadcrumb() {
      this.levelList = this.$route.matched.filter(item => item.meta && item.meta.title);
    },
    goBack(){
      logout().then(()=>{
        //sessionStorage.removeItem('token');
        removeToken();  //删除token
        this.$router.push('/login');
      })
      
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-breadcrumb {
      margin: 20px 10px;
      &> .right-menu{
          float: right;
      }
    }
</style>