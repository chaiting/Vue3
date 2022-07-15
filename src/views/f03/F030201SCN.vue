<template>
  <div class="btn-group">
    <Button @click="$router.push('/notfound')">NotFound</Button>
    <Button @click="$router.push('/error')">error</Button>
    <Button @click="$router.push('/forbidden')">forbidden</Button>
    <Button @click="$router.push('/user_profile_not_found')">UserProfileNotFound</Button>
  </div>

  <div class="btn-group">
    <Button @click="getError401">Error 401</Button>
    <Button @click="getError403">Error 403</Button>
    <Button @click="getError412">Error 412</Button>
  </div>
</template>

<script setup lang="ts">
import f030201Api from "@/api/f03/f030201-api";

function getError401() {
  f030201Api.doGetError401();
}

function getError403() {
  f030201Api.doGetError403();
}

function getError412() {
  f030201Api.doGetError412();
}
</script>
