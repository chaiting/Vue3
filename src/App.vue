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
            <RouterView />
            <Spinner></Spinner>
          </Content>
          <Footer>@ E.SUN BANK</Footer>
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
