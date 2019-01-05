<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row>
      <el-col>
        <el-input
          placeholder="请输入用户名"
          v-model="query"
          class="input-with-select"
          @clear="searchUserGetAll()"
          clearable
        >
          <el-button @click="searchUser()" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button @click="showAddList()" type="success">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 需要提供数据源tableData 
      prop是数组tableData中对象的key
      label是表头文字
      el-table-column是每一列
    -->
    <el-table height="400px" :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="#" width="60"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
      <el-table-column label="创建日期">
        <template slot-scope="scope">
          <!-- 使用外层组件的数据需要slot-scope="scope" -->
          {{scope.row.create_time | fmdata}}
        </template>
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeUserState(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            plain
            icon="el-icon-edit"
            circle
            @click="showEditList(scope.row)"
          ></el-button>

          <el-button
            type="success"
            plain
            size="mini"
            icon="el-icon-check"
            circle
            @click="showRoleList(scope.row)"
          ></el-button>

          <el-button
            type="danger"
            plain
            size="mini"
            icon="el-icon-delete"
            circle
            @click="showDeleteList(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页
        @size-change ==每页条数改变时  触发的事件
        @current-change==当前页改变   触发的事件
        :current-page 当前页
        :page-sizes="[100, 200, 300, 400]"==每页显示条数的数组
        :page-size="100" 每页显示几条
        layout="total, sizes, prev, pager, next, jumper"
        :total="400  总页数
    -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 点击添加弹出的对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取消</el-button>
        <el-button type="primary" @click="addUser()">确定</el-button>
      </div>
    </el-dialog>

    <!-- 点击编辑图标弹出的编辑对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取消</el-button>
        <el-button type="primary" @click="editUser()">确定</el-button>
      </div>
    </el-dialog>

    <!-- 点击对勾弹出的用户角色对话框 -->
    <el-dialog title="修改用户角色" :visible.sync="dialogFormVisibleRole">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">{{currusername}}</el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          {{roleId}}
          <!-- 当select的v-model的值与option的value相同，默认显示此option的label -->
          <el-select v-model="roleId">
            <el-option label="请选择" value="1" disabled></el-option>
            <el-option :label="v.roleName" :value="v.id" v-for="(v,i) in role" :key="i"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
        <el-button type="primary" @click="updateRole()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      tableData: [],
      pagenum: 1,
      pagesize: "2",
      total: -1,
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleRole: false,
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      formLabelWidth: "100px",
      // 下拉框绑定的id
      roleId: "1",
      role: [],
      currusername: "",
      curruserId: ""
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    // 修改用户信息--功能实现-点击确定-发送修改请求
    async updateRole() {
      this.dialogFormVisibleRole = false;
      const res = await this.$http.put(`users/${this.curruserId}/role`, {
        rid: this.roleId
      });
      // console.log(res)
      if(res.data.meta.status==200){
        this.$message.success(res.data.meta.msg)
      }else{
        this.$message.warning(res.data.meta.msg)
      }
    },
    // 修改用户角色--显示对话框--获取所有的角色
    async showRoleList(user) {
      this.currusername = user.username;
      this.dialogFormVisibleRole = true;
      this.curruserId = user.id;
      const res = await this.$http.get("roles");
      if (res.data.meta.status == 200) {
        this.role = res.data.data;
      }
      //根据用户id查询角色id
      const res2 = await this.$http.get(`users/${user.id}`);
      const {
        data: {
          data: { rid },
          meta: { status }
        }
      } = res2;
      if (status == 200) {
        this.roleId = rid;
      }
    },
    // 修改用户状态
    async changeUserState(user) {
      const res = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      );
      console.log(res);
      const {
        data: {
          meta: { msg, status }
        }
      } = res;
      if (status == 200) {
        this.$message.success(msg);
      }
    },
    //编辑用户--发送请求
    async editUser() {
      const res = await this.$http.put(`users/${this.form.id}`, this.form);
      const {
        data: {
          data: {},
          meta: { msg, status }
        }
      } = res;
      if (status == 200) {
        this.$message.success(msg);
        this.dialogFormVisibleEdit = false;
        this.getTableData();
      }
      this.$message.warning(msg);
    },

    // 编辑用户--展示编辑页--根据id查询数据填入表格中
    async showEditList(user) {
      console.log(user);
      this.dialogFormVisibleEdit = true;
      this.form = user;

      // const res = await this.$http.get(`users/${user.id}`);
      // console.log(res);
      // const {
      //   data: {
      //     data: { email, mobile, username },
      //     meta: { msg, status }
      //   }
      // } = res;
      // if (status == 200) {
      //   this.$message.success(msg);
      // }
    },

    //删除用户--展示删除提示框
    showDeleteList(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          //点击确定后发送请求 --id为要删除的用户id
          const res = await this.$http.delete(`users/${id}`);
          console.log(res);
          const {
            data: {
              meta: { msg, status }
            }
          } = res;
          if (status == 200) {
            this.$message.success(msg);
            this.pagenum = 1;
            this.getTableData();
          } else {
            this.$message.warning(msg);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //添加用户--确定按钮获取表单数据--发送请求
    async addUser() {
      const res = await this.$http.post("users", this.form);
      console.log(res);
      const {
        data: {
          // data:{},
          meta: { msg, status }
        }
      } = res;
      if (status == 201) {
        //数据添加成功 关闭对话框，刷新表格---清空数据
        this.dialogFormVisibleAdd = false;
        this.getTableData();
      }
      this.$message.warning(msg);
    },
    //添加按钮显示弹框的方法
    showAddList() {
      this.form = {};
      this.dialogFormVisibleAdd = true;
    },
    //搜索用户--清除输入框内容重新获取数据的方法
    searchUserGetAll() {
      this.getTableData();
    },
    // 搜索用户的方法
    searchUser() {
      // 获取表单的值-给query--调用this.getTableData
      // 获取搜索结果时要先回到第一页
      console.log(this.query);
      this.pagenum = 1;
      this.getTableData();
    },
    //分页相关的方法
    handleSizeChange(val) {
      // 每页条数改变时
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      //每页条数改变的时候跳转到第一页
      this.pagenum = 1;
      this.getTableData();
    },
    handleCurrentChange(val) {
      // 当前页改变
      //此处发请求，第几页pagenum，显示几条pagesize=2
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getTableData();
    },
    // 发送请求，拿到表格数据
    async getTableData() {
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      const {
        data: {
          meta: { msg, status },
          data: { total, users }
        }
      } = res;
      if (status == 200) {
        //表格获取成功
        this.tableData = users;
        this.total = total;
        console.log(this.tableData);
        this.$message.success(msg);
      }
    }
  }
};
</script>

<style>
.box-card {
  height: 100%;
}
.input-with-select {
  margin-top: 10px;
  width: 400px;
}
</style>
