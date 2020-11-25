<template>
    <div class="hello">
      <el-container style="height: 700px; border: 1px solid #eee">        

        <el-container>
          <el-header>
            <span>
              <h1 style="font-size: 30px; text-align: center;">欢迎使用员工管理系统</h1>
            </span>
          </el-header>
          <el-header style="text-align: right; font-size: 20px">
            <span>Welcome! {{ user.realName }}</span>
            <el-button type="text" style="margin-left: 10px;" @click="loginout">退出登录</el-button>
          </el-header>
          
          <el-main>
            <el-table
              :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%">
              <el-table-column
                prop="id"
                label="编号"
                width="180">
              </el-table-column>
              <el-table-column label="姓名" prop="name" width="180"></el-table-column>
              <el-table-column label="工资" prop="salary"></el-table-column>
              <el-table-column label="年龄" prop="age"></el-table-column>
              <el-table-column align="right">
                <!-- eslint-disable-next-line -->
                <template slot="header" slot-scope="scope">
                  <el-input
                    v-model="search"
                    size="mini"
                    placeholder="输入姓名关键字搜索"/>
                </template>
                <template slot-scope="scope">
                  <el-button
                    size="medium"
                    @click="editOpen(tableData[scope.$index])">编辑</el-button>
                  <el-button
                    size="medium"
                    type="danger"
                    @click.native.prevent="deleteRow(tableData[scope.$index].id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            
              
             
          </el-main>
        <el-pagination
              style="text-align: center; padding-top: 20px;"
              background
              @size-change="handleSizeChange"
              @current-change="findAll"      
              :current-page="currentPage1"
              :page-sizes="[1, 2, 3, 4,5]"
              :page-size="5"
              
              layout="total, prev, pager, next"
              :total="totalNum">
              
           </el-pagination>
        </el-container>
      </el-container>
      <!-- 添加员工按钮 -->
      <el-button @click.native="dialogVisible = true" type="primary" style="margin: 10px 0 0 10px">添加员工</el-button>
      <!-- 添加员工窗口 -->
      <el-dialog title="添加员工" :visible.sync="dialogVisible" width="50%">
          <el-form ref="form" :rules="rules" :model="form" label-width="100px">
            <el-form-item label="姓名:" prop="name">
              <el-input v-model="form.name"  maxlength="30"></el-input>
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
      </el-dialog>   
      <!-- 编辑框窗口 -->
      <el-dialog title="编辑员工" :visible.sync="editFlag" width="50%">
       <el-form
         :rules="rules"   
         :model="newData"   
         label-width="80px"
       >
         <el-form-item label="ID">
            <el-input disabled v-model="newData.id"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input placeholder="请输入新的姓名" v-model="newData.name" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="工资" prop="salary">
            <el-input placeholder="请输入新的工资" v-model="newData.salary"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input placeholder="请输入新的年龄" v-model="newData.age"></el-input>
          </el-form-item>	  
          <el-form-item>
            <el-button type="primary" @click="newForm(newData)">确认</el-button>
          </el-form-item>
       </el-form>
      </el-dialog>
    </div>
</template>

<!----------------------------------script------------------------------------------------ -->
<script>
import {validateContacts,validateNumber,isInteger,isOneToNinetyNine,checkMax20000}from'../rules';
const axios = require('axios');
  export default{
    data() {
      return {
       totalNum:123,
         currentPage1: 1,
        currentPage2: 2,
        currentPage3: 3,
        currentPage4: 4, 
        // 保存编辑框的数据
        newData:{
          id: "",
          name: "",
          salary: "",
          age: ""
        },
        //显示登陆用户的真实姓名
        user: {
          realName: ""
        },
        //添加员工弹窗
        dialogVisible: false, //控制对话框的显示和隐藏
        dialog: false,
        // 编辑框标记
        editFlag: false,  //控制编辑框的显示和隐藏
        // 保存员工信息的数组
        tableData: [],
        search: '',

        // // 分页
        // total: 0,
        // page: 1,
        // num: 21,
        // currentPage: 1,

        // 添加员工的表单数据
        form: {
          name: "",
          salary: "",
          age: ""
        },
        rules: {
          name: [
            {required: true, message: "名字不能为空", trigger: 'change'},
            {validator: validateContacts,trigger: 'change'}
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
      };
    },
   
          mounted(){
   localStorage.setItem("i",this.info) 
         axios.get("http://localhost:8090/employee/Max")
         .then(Response=>(this.totalNum=Response.data[0].max))
         .catch(function(error){
console.log(error);
         });
         },
    methods: {
      
      // 重置窗口的数据
      resetForm(){
        
      },
      // 打开编辑框
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
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
              console.log(res.data)
            })
            this.editFlag = !this.editFlag;
            location.reload(true);
          }
        }else{
          alert("修改失败！请输入正确格式！")
        }
      },

      // 处理分页
      // findPage(page){
      //   console.log(page);
      // },
      // findSize(size){
      //   console.log(size);
      // },
      max(){
        var _this =this;
         axios.get("http://localhost:8090/employee/MaxID").then(res=>{
            _this.data=res.data.maxid;
            return _this.data;
          })

      },
      handleSizeChange(val) {
                 this.pageNum=val;
                //  this.getPackData();//根据用户获取的每页显示页面数量显示页面
                //  this.totalPageNum();
            },
      findAll(newPage){
          //列表展示
          
          
          this.currentPage = newPage;
          var _this =this;
          axios.get("http://localhost:8090/employee/emplist?start="+this.currentPage).then(res=>{
            _this.tableData=res.data;
            console.log(_this.tableData);
          })
            },
      // findAll(newPage){
      //     //列表展示
          
          
      //     this.currentPage = newPage;
      //     var _this =this;
      //     axios.get("http://localhost:8090/employee/findAll").then(res=>{
      //       _this.tableData=res.data;
      //       console.log(_this.tableData);
      //     })
      //       },

      //  安全退出，删除浏览器存储的User信息
      loginout(){
        this.$confirm('将退出系统, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          localStorage.removeItem("user");
          // location.reload(true);
          location.href="/login/index";
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消退出'
          });          
        });
      },
      // 将表单数据添加到表格中去
      onSubmit() {
        var a=localStorage.getItem("a");
        var b=localStorage.getItem("b");
        var c=localStorage.getItem("c");
        var d=localStorage.getItem("d");
        var e=localStorage.getItem("e");
        if(a == 0 && b == 0 && c == 0 && e == 0 && d == 0){
          axios({
            method:"post",
            url:"http://localhost:8090/employee/insert",
            data:this.form,
          }).then(res =>{
            console.log(res.data)
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
          })
          this.dialogVisible = false;
          location.reload(true);
        }else{
          alert("添加失败！请输入正确格式！")
        }
      },
      // --删除员工信息
      deleteRow(index) {
        this.$confirm('将永久删除该员工信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {     
          this.$axios.get(this.GLOBAL.BASE_URL+"employee/delete/"+index).then((res) =>{
            console.log(res.data);
            this.$message({
              message: '删除成功！',
              type: 'success'
            });
            this.findAll(1);
          })     
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消！'
          });
        }); 
      },
      //刷新展示数据列表
    //  findAll(){
    //    var _this =this;
    //    this.$axios.get(this.GLOBAL.BASE_URL+"employee/findAll").then(res=>{
    //      _this.tableData=res.data;
    //      console.log(_this.tableData);
    //    })
    //  }
     

      // 实现分页
    //   require(){
    //     // post请求
    //     this.axios.post("url", qs.stringify({
    //       page: this.currentPage,
    //       num: this.num
    //     })).then((res)=>{
    //       console.log(res.data)
    //       this.lists = res.data.data;
    //       this.total = res.data.num;
    //     })
    //   },
    //   handleCurrentChange(currentPage){
    //     this.currentPage = currentPage;
    //     console.log(this.currentPage);
    //     this.require();
    //   },
    //   handleSizeChange(size){
    //     this.num = size;
    //     console.log(this.num);
    //   }
    },
    // 生命周期函数
    created() {
      // 获取登陆用户
      var userString =localStorage.getItem("user");
      if(userString){
          this.user=JSON.parse(userString);
          console.log(this.user);
      }else{
          // alert("还未登录，请点击登录")
          location.href="/login/index"
      } 
      //列表展示
      this.findAll(1);
    },
  }
  
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
</style>

