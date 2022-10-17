<template>
  <el-form
    ref="FormRef"
    label-position="right"
    label-width="120px"
    :model="formData"
    :rules="formDataRules"
  >
    <el-form-item label="角色名" prop="roleName">
      <el-input v-model="formData.roleName" placeholder="请输入角色名" />
    </el-form-item>
    <el-form-item label="是否生效" prop="enable">
      <el-radio v-model="formData.enable" :label="1" style="margin-right: 20px">
        是
      </el-radio>
      <el-radio v-model="formData.enable" :label="0">否</el-radio>
    </el-form-item>
    <div class="action-box">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { assign as _assign } from 'lodash-es';
import {
  getRoleDetail as apiGetRoleDetail,
  // 创建角色
  createRole as apiCreateRole,
  // 修改角色
  updateRole as apiUpdateRole
} from '@/api/organization';
import type { RoleListItemType } from '@/types/api/organization';
import { withLoading } from '@/utils/with-loading';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { $roleItemMap } from '@/constant/bi-map/organization.js';
import { BiMapConversion } from '@/utils/bi-map.js';

export interface MixinDataType {
  id: string;
  roleName?: string;
  enable?: 0 | 1;
}

const emits = defineEmits(['cancel', 'confirm']);

// 表单
const formData = reactive<RoleListItemType>({
  id: '', // id
  roleName: '', // 角色名
  enable: 1 // 是否生效 0:否 1:是
});
// 表单规则
const formDataRules = reactive<FormRules>({
  roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
});

function handleMixin(mixinData: MixinDataType) {
  _assign(formData, mixinData || {});
  const { id } = formData;
  if (id) {
    getDetail();
  }
}

function getDetail() {
  const { id } = formData;
  withLoading(apiGetRoleDetail)(id).then((res) => {
    const { data } = res;
    const biMapData = BiMapConversion(data || {}, $roleItemMap);
    _assign(formData, biMapData);
  });
}

function cancel() {
  emits('cancel');
}

const FormRef = ref<FormInstance>();

function confirm() {
  FormRef.value?.validate((valid) => {
    if (!valid) return;
    const { id, roleName, enable } = formData;
    const api = id ? apiUpdateRole : apiCreateRole;
    withLoading(api)({
      name: roleName,
      enable,
      id
    }).then((res) => {
      ElMessage.success(res.msg);
      emits('confirm', formData);
    });
  });
}

defineExpose({
  handleMixin
});
</script>

<script lang="ts">
export default {
  name: 'DialogContent'
};
</script>

<style lang="scss" scoped>
.action-box {
  display: flex;
  justify-content: flex-end;
}
</style>
