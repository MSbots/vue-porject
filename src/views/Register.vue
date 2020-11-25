<template>
  <div> 
    <div class="register-wrapper"> 
      <div id="register">
        <p class="title">注册</p>
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="0"
          class="demo-ruleForm"
        >
          <el-form-item prop="userName">
            <el-input v-model="ruleForm2.userName" auto-complete="off" placeholder="请输入用户名" maxlength="30"></el-input>
          </el-form-item>
           <el-form-item prop="realName">
            <el-input v-model="ruleForm2.realName" auto-complete="off" placeholder="请输入真实姓名" maxlength="20"></el-input>
          </el-form-item>         
          <el-form-item prop="password">
            <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="输入密码" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="确认密码" maxlength="30"></el-input>
          </el-form-item>
           <el-form-item >          
           <el-radio v-model="ruleForm2.sex" label="男" class="radio">男</el-radio>   
           <el-radio v-model="ruleForm2.sex" label="女">女</el-radio>
          </el-form-item>
          <el-form-item prop="smscode" class="code">          
            <el-image  :src="url" class="image"></el-image>
              <el-link @click="getImg">换一张</el-link>
               <el-input v-model="smscode" placeholder="验证码" class="smscode"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register" style="width:100%;">注册</el-button>
            <p class="login" @click="gotoLogin">已有账号？立即登录</p>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
 const axios = require('axios');
export default {
  name: "Register", 
  data() {  
    // <!--验证密码-->
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"))
      } else if(value.length > 30){
        callback(new Error("密码请勿超过30个字符！"))
      }   
      else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback()
      }
    };
    // <!--二次验证密码-->
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      }else if(value !== this.ruleForm2.password) {
        callback(new Error("两次输入密码不一致!"));
      }else{
        callback();
      }
    };
    let validateRealname = (rule,value,callback) =>{
       if(value === ""){
         callback(new Error("真实姓名不能为空"))
       }else if(value.length > 20){
         callback(new Error("姓名请勿超过20个字！"))
       }else{
         callback();
       }
    };
    let validateUsename = (rule,value,callback) =>{
       if(value === ""){
         callback(new Error("用户名不能为空"))
       }else if(value.length > 30){
         callback(new Error("姓名请勿超过30个字符！"))
       }else{
         callback();
       }
    };
    return { 
        url: "",
        smscode: "",
        ruleForm2: {
        password: "",
        checkPass: "",
        userName: "",
        sex:"男",
        realName:""
       
      },
      rules2: {
        password: [{ validator: validatePass, trigger: 'change' }],
        checkPass: [{validator:validatePass2, trigger: 'blur' }],
        userName: [{ validator: validateUsename, trigger: 'change' }],      
        realName: [{ validator: validateRealname, trigger: 'change' }],
      },
    
    }
  }, 
  methods: {
    // <!--进入登录页-->
    gotoLogin() {
      this.$router.push({
        path: "/login/index"
      });
    },
 
    //用来更换验证码实现
			getImg(){
				this.getSrc();
			},
			//获取验证码的
			getSrc(){
				var  _this = this;
				axios.get("http://localhost:8090/user/getImage?time="+Math.random()).then(res=>{
					_this.url = res.data;
				});
			},
      //用来注册用户信息
			register(){
        if(this.ruleForm2.userName==""){
          alert("用户名不能为空")
        }else if(this.ruleForm2.realName==""){
          alert("真实姓名不能为空")
        }else if(this.ruleForm2.password!==this.ruleForm2.checkPass&&this.rules2.userName){
          alert("密码不一致")
        }else if(this.ruleForm2.userName.length>30||this.ruleForm2.realName.length>20||this.ruleForm2.password.length>30){
          alert("输入信息有误，请根据提示修改数据！")
        }else{
          this.$axios.post(this.GLOBAL.BASE_URL+"user/register?code="+this.smscode,
          {userName:this.ruleForm2.userName,
          realName: this.ruleForm2.realName,
           password: this.$md5(this.ruleForm2.password),
           sex: this.ruleForm2.sex
           }).then(res=>{
          console.log(res.data);         
					if(res.data.state){
						alert(res.data.msg+",点击确定跳转至登录页面!");
						location.href="login/index";
					}else{
						alert(res.data.msg);
					}
				});}
			}
		},
		created(){
			//获取验证码
			this.getSrc();
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
.image{
margin-top: 10px;
text-align: center;
}
.smscode{
  max-width: 100px;
}
.radio{
margin-right: 90px;
}
</style>