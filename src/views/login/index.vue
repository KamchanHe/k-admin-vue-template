<template>
  <div class="container-box">
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
              <el-select
                v-model="tenantValue"
                placeholder="请选择"
                @change="tenantValueChange"
              >
                <el-option
                  v-for="item in tenantList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                  <div class="tenant-option">
                    <span>{{ item.label }}</span>
                    <span>{{ item.value }}</span>
                  </div>
                </el-option>
              </el-select>
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
import { useUserStore, useOrganizationStore } from '@/store';
import { localGet, localSet, localRemove } from '@/utils/storage';
import {
  assign as _assign,
  isEmpty as _isEmpty,
  head as _head
} from 'lodash-es';

import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';

const organizationStore = useOrganizationStore();
const tenantValue = ref<string>();
const tenantList = computed(() => {
  const { tenantList } = organizationStore;
  return tenantList;
});
function initTenantValue() {
  const { tenant } = organizationStore;
  if (tenant) {
    tenantValue.value = tenant;
    return;
  }
  const noTenantList = _isEmpty(tenantList.value);
  if (noTenantList) {
    ElMessage.error('暂无Tenant可用,请联系管理员');
    return;
  }
  const head = _head(tenantList.value);
  const { value = '' } = head || {};
  organizationStore.setTenant(value);
  tenantValue.value = value;
}

onMounted(() => {
  initTenantValue();
});

function tenantValueChange(value: string) {
  organizationStore.setTenant(value);
}

const FormRef = ref<FormInstance>();
const cacheFormDataKey = 'login-form-data';

interface FormDataType {
  username: string;
  password: string;
  cacheFormData: boolean;
}

const cacheFormData = localGet(cacheFormDataKey);
const defaultFormData = {
  username: '',
  password: '',
  cacheFormData: false
};
const formData = reactive(
  _assign(defaultFormData, cacheFormData)
) as FormDataType;

const formRules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: '长度6-18位', trigger: 'blur' }
  ]
}) as FormRules;

const route = useRoute();
const router = useRouter();

function submitForm() {
  if (!FormRef.value) return;
  FormRef.value.validate((valid) => {
    if (valid) {
      const userStore = useUserStore();
      const { username, password, cacheFormData } = formData;
      userStore.login({ username, password }).then(() => {
        if (cacheFormData) {
          localSet(cacheFormDataKey, formData);
        } else {
          localRemove(cacheFormDataKey);
        }
        const { query } = route;
        const { redirect } = query || {};
        const redirectQuery = getOtherQuery(query);
        router.push({
          path: (redirect as string) || '/',
          query: {
            ...redirectQuery
          }
        });
      });
    }
  });
}

function getOtherQuery(query: typeof route.query) {
  return Object.keys(query).reduce((acc, cur) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur];
    }
    return acc;
  }, {} as Record<string, any>);
}
</script>

<script lang="ts">
export default {
  name: 'Login'
};
</script>

<style lang="scss" scoped>
.container-box {
  flex-direction: row;
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

    .el-select {
      width: 100%;
    }
  }

  .extra-operate-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
}

.tenant-option {
  display: flex;
  justify-content: space-between;
  font-size: 14px;

  span:nth-child(2) {
    font-size: 13px;
    color: #8492a6;
  }
}
</style>
