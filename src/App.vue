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
                <component
                  v-if="!$route.meta.noKeepAlive"
                  :is="Component"
                  :key="$route.name"
                />
              </keep-alive>
              <component
                v-if="$route.meta.noKeepAlive"
                :is="Component"
                :key="$route.name"
              />
            </router-view>
          </Content>
          <Footer :style="{ textAlign: 'center' }">© E.SUN BANK</Footer>
        </Layout>
      </Layout>
    </Layout>
    <BackTop></BackTop>
    <Spinner></Spinner>
    <LogoutSpinner></LogoutSpinner>
    <Confirm></Confirm>
  </div>
</template>
<script setup lang="ts">
import { RouterView } from "vue-router";
import Banner from "@/core/components/layout/Banner.vue";
import LeftNavigator from "@/core/components/layout/LeftNavigator.vue";
import FunctionTitle from "@/core/components/layout/FunctionTitle.vue";
import Spinner from "@/core/components/misc/Spinner.vue";
import LogoutSpinner from "@/core/components/misc/LogoutSpinner.vue";
import Confirm from "@/core/components/misc/Confirm.vue";
</script>
