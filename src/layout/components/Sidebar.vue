<template>
    <el-aside width="200px" class="aside">
        <el-menu router>
          <el-menu-item index="/index">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/loan-input" >
            <i class="el-icon-document"></i>
            <span slot="title">贷款申请</span>
          </el-menu-item>
          <el-menu-item index="/input-manager" >
            <i class="el-icon-menu"></i>
            <span slot="title">申请管理</span>
          </el-menu-item>
          <!-- 有子级 -->
          <el-submenu index="1-4">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">贷款审批</span>
            </template>
            <el-menu-item index="/loan-approve/first">初审</el-menu-item>
            <el-menu-item index="/loan-approve/end">终审</el-menu-item>
          </el-submenu>
        </el-menu>
    </el-aside>
</template>

<script>

export default {
  name: 'Home',
  methods:{

  }
}
</script>

<style lang="scss" scoped>
.aside {
  background:#304156;
  .el-menu {
    border-right: none;
    background-color: #304156;
    color:#fff;
  }
}
</style>