<template>
<div class="app-wrapper"> 
    <el-container>
    <!-- 侧边栏 -->
    <Sidebar width="200px" class="sidebar-container"/>
      <el-container>
        <!-- 头部 -->
        <el-header>
          <Navbar />
        </el-header>
        <!-- 主体 -->
        <el-main>
          <!-- 右侧主内容 -->
          <Main />
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </div>
  
</template>

<script>
// import Sidebar from './components/Sidebar'
// import Navbar from './components/Navbar'
// import Main from './components/Main'
import {Sidebar,Navbar,Main} from './components'

export default {
  name: 'Home',
  methods:{
    goBack(){
      this.$router.push('/login');
    }
  },
  components:{
    Sidebar,
    Navbar,
    Main
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  height:100%;
}
</style>