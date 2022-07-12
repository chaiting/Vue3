<template>
  <Row>
    <Col span="8">這是Banner </Col>
    <Col span="16">
      <div class="navBar">
        <Button type="error" @click="logout">logout</Button>
      </div>
    </Col>
  </Row>
</template>

<script setup lang="ts">
import { getCurrentInstance } from "vue";

const app = getCurrentInstance();

function logout() {
  app?.appContext.config.globalProperties.$keycloak.logoutFn();
}
</script>

<style>
.navBar {
  float: right;
}
</style>
