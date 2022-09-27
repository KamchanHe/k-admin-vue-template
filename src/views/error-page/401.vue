<template>
  <div class="page-box">
    <div class="content-box">
      <el-row>
        <el-col :sm="8">
          <div class="bullshit">
            <div class="bullshit-oops">哎呀!被挡住了～</div>
            <div class="bullshit-headline">你没有权限去该页面</div>
            <div class="bullshit-info">如有不满请联系你领导</div>
            <div class="bullshit-return-home">
              <span>或者你可以</span>
              <el-button type="primary" @click="handleToHome">回首页</el-button>
            </div>
          </div>
        </el-col>
        <el-col :sm="16">
          <div class="image">
            <el-image :src="NoPermission"></el-image>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import NoPermission from '@/assets/illustrations/401.svg';

const router = useRouter();

function handleToHome() {
  router.replace('/');
}
</script>

<script lang="ts">
export default {
  name: 'NoPermission'
};
</script>

<style lang="scss" scoped>
.page-box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
}

.content-box {
  width: 100%;
  max-width: 1200px;
  margin-top: -10%;
}

.image {
  opacity: 0;
  animation-name: slide-up;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}

.bullshit {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 20px 20px 20px 50px;
  overflow: hidden;

  & > div {
    opacity: 0;
    animation-name: slide-up;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
  }

  &-oops {
    margin-bottom: 20px;
    font-size: 32px;
    font-weight: bold;
    line-height: 40px;
    color: $base-color-primary;
    animation-delay: 0.2s;
  }

  &-headline {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
    line-height: 24px;
    color: #222;
    animation-delay: 0.3s;
  }

  &-info {
    margin-bottom: 30px;
    font-size: 13px;
    line-height: 21px;
    color: grey;
    animation-delay: 0.4s;
  }

  &-return-home {
    animation-delay: 0.5s;

    .el-button {
      margin-left: 10px;
    }
  }
}

@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(60px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
