<template>
  <div>
    <Row :gutter="20">
      <Col flex="300px">
        <Select v-model="locale">
          <Option value="zh-TW">中文</Option>
          <Option value="en-US">English</Option>
        </Select>
      </Col>
      <Col flex="auto">
        <p>{{ $t("hi") }} // $t("hi")</p>
        <p>{{ t("hi") }} // t('hi')</p>
      </Col>
    </Row>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();
</script>
