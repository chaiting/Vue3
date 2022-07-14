<template>
  <div class="layout">
    <Layout>
      <Header><Banner></Banner> </Header>
      <Layout :style="{ minHeight: '100vh' }">
        <Sider width="250">
          <LeftNavigator></LeftNavigator>
        </Sider>
        <Layout>
          <Content :style="{ padding: '40px 30px' }">
            <FunctionTitle></FunctionTitle>
            <router-view v-slot="{ Component }">
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </router-view>
            <Spinner></Spinner>
          </Content>
          <Footer :style="{ textAlign: 'center' }">© E.SUN BANK</Footer>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script setup lang="ts">
import { RouterView } from "vue-router";
import Banner from "@/components/layout/Banner.vue";
import LeftNavigator from "@/components/layout/LeftNavigator.vue";
import FunctionTitle from "@/components/layout/FunctionTitle.vue";
import Spinner from "./components/misc/Spinner.vue";
</script>
