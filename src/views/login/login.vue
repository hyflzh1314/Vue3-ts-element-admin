<template>
    <div class="login-container">
        <el-form ref="loginForm" class="login-form" :model="ruleForm" :rules="rules">
            <div class="form-title">
                Admin
            </div>
            <el-form-item prop="username">
                <span class="form-icon">
                    <svg-icon iconClass="username" />
                </span>
                <el-input 
                v-model="ruleForm.username"
                placeholder="username"  
                clearable>
                </el-input>
            </el-form-item> 
            <el-form-item prop="password">
                <span class="form-icon">
                    <svg-icon iconClass="password" />
                </span>
                <el-input 
                v-model="ruleForm.password"
                placeholder="password" 
                clearable 
                show-password>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="is_remember">记住密码</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button :loading="loading" type="primary"  @click.native.prevent="handleLogin">login</el-button>
            </el-form-item>       
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, Ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Login",
  setup(props, ctx) {
    const store = useStore();
    const router = useRouter();

    const loginForm = ref();
    const ruleForm = reactive({
      username: "",
      password: ""
    });
    // 验证规则
    const rules = reactive({
      username: [
        { required: true, message: "用户名不能为空", trigger: "blur" }
      ],
      password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
    });

    const loading = ref<boolean>(false);
    const is_remember = ref<boolean>(false);
    const handleLogin = () => {
      loginForm.value
        .validate()
        .then(() => {
          loading.value = true;
          store
            .dispatch("user/login", ruleForm)
            .then(res => {
              if (res.code === 200) {
                console.log(res);
                router.push({
                  path: '/'
                })
              }
              loading.value = false;
            })
            .catch(err => {
              loading.value = false;
            });
        })
        .catch((err: unknown) => {
          console.log(err);
        });
    };

    return {
      loginForm,
      ruleForm,
      rules,
      loading,
      is_remember,
      handleLogin
    };
  }
});
</script>
<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  background-color: #72bce3;
  position: relative;

  .login-form {
    width: 340px;
    height: 360px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;

    .form-title {
      font-size: 26px;
      font-weight: 600;
      text-align: center;
      margin-bottom: 40px;
    }
    .el-form-item {
      margin-bottom: 20px;
    }
    /deep/ .el-input__inner {
      padding-left: 30px;
    }
    .form-icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 4px;
      font-size: 22px;
      font-weight: 600;
      z-index: 99;
      .svg-icon {
        color: #333;
      }
    }

    .el-button {
      width: 100%;
      font-size: 18px;
    }
  }
}
</style>
