<template>
  <div class="page-box">
    <div class="content-box">
      <el-row>
        <el-col :sm="16">
          <div class="image">
            <el-image :src="PageNotFound"></el-image>
          </div>
        </el-col>
        <el-col :sm="8">
          <div class="bullshit">
            <div class="bullshit-oops">哎呀!迷路了～</div>
            <div class="bullshit-headline">
              你没有权限去该页面或者该页面不存在
            </div>
            <div class="bullshit-info">
              请检查您是否有改页面的权限或者输入的URL是否正确，5秒后将自动返回首页或者您可点击下面的按钮返回首页。
            </div>
            <div class="bullshit-return-home">
              <el-button type="primary" @click="handleToHome">
                {{ timerLabel }}
              </el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageNotFound from '@/assets/illustrations/404.svg';

const timer = ref<number>();
const timerLabel = ref('返回首页');

const router = useRouter();

onMounted(() => {
  let time = 5;
  timerLabel.value = `${time}秒后将返回首页`;
  timer.value = window.setInterval(() => {
    time -= 1;
    if (time <= 0) {
      clearInterval(timer.value);
      router.replace('/');
    } else {
      timerLabel.value = `${time}秒后将返回首页`;
    }
  }, 1000);
});
onBeforeUnmount(() => {
  clearInterval(timer.value);
});

function handleToHome() {
  router.replace('/');
}
</script>

<script lang="ts">
export default {
  name: 'PageNotFound'
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
