<template>
  <div class="btn-group">
    <Button @click="$router.push('/notfound')">NotFound</Button>
    <Button @click="$router.push('/error')">error</Button>
    <Button @click="$router.push('/forbidden')">forbidden</Button>
    <Button @click="$router.push('/user_profile_not_found')"
      >UserProfileNotFound</Button
    >
  </div>
  <div></div>
</template>

<script setup lang="ts"></script>
