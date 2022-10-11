<template>
  <div class="drawer-container">
    <el-divider>Page Style</el-divider>
    <div class="drawer-item">
      <span>Theme Color</span>
      <div style="float: right; height: 26px; margin: -3px 8px 0 0">
        <theme-picker @change="themeChange" />
      </div>
    </div>

    <div class="drawer-item">
      <span>Open Tags-View</span>
      <el-switch
        v-model="tagsView"
        class="drawer-switch"
        @change="tagsViewChange"
      />
    </div>

    <div class="drawer-item">
      <span>Fixed Header</span>
      <el-switch
        v-model="fixedHeader"
        class="drawer-switch"
        @change="fixedHeaderChange"
      />
    </div>

    <div class="drawer-item">
      <span>Sidebar Logo</span>
      <el-switch
        v-model="sidebarLogo"
        class="drawer-switch"
        @change="sidebarLogoChange"
      />
    </div>

    <div class="drawer-item">
      <span>Open Bread-Crumb</span>
      <el-switch
        v-model="breadCrumb"
        class="drawer-switch"
        @change="breadCrumbChange"
      />
    </div>

    <div class="drawer-item">
      <span>Size Select</span>
      <el-switch
        v-model="sizeSelect"
        class="drawer-switch"
        @change="sizeSelectChange"
      />
    </div>

    <el-divider>Navigation</el-divider>

    <ul class="navbar">
      <el-tooltip
        v-for="item in navigationTypeState"
        :key="item.value"
        :content="item.label"
        placement="bottom"
      >
        <li
          :class="[
            'navbar-item',
            `navbar-item-${item.value}`,
            navigationType === item.value ? 'active' : ''
          ]"
          @click="handleChangeNavigationType(item.value)"
        >
          <div class="main-block" />
          <div class="minor-block" />
        </li>
      </el-tooltip>
    </ul>
  </div>
</template>

<script setup lang="ts">
import ThemePicker from '@/components/ThemePicker/index.vue';
import { useSettingsStore } from '@/store';

const settingsStore = useSettingsStore();

const state = reactive({
  fixedHeader: settingsStore.fixedHeader,
  tagsView: settingsStore.tagsView,
  sidebarLogo: settingsStore.sidebarLogo,
  breadCrumb: settingsStore.breadCrumb,
  navigationType: settingsStore.navigationType,
  sizeSelect: settingsStore.sizeSelect
});

const {
  fixedHeader,
  tagsView,
  sidebarLogo,
  breadCrumb,
  navigationType,
  sizeSelect
} = toRefs(state);

const navigationTypeState: { label: string; value: string }[] = reactive([
  {
    label: 'Left Side',
    value: 'left'
  },
  {
    label: 'Top Side',
    value: 'top'
  },
  {
    label: 'Mix Side',
    value: 'mix'
  }
]);

function themeChange(value: string) {
  settingsStore.changeSetting({ key: 'theme', value });
}

function handleChangeNavigationType(value: string) {
  navigationType.value = value;
  settingsStore.changeSetting({ key: 'navigationType', value });
}

function fixedHeaderChange(value: boolean) {
  settingsStore.changeSetting({ key: 'fixedHeader', value });
}

function tagsViewChange(value: boolean) {
  settingsStore.changeSetting({ key: 'tagsView', value });
}

function sidebarLogoChange(value: boolean) {
  settingsStore.changeSetting({ key: 'sidebarLogo', value });
}

function breadCrumbChange(value: boolean) {
  settingsStore.changeSetting({ key: 'breadCrumb', value });
}

function sizeSelectChange(value: boolean) {
  settingsStore.changeSetting({ key: 'sizeSelect', value });
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-item {
    padding: 12px 0;
    font-size: 14px;
    color: rgb(0 0 0 / 65%);
  }

  .drawer-switch {
    float: right;
  }

  .job-link {
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
  }
}

.navbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  height: 50px;
  padding: 0;

  &-item {
    position: relative;
    width: 18%;
    height: 45px;
    overflow: hidden;
    cursor: pointer;
    background: #f0f2f5;
    border-radius: 4px;
    box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);

    &-left {
      .main-block {
        width: 30%;
        height: 100%;
        background: #1b2a47;
      }

      .minor-block {
        position: absolute;
        top: 0;
        right: 0;
        width: 70%;
        height: 30%;
        background: #fff;
        box-shadow: 0 0 1px #888;
      }
    }

    &-top {
      .main-block {
        width: 100%;
        height: 30%;
        background: #1b2a47;
        box-shadow: 0 0 1px #888;
      }
    }

    &-mix {
      .main-block {
        width: 100%;
        height: 30%;
        background: #1b2a47;
        box-shadow: 0 0 1px #888;
      }

      .minor-block {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 30%;
        height: 70%;
        background: #1b2a47;
        box-shadow: 0 0 1px #888;
      }
    }

    &.active {
      box-shadow: 0 0 10px 3px var(--el-color-primary);
    }
  }
}
</style>
