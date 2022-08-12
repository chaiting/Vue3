<template>
  <!-- 單一input，form表單按下enter不要重整 -->
  <Form @submit.prevent="submit">
    <Input></Input>
  </Form>
</template>

<script setup lang="ts">
const submit = (e: SubmitEvent) => {
  console.log(e);
};
</script>
