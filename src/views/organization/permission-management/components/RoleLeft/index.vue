<template>
  <div class="page-box">
    <div class="actions">
      <el-button type="primary" @click="handleCreate">新建角色</el-button>
    </div>
    <div class="list">
      <div
        v-for="item in roleList"
        :key="item.id"
        :class="['list-item', activeId === item.id ? 'active' : '']"
        @click="handleChangeRole(item)"
      >
        <div class="list-item-left">
          <span>{{ item.roleName }}</span>
        </div>
        <div class="list-item-right">
          <el-popover width="96" placement="bottom" trigger="hover">
            <template #reference>
              <k-icon v-if="!item.isDefault" name="el-icon-edit" />
              <span v-else></span>
            </template>
            <div class="list-item-right-button">
              <el-button @click="handleEdit(item)">
                <k-icon name="el-icon-edit" />
                <span>修改角色</span>
              </el-button>
              <el-button type="danger" @click="handleDelete(item)">
                <k-icon name="el-icon-delete" />
                <span>删除角色</span>
              </el-button>
            </div>
          </el-popover>
        </div>
      </div>
    </div>
    <EditRoleDialog
      ref="EditRoleDialogRef"
      @confirm="handleConfirmEdit"
    ></EditRoleDialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  deleteRole as apiDeleteRole,
  getRoleList as apiGetRoleList
} from '@/api/organization';
import type { RoleListItemType } from '@/types/api/organization';
import { $roleItemMap } from '@/constant/bi-map/organization';
import { BiMapConversion } from '@/utils/bi-map';
import { withLoading } from '@/utils/with-loading';
import { head as _head } from 'lodash-es';
import { ElMessage, ElMessageBox } from 'element-plus';
import EditRoleDialog from '../EditRoleDialog/index.vue';
import { controlDataKey } from '../../utils';

const controlData = inject(controlDataKey);
const activeId = computed(() => {
  const { activeId: targetActiveId } = controlData || {};
  return targetActiveId;
});

const roleList = ref<RoleListItemType[]>([]);
handleGetRoleList();
function handleGetRoleList() {
  withLoading(apiGetRoleList)().then((res) => {
    const { data } = res;
    roleList.value = BiMapConversion(data || [], $roleItemMap);
    if (!activeId.value) {
      const head = _head(roleList.value);
      if (head) {
        handleChangeRole(head);
      }
    }
  });
}

function handleChangeRole(item?: RoleListItemType) {
  const { id = null } = item || {};
  if (controlData) {
    controlData.activeId = id;
  }
}

const EditRoleDialogRef = ref();
function handleCreate() {
  EditRoleDialogRef.value?.open({ title: '新建角色' });
}

function handleEdit(item: RoleListItemType) {
  EditRoleDialogRef.value?.open(item);
}

function handleConfirmEdit() {
  EditRoleDialogRef.value?.close();
  handleGetRoleList();
}

function handleDelete(item: RoleListItemType) {
  ElMessageBox.confirm(`此操作将删除${item.roleName}角色, 是否继续?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const { id } = item;
    withLoading(apiDeleteRole)(id).then((res) => {
      ElMessage.success(res.msg || '删除成功');
      // 如果删除的角色是正在预览的角色 则重新获取角色列表提取第一个展示或者没有就不展示
      if (id === activeId.value) {
        handleChangeRole();
      }
      handleGetRoleList();
    });
  });
}
</script>

<script lang="ts">
export default {
  name: 'RoleLeft'
};
</script>

<style lang="scss" scoped>
.page-box {
  display: flex;
  flex-direction: column !important;
  height: 100%;
  overflow: hidden;

  .actions {
    flex-basis: 60px;
    padding: 10px;
    border-bottom: 1px solid #ebeef5;

    .el-button {
      width: 100%;
    }
  }

  .list {
    flex: 1;
    overflow-y: auto;

    .list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 45px;
      padding: 0 20px 0 30px;
      cursor: pointer;
      transition: all 0.5s;

      .el-icon-more {
        display: none;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
      }

      &:hover {
        color: #409eff;
        background-color: #ecf5ff;

        .el-icon-more {
          display: block;
        }
      }

      &.active {
        color: #409eff;
        background-color: #ecf5ff;

        .el-icon-more {
          display: block;
        }
      }

      &-left {
        flex-basis: 172px;
        overflow: hidden;

        span {
          display: block;
          width: 100%;
          overflow: hidden;
          font-size: 14px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.list-item-right-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .el-button {
    margin: 5px;
  }
}
</style>
