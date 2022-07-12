<template>
  <div class="layout">
    <Layout>
      <Header
        ><Banner></Banner>
      </Header>
      <Layout :style="{ minHeight: '100vh' }">
        <Sider width="250">
          <LeftNavigator></LeftNavigator>
        </Sider>
        <Layout>
          <Content :style="{ padding: '40px 30px' }">
            <FunctionTitle></FunctionTitle>
            <RouterView />
          </Content>
          <Footer>@ E.SUN BANK</Footer>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { getCurrentInstance } from "vue";
import Banner from "@/components/layout/Banner.vue";
import LeftNavigator from "@/components/layout/LeftNavigator.vue";
import FunctionTitle from "@/components/layout/FunctionTitle.vue";


</script>

<style>
/* @import "@/assets/base.css"; */
/* 
#app {
  max-width: 1281px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  font-size: 1rem;
}

nav a:first-of-type {
  border: 0;
} */
</style>
