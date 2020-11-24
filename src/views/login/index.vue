<template>
  <div class="login-container">
    <el-form ref="form" :model="form" label-width="80px" class="login-form">
      <h2 class="login-title">员工管理系统</h2>
      <el-form-item label="用户名:">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码:">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button type="primary" @click="gotoRegister">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  const axios = require('axios');
export default {
    data() {
      return {
      
        form: {
          userName: "张三",
          password: "44444"
        },
        rules: {
          userName: [
            {required: true, message: "用户名不能为空", trigger: 'blur'},
            {min: 3, max: 10, message: "用户名3-5位", trigger: 'blur'}
          ],
          password: [
            {required: true, message: "密码不能为空", trigger: 'blur'},
            {min: 3, max: 10, message: "密码3-5位", trigger: 'blur'}
          ]
      }
      };

      
    },
    methods: {
      // <!--进入系统-->
       onSubmit(){
                //发送登录请求
                axios.put("http://localhost:8090/user/login",this.form).then(res=>{
                    console.log(res.data);
                    if(res.data.state){
                        alert(res.data.msg+",点击确定进入主页!");
                        //将登录用户信息放入localStorage key  value
                        localStorage.setItem("user",JSON.stringify(res.data.user));
                        location.href="http://localhost:8080/#/Home";
                    }else{
                        alert(res.data.msg);
                    }
                });
            },
      // <!--进入注册页-->
      gotoRegister() {
        this.$router.push({
          path: "/register"

        });
      },
      submitForm(formName) {
          this.$refs[formName].validate(valid => {
            // console.log(valid) 验证通过为true，有一个不通过就是false
            if (valid) {
              // 通过的逻辑
            } else {
              console.log('验证失败');
              return false;
            }
          });
      }
    }
  };
</script>




<style acoped>
.login-form {
  width: 350px;
  margin: 160px auto; /* 上下间距160px，左右自动居中*/
  background-color: rgb(255, 255, 255, 0.8); /* 透明背景色 */
  padding: 30px;
  border-radius: 20px; /* 圆角 */
}

/* 背景 */
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/login.png");
}

/* 标题 */
.login-title {
  color: #303133;
  text-align: center;
}
</style> -->