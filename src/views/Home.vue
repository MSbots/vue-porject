<template>
    <div class="hello">
      
      
        <span>
            <h1>Welcome! {{ user.userName }}</h1>
        </span>
        <el-container id="edit" v-show="editFlag" style="height: 300px; border: 1px solid #eee">
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="80px"
          class="demo-ruleForm"
        >
         <el-form-item label="ID" prop="user">
            <el-input disabled value="cong999999"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm2.name" auto-complete="off" placeholder="请输入新的姓名"></el-input>
          </el-form-item>
          <el-form-item label="工资" prop="salary">
            <el-input v-model="ruleForm2.salary" auto-complete="off" placeholder="请输入新的工资"></el-input>
          </el-form-item>
		  <el-form-item label="年龄" prop="age">
		    <el-input v-model="ruleForm2.age" auto-complete="off" placeholder="请输入新的年龄"></el-input>
		  </el-form-item>	  
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')" style="width:100%;">确认</el-button>
          </el-form-item>
  </el-form>
  </el-container>
 <el-container style="height: 500px; border: 1px solid #eee">
  <!-- <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>导航一</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>导航二</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>导航三</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="3-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="3-4">
          <template slot="title">选项4</template>
          <el-menu-item index="3-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </el-aside> -->
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
       <el-link type="success" @click="loginout()">退出</el-link>
    </el-header>
    
    <el-main>
      <el-table :data="tableData" :border="true" resizable="true" >
        <el-table-column prop="id" label="ID" width="140">
        </el-table-column>
        <el-table-column prop="name" label="名字" width="80">
        </el-table-column>
        <el-table-column prop="salary" label="工资" width="80">
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="80">
        </el-table-column>
        <el-table-column label="操作" width="250">
            <template slot-scope="scope">
                <el-button
                size="medium"
                @click="editOpen()">编辑</el-button>
                <el-button
                size="medium"
                type="danger"
                @click.native.prevent="deleteRow( tableData[scope.$index].id)">删除</el-button>
           </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</el-container>

     <br>
      <span>
        <el-button @click.native="dialogVisible = true" type="primary">添加员工</el-button>
      </span> 

<el-dialog title="添加员工" :visible.sync="dialogVisible" width="50%">
  <span>
    <el-form ref="form" :model="form" label-width="100px">
     
      <el-form-item label="名称:">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="工资:">
        <el-input v-model="form.salary"></el-input>
      </el-form-item>
      <el-form-item label="年龄:">
        <el-input v-model="form.age"></el-input>
      </el-form-item>
      <el-form-item>
            <el-button type="primary" @click="onSubmit">确认</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>    
  </span>
</el-dialog>

    </div>
</template>

<!----------------------------------script------------------------------------------------ -->
<script>
 const axios = require('axios');
  export default {
    data() { 

       // <!--验证年龄是否合法-->
    let checkAge = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新的年龄"))
      } else if(value > 0){
       
        callback()
      }else{
      		  callback(new Error('请输入正确的年龄格式'))
      }
    }
    // <!--检验工资是否合法-->
    let checkSalary = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新的工资"))
      } else if(value > 0){
       
        callback()
      }else{
		  callback(new Error('请输入正确的工资格式'))
	  }
    }
    // <!--检验姓名是否合法-->
    let checkName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入真实姓名"));
      } else if (value.length > 20) {
        callback(new Error("姓名超过长度限制"));
      } else {
        callback();
      }
    }; 
   
      return { 
           
        user: {
          realName: ""
        },   
        editFlag: false,      
        dialogVisible: false, //控制对话框的显示和隐藏
        dialog: false,
        // ---表格数据
        tableData:[],
        // 对话框表单数据
        form: {
          name: "",
          salary: "",
          age: ""
        },
          ruleForm2: {       
          salary: "",
          name: "",
          user: "",
		      age:""
        },
         rules2: {
        salary: [{ validator: checkSalary, trigger: 'change' }],
        name: [{ validator: checkName, trigger: 'change' }],
        age: [{ validator: checkAge, trigger: 'change' }]
      },
      }
      
    },
    methods: {
              //  --打开编辑框
      editOpen(){
      this.editFlag = !this.editFlag;
    },
    
      //退出
      loginout(){
        localStorage.removeItem("user");
        location.reload(true);
      },
  
    // 将表单数据添加到表格中去
    onSubmit() {
      axios({
        method:"post",
        url:"http://localhost:8090/employee/insert",
        data:this.form,
      }).then(res =>{
        console.log(res.data)
      })
       location.reload(true);
      this.dialogVisible = false;

    },   
       // --删除信息
      deleteRow(index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
      }).then(() => {    
      //删除
      axios.get("http://localhost:8090/employee/delete/"+index).then((res) =>{
        console.log(res.data);
         this.findAll();
      })
      
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      });
    });
   
  },


     findAll(){
      var _this =this;
     axios.get("http://localhost:8090/employee/findAll").then(res=>{
       _this.tableData=res.data;
       console.log(_this.tableData);
     })
     }
    },

    created() {
     var userString =localStorage.getItem("user");
     if(userString){
        this.user=JSON.parse(userString);
     }else{
           alert("还未登录，请点击登录")
           location.href="/login/index"
     } 
     //列表展示
       this.findAll();

     },
  };
 
</script>


<!----------------------------------style------------------------------------------------ -->
<style>
    h1{
        margin-top: 0;
        height: 80px;
        background-color: #B3C0D1;
    }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

