<template>
  <div class="login-wrap">
    <el-form class="form" label-position="top" label-width="80px" :model="formdata">
      <h3>用户登录</h3>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button type="primary" class="btn" @click="login()">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {
        //登录时的数据
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      
      const res = await this.$http.post("/login", this.formdata);
      console.log(res);
      const {
        data: {
          data,
          meta: { msg, status }
        }
      } = res;
      if(status==200) {
        //登录成功--进入到home页(编程式导航)--保存用户信息token
        localStorage.setItem("token",data.token)
        
        this.$router.push({
          name:"home"
        })
        this.$message.success(msg)
      }else{
        this.$message.warning(msg)
      }
    }
  }
};

/*
this.$http.post("/login", this.formdata)
      .then(res => {
        const {
          data: {
            data,
            meta: { msg, status }
          }
        } = res;
        if (status == 200) {
          //登录成功--进入到home页(编程式导航)--保存用户信息
          this.$router.push({
            name: "home"
          });
          // this.$message({
          //   message:msg,
          //   type:"success"
          // })
          // 简化
          this.$message.success(msg);
          // localStorage.setItem(this.formdata)
        } else {
          this.$message.warning(msg);
          //提示登录失败
        }
      });*/
</script>

<style>
.login-wrap {
  background-color: rgb(6, 77, 77);
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
}
.login-wrap .form {
  background-color: #fff;
  width: 400px;
  height: 400px;
  padding: 0 25px;
  border-radius: 5px;
}
.login-wrap .form .btn {
  position: relative;
  left: 50%;
  margin-left: -35px;
}
</style>
