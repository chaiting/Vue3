<template>
  <div>
    <div>list = {{ list }}</div>
    <Divider></Divider>
    <div class="btn-group">
      <Button type="primary" @click="case1">case 1</Button>
      <Button type="error" @click="case2">case 2</Button>
      <Button type="error" @click="case3">case 3</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

let list = reactive<any>([]);

function case1() {
  list.push(list.length + 1);
}

function case2() {
  list = [4, 5, 6];
}

function case3() {
  list.concat = [4, 5, 6];
}
/**
 * 
mutable
-----------------------
Array.prototype.pop()
Array.prototype.push()
Array.prototype.shift()
Array.prototype.unshift()
Array.prototype.reverse()
Array.prototype.sort()
Array.prototype.splice()

immutable
-----------------------
Array.prototype.slice()
Array.prototype.concat()
Array.prototype.map()
Array.prototype.filter()

 */
</script>
