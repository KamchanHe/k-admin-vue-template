<template>
  <div class="container-box page-box">
    <div class="login-left hidden-sm-and-down">
      <el-image class="auxiliary-figure" :src="WelcomeCats"></el-image>
      <el-image class="main-figure" :src="Welcoming"></el-image>
    </div>
    <div class="login-right">
      <div class="login-right-box">
        <div class="title">
          <el-image class="title-logo" :src="Logo"></el-image>
          <span>K Admin Vue Template</span>
        </div>
        <div class="sub-title">
          <span>登录 K Admin Vue Template</span>
        </div>
        <div class="form-box">
          <el-form ref="FormRef" :model="formData" :rules="formRules">
            <el-form-item prop="username">
              <el-input
                v-model="formData.username"
                placeholder="用户名"
                clearable
              >
                <template #prefix>
                  <k-icon name="el-icon-user"></k-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="formData.password"
                placeholder="密码"
                show-password
                clearable
              >
                <template #prefix>
                  <k-icon name="el-icon-lock"></k-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <div class="extra-operate-box">
                <el-checkbox v-model="formData.cacheFormData">
                  记住我
                </el-checkbox>
                <el-button type="primary" text>忘记密码</el-button>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button
                class="block-button"
                type="primary"
                @click="submitForm"
              >
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Welcoming from '@/assets/illustrations/welcoming.svg';
import WelcomeCats from '@/assets/illustrations/welcome-cats.svg';
import Logo from '@/assets/images/logo.svg';
import { useUserStore } from '@/store';

import type { FormInstance, FormRules } from 'element-plus';

const FormRef = ref<FormInstance>();

interface FormDataType {
  username: string;
  password: string;
  cacheFormData: boolean;
}
const formData = reactive({
  username: '',
  password: '',
  cacheFormData: false
}) as FormDataType;

const formRules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: '长度6-18位', trigger: 'blur' }
  ]
}) as FormRules;

const router = useRouter();

function submitForm() {
  if (!FormRef.value) return;
  FormRef.value.validate((valid) => {
    if (valid) {
      const userStore = useUserStore();
      const { username, password } = formData;
      userStore.login({ username, password }).then(() => {
        router.push('/');
      });
    }
  });
}
</script>

<script lang="ts">
export default {
  name: 'Login'
};
</script>

<style lang="scss" scoped>
.page-box {
  display: flex;
  height: 100%;
}

.login-left {
  display: flex;
  flex-basis: 550px;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .auxiliary-figure {
    width: 300px;
  }

  .main-figure {
    width: 500px;
    margin-top: 50px;
  }
}

.login-right {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .title {
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: 500;
    line-height: 32px;
    color: rgb(29 33 41);
  }

  .title-logo {
    width: 50px;
  }

  .sub-title {
    padding-left: 10px;
    font-size: 16px;
    line-height: 24px;
    color: rgb(134 144 156);
  }

  .form-box {
    margin-top: 32px;
  }

  .extra-operate-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
}
</style>
