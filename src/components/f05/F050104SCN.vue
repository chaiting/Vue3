<template>
  <div>
    <CustomerPhone
      :telType="'1'"
      :customerSex="'1'"
      :customerId="'A1234567'"
      :calledNumber="'012345678'"
      :callingNumber="'0212345567'"
      srcFuncCode="A"
      srcFuncName="B"
      :isDialable="true"
    ></CustomerPhone>
  </div>
</template>
<script setup lang="ts"></script>
