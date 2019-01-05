<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="@/assets/logo.png" alt>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light middle">
            <h2>电商管理系统</h2>
          </div>
        </el-col>
        <el-col :span="1">
          <div class="grid-content bg-purple logout">
            <a href="#" @click.prevent="handleLogout()">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <el-menu default-active="2" unique-opened router>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>

              <el-menu-item index="users">
                <i class="el-icon-share"></i>
                <span>用户列表</span>
              </el-menu-item>

            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">
                <i class="el-icon-share"></i>
                <span>角色列表</span>
              </el-menu-item>
              <el-menu-item index="2-2">
                <i class="el-icon-share"></i>
                <span>权限列表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">
                <i class="el-icon-share"></i>
                <span>商品列表</span>
              </el-menu-item>
              <el-menu-item index="3-2">
                <i class="el-icon-share"></i>
                <span>商品分类</span>
              </el-menu-item>
              <el-menu-item index="3-3">
                <i class="el-icon-share"></i>
                <span>分类参数</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">
                <i class="el-icon-share"></i>
                <span>订单列表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1">
                <i class="el-icon-share"></i>
                <span>数据报表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  //在组件渲染之前判断有没有token--new vue之前
  beforeCreate() {
    console.log(localStorage.getItem("token"));
    if (!localStorage.getItem("token")) {
      // 提示请先登录，--回到登录页
      this.$router.push({
        path: "/login"
      });
      this.$message.warning("请先登录");
    }
  },
  methods: {
    handleLogout() {
      // 清除用户信息，提示退出成功，回到登录页
      localStorage.clear();
      this.$message.success("退出成功");
      this.$router.push({
        path: "/login"
      });
    }
  }
};
</script>

<style>
.container {
  height: 100%;
}
.header {
  background-color: #b1becf;
}
.main {
  background-color: brown;
}
.container .middle {
  text-align: center;
  line-height: 17px;
}
.container .logout {
  line-height: 58px;
}
</style>
