<template>
  <div class="about">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="姓名" prop="account">
        <el-input placeholder="请输入内容" v-model="form.account" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
        <el-button type="primary" @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {login} from '@/api/article'
import {setToken} from '@/utils/token'

export default {
  name: 'Home',
  data(){
    return {
      form: {
          account: 'admin',
          password: 'admin@123'
        },
      rules:{
        account:[
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
        password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
      }
    }
  },
  methods:{
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //alert('submit!');
            // this.$http.post('user/login',this.form)
            // .then(res=>{
            //   console.log(res);
            //   if(res.data.code=='20000'){
            //     this.$router.push('/home');
            //   }
              
            // })
            // .catch(error=>{
            //   console.log(error)
            // })
            login(this.form).then(res=>{
                console.log(res);
                let {account,token} = res.data.data;
                 if(res.data.code=='20000'){
                   //token保存
                    setToken(token);
                    this.$router.push('/home');
                  }
              
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
}
</script>
