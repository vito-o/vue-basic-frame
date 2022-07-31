<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <div class="logo">
          <img class="logo-img" src="../../assets/imgs/logo.png" alt="">
        </div>
        <el-menu
          default-active="1"
        >
          <el-menu-item :index="(i+1)+''" v-for="(m,i) in menus" :key="m.name" @click="menuClick(m)">
            <span>{{m.meta.title}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header >
          <el-row :gutter="20">
            <el-col :span="22">
            </el-col>
            <el-col :span="2" class="user-el-col">
              退出系统
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <RouterView/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { useRouter, RouteRecordRaw } from 'vue-router';

const router = useRouter()

let menus = router.getRoutes().filter(m => m.meta.isShow);

const menuClick = (menu: RouteRecordRaw) => {
  router.push({name: menu.name})
}
</script>

<style lang="less" scoped>
.common-layout{
  display: flex;
  height: 100vh;
  background: var(--el-bg-color-page);
}


.el-header{
  height: 60px;
  background: var(--el-menu-active-color);

  .user-el-col{
    line-height: 60px;
    text-align: center;
    color: #fff;
  }
}

.el-aside{
  background: var(--el-menu-hover-bg-color);
  overflow: hidden;

  .logo{
    position: relative;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background: #fff;
    z-index: 1;
    box-shadow: 2px 0px 3px 0px rgba(0, 0, 0, .2);

    .logo-img{
      position: relative;
      width: 100%;
      height: 80%;
      top: 10%;
      object-fit: contain;
    }
  }
  .el-menu{
    height: calc(100vh - 60px);
  }
}
</style>