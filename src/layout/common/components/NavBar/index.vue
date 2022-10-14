<template>
  <div class="navbar">
    <div class="left-menu">
      <hamburger
        v-if="navigationType !== 'top'"
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />

      <breadcrumb
        v-if="showBreadCrumb && navigationType === 'left'"
        class="breadcrumb-container"
      />

      <TopSidebar class="navigation-container" v-if="navigationType === 'top'">
        <hamburger
          :is-active="sidebar.opened"
          class="hamburger-container"
          @toggleClick="toggleSideBar"
        />
      </TopSidebar>

      <MixtureSidebar
        class="navigation-container"
        v-if="navigationType === 'mixture'"
      ></MixtureSidebar>
    </div>

    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <size-select
          v-if="showSizeSelect"
          id="size-select"
          class="right-menu-item hover-effect"
        />
        <div class="right-menu-item hover-effect">
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
        </div>
      </template>

      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <el-avatar shape="square" :src="avatar" icon="ElIconUserFilled" />
          <span class="avatar-wrapper-nickname">{{ nickname }}</span>
          <k-icon
            name="el-icon-caret-bottom"
            v-show="false"
            class="avatar-wrapper-icon"
          ></k-icon>
        </div>
        <!-- <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Item</el-dropdown-item>
          </el-dropdown-menu>
        </template> -->
      </el-dropdown>
      <div class="logout-box right-menu-item hover-effect" @click="logout">
        <k-icon name="el-icon-switch-button" class="logout-box-icon"></k-icon>
        <span class="logout-box-text">注销</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 组件依赖
import Breadcrumb from '@/components/Breadcrumb/index.vue';
import Hamburger from '@/components/Hamburger/index.vue';
import SizeSelect from '@/components/SizeSelect/index.vue';
import { ElMessageBox } from 'element-plus';

import {
  useAppStore,
  useUserStore,
  useTagsViewStore,
  useSettingsStore,
  useOrganizationStore
} from '@/store';
import TopSidebar from '../Sidebar/TopSidebar.vue';
import MixtureSidebar from '../Sidebar/MixtureSidebar.vue';

const appStore = useAppStore();
const userStore = useUserStore();
const tagsViewStore = useTagsViewStore();
const settingsStore = useSettingsStore();
const organizationStore = useOrganizationStore();

const route = useRoute();
const router = useRouter();

const sidebar = computed(() => appStore.sidebar);
const device = computed(() => appStore.device);
const avatar = computed(() => userStore.avatar);
const nickname = computed(() => userStore.nickname);
const showBreadCrumb = computed(() => settingsStore.breadCrumb);
const showSizeSelect = computed(() => settingsStore.sizeSelect);
const navigationType = computed(() => settingsStore.navigationType);
const tenantList = computed(() => organizationStore.tenantList);
const tenantValue = computed({
  get() {
    return organizationStore.tenant;
  },
  set(value) {
    organizationStore.setTenant(value);
  }
});

function tenantValueChange(value: string) {
  tenantValue.value = value;
  if (route.path !== '/dashboard') {
    router.replace('/');
  }
  setTimeout(() => {
    window.location.reload();
  }, 16.7);
}

function toggleSideBar() {
  appStore.toggleSidebar();
}

function logout() {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    userStore
      .logout()
      .then(() => {
        tagsViewStore.delAllViews();
      })
      .then(() => {
        router.push(`/login?redirect=${route.fullPath}`);
      });
  });
}
</script>

<style lang="scss" scoped>
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.navbar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

  .left-menu {
    display: flex;
    flex: 1;
    align-items: center;
    overflow: hidden;

    .hamburger-container {
      flex-basis: 50px;
      height: 100%;
      line-height: 46px;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgb(0 0 0 / 2.5%);
      }
    }

    .breadcrumb-container {
      flex: 1;
      overflow: hidden;
    }

    .navigation-container {
      flex: 1;
      overflow: hidden;
    }
  }

  .right-menu {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    padding-right: 10px;
    overflow: hidden;
    font-weight: normal;
    color: #282828;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      padding: 0 8px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgb(0 0 0 / 2.5%);
        }
      }
    }

    .avatar-container {
      height: 100%;

      .avatar-wrapper {
        display: flex;
        align-items: center;
        height: 100%;

        &-nickname {
          margin-left: 10px;
          overflow: hidden;
          white-space: nowrap;
        }

        &-icon {
          width: 12px;
          height: 12px;
          margin-left: 5px;
        }
      }
    }

    .logout-box {
      display: flex;
      align-items: center;
      height: 100%;

      &-icon {
        width: 16px;
        height: 16px;
      }

      &-text {
        margin-left: 5px;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
}
</style>
