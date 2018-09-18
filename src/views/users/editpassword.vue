<template>
    <div>
        <h2>修改密码</h2>
        <el-form :model="formData" class="edit-password" :rules="rule" ref="ruleform" label-width="90px" label-position="left" status-icon>
            <el-form-item label="密码：" prop="new_password">
                <el-input type='password' autocomplete="off" v-model="formData.new_password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" prop="checkpassword">
                <el-input type='password' autocomplete="off" v-model="formData.checkpassword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click="submitForm('ruleform')">提交</el-button>
                <el-button @click="resetForm('ruleform')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data(){
            var validatePass = (rule, value, callback)=>{
                let reg = /^[a-zA-Z0-9]{4,10}$/;
                if(value === ''){
                    callback(new Error('请输入密码'));
                }else if(reg.test(value) == false){
                    callback (new Error('密码不能含有非法字符，长度在4-10之间'))
                }else{
                    if (this.formData.checkpassword !== '') {
                        this.$refs.ruleform.validateField('checkpassword');
                    }
                    callback();
                }
            }
            var validatePass2 = (rule, value, callback) => {
                if(value === ''){
                    callback(new Error('请再次输入密码'));
                }else if(value !== this.formData.new_password){
                     callback(new Error('两次输入密码不一致!'))
                }else{
                    callback();
                }
            }
            return{
                formData:{
                    password:"",
                    checkpassword:"",
                    new_password:"",
                },
                rule:{
                    new_password:[{validator: validatePass, trigger: 'blur'}],
                    checkpassword:[{validator: validatePass2, trigger: 'blur'}]
                }
            }
        },
        methods:{
            getPass(){
                this.formData.password = this.$store.state.password
                // console.log(this.formData.password)
            },
            submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.put('/user/password',this.formData).then(res => {
                        // console.log(res)
                        if(res.code == 200){
                            this.$message.success({
                                message:res.msg,
                                duration:1500,
                                center:true,
                            })
                            this.$store.commit('STORE_PASSWORD',this.formData.new_password)
                            setTimeout(() => {
                                this.$router.push("/layout/index");
                            }, 1000);
                        }else{
                            this.$message.error({
                                message:res.msg,
                                duration:1500,
                                center:true,
                            })
                        }
                    })
                } else {
                    this.$message.error({
                        message:'数据填写错误',
                        duration:1500,
                        center:true,
                    });
                    return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        created(){
            this.getPass()
        }
    }
</script>

<style scoped>
.edit-password{
    width: 500px;
    margin-top: 20px;
}
</style>