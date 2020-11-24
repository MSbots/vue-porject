<template>
    <div class="hello">
      
        <span>
            <h1>Welcome! {{ user.userName }}</h1>
        </span>
          <el-container id="edit" v-if="editFlag" style="height: 300px; border: 1px solid #eee">
        <el-form
          :rules="rules"   
          :model="newData"   
          label-width="80px"            
        >
         <el-form-item label="ID" >
            <el-input disabled v-model="newData.id"></el-input>     
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input  placeholder="请输入新的姓名" v-model="newData.name" ></el-input>
          </el-form-item>
          <el-form-item label="工资" prop="salary">
            <el-input  placeholder="请输入新的工资" v-model="newData.salary"></el-input>
          </el-form-item>
		  <el-form-item label="年龄" prop="age">
		    <el-input  placeholder="请输入新的年龄" v-model="newData.age"></el-input>
		  </el-form-item>	  
          <el-form-item>
            <el-button type="primary" @click="newForm(newData)" style="width:50%;">确认</el-button>
          </el-form-item>
  </el-form>
  </el-container>

 <el-container style="height: 500px; border: 1px solid #eee"> 
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
                @click="editOpen(tableData[scope.$index])">编辑</el-button>
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
    <el-form ref="form" :rules="rules" :model="form" label-width="100px">
     
      <el-form-item label="名称:"  prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="工资:" prop="salary">
        <el-input v-model="form.salary"></el-input>
      </el-form-item>
      <el-form-item label="年龄:" prop="age">
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
import {validateContacts,validateNumber,isInteger,isOneToNinetyNine,checkMax20000}from'../rules' ;
 
  export default {
    data() { 

   
      return { 
         newData:{
          id: "",
          name: "",
          salary: "",
          age: ""
        },      
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
          name: "张三",
          salary: "123",
          age: "12"
        },
         rules: {
          name: [
            {required: true, message: "名字不能为空", trigger: 'change'},
            {validator: validateContacts,trigger: 'blur'}
          ],
          salary: [
            {required: true, message: "工资不能为空", trigger: 'change'},
            {validator: validateNumber,trigger: 'change'},
            {validator: checkMax20000,trigger: 'change'}
          ],
          age: [
            {required: true, message: "年龄不能为空", trigger: 'change'},
            {validator: isInteger,trigger: 'change'},
            {validator: isOneToNinetyNine,trigger: 'change'}
          ],
      },
          ruleForm2: {       
          salary: "",
          name: "",
          user: "",
		      age:""
        },
   
      }
      
    },
    methods: {
 
             //  --打开编辑框
      editOpen(nowData){
      this.editFlag = !this.editFlag;
      this.newData.id = nowData.id;
      this.newData.name = nowData.name;
      this.newData.salary = nowData.salary;
      this.newData.age = nowData.age;
  },
     //提交修改数据
      newForm(newData){ 
        var a=localStorage.getItem("a");
      var b=localStorage.getItem("b");
      var c=localStorage.getItem("c");
      var d=localStorage.getItem("d");
      var e=localStorage.getItem("e");
      if(a == 0 && b == 0 && c == 0 && e == 0 && d == 0){
        if(this.newData.name==""){
            alert("姓名不能为空")
        }else if(this.newData.salary==0){
            alert("工资不能为空")
        }else if(this.newData.age==0){
            alert("年龄不能为空")
        }else{
        this.$axios.put(this.GLOBAL.BASE_URL+"employee/update",newData).then(res=>{
       console.log(res.data)
     })
     this.editFlag = !this.editFlag;
     location.reload(true);
        }
}else{
        alert("err")
      }
     },

    
    //安全退出，删除浏览器存储的User信息
      loginout(){
        localStorage.removeItem("user");
        location.reload(true);
      },
  
// 将表单数据添加到表格中去
    onSubmit() {
       var a=localStorage.getItem("a");
      var b=localStorage.getItem("b");
      var c=localStorage.getItem("c");
      var d=localStorage.getItem("d");
      var e=localStorage.getItem("e");
       if(a == 0 && b == 0 && c == 0 && e == 0 && d == 0){
      this.$axios({
        method:"post",
        url:this.GLOBAL.BASE_URL+"employee/insert",
        data:this.form,
      }).then(res =>{
        console.log(res.data)
      })
       location.reload(true);
      this.dialogVisible = false;
 }else{
        alert("err")
      }
     
    },
       
 // --删除员工信息
      deleteRow(index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
      }).then(() => {     
     this.$axios.get(this.GLOBAL.BASE_URL+"employee/delete/"+index).then((res) =>{
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
 //刷新展示数据列表
     findAll(){
      var _this =this;
     this.$axios.get(this.GLOBAL.BASE_URL+"employee/findAll").then(res=>{
       _this.tableData=res.data;
       console.log(_this.tableData);
     })
     }
    },
//生命周期函数
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

