<template>
  <div> 
    <div class="register-wrapper"> 
      <div id="register">
        <p class="title">员工信息更改：</p>
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
      </div>
	  
	  
    </div>
  </div>
</template>

<script> 

export default {
  name: "Register", 

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
      isDisabled: false, // 是否禁止点击发送验证码按钮
      flag: true,
    }
  }, 
  methods: {
    // <!--提交修改-->
    submitForm() {
		var obj = {
			name: this.ruleForm2.name,
			age: this.ruleForm2.age,
			salary: this.ruleForm2.salary
		}
		console.log(obj)    //打包表格信息
      //发起服务器请求保存修改
    }
}
}
</script>

<style scoped>
.loading-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #aedff8;
  display: flex;
  align-items: center;
  justify-content: center;
}
.register-wrapper img {
  position: absolute;
  z-index: 1;
}
.register-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
#register {
  max-width: 340px;
  margin: 60px auto;
  background: #fff;
  padding: 20px 40px;
  border-radius: 10px;
  position: relative;
  z-index: 9;
}
.title {
  font-size: 26px;
  line-height: 50px;
  font-weight: bold;
  margin: 10px;
  text-align: center;
}
.el-form-item {
  text-align: center;
}
.login {
  margin-top: 10px;
  font-size: 14px;
  line-height: 22px;
  color: #1ab2ff;
  cursor: pointer;
  text-align: left;
  text-indent: 8px;
  width: 160px;
}
.login:hover {
  color: #2c2fd6;
}
.code >>> .el-form-item__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.code button {
  margin-left: 20px;
  width: 140px;
  text-align: center;
}
.el-button--primary:focus {
  background: #409EFF;
  border-color: #409EFF;
  color: #fff;
}
</style>