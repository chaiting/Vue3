<template>
  <div>
    <Row>
      <Col span="6" class="btn-area">
        <Button
          size="large"
          type="primary"
          class="btn-phone"
          @click="$emit('on-click', '1')"
          >1
        </Button>
      </Col>
      <Col span="6" class="btn-area">
        <Button
          size="large"
          type="primary"
          class="btn-phone"
          @click="$emit('on-click', '2')"
          >2
        </Button>
      </Col>
      <Col span="6" class="btn-area">
        <Button
          size="large"
          type="primary"
          class="btn-phone"
          @click="$emit('on-click', '3')"
          >3
        </Button>
      </Col>
    </Row>
    <Row>
      <Col span="6" class="btn-area">
        <Button
          size="large"
          type="primary"
          class="btn-phone"
          @click="$emit('on-click', '4')"
          >4
        </Button>
      </Col>
      <Col span="6" class="btn-area">
        <Button
          size="large"
          type="primary"
          class="btn-phone"
          @click="$emit('on-click', '5')"
          >5
        </Button>
      </Col>
      <Col span="6" class="btn-area">
        <Button
          size="large"
          type="primary"
          class="btn-phone"
          @click="$emit('on-click', '6')"
          >6
        </Button>
      </Col>
    </Row>
    <Row>
      <Col span="6" class="btn-area">
        <Button
          size="large"
          type="primary"
          class="btn-phone"
          @click="$emit('on-click', '7')"
          >7
        </Button>
      </Col>
      <Col span="6" class="btn-area">
        <Button
          size="large"
          type="primary"
          class="btn-phone"
          @click="$emit('on-click', '8')"
          >8
        </Button>
      </Col>
      <Col span="6" class="btn-area">
        <Button
          size="large"
          type="primary"
          class="btn-phone"
          @click="$emit('on-click', '9')"
          >9
        </Button>
      </Col>
    </Row>
    <Row>
      <Col span="6" class="btn-area">
        <Button
          size="large"
          type="primary"
          class="btn-phone"
          @click="$emit('on-click', '*')"
          >*
        </Button>
      </Col>
      <Col span="6" class="btn-area">
        <Button
          size="large"
          type="primary"
          class="btn-phone"
          @click="$emit('on-click', '0')"
          >0
        </Button>
      </Col>
      <Col span="6" class="btn-area">
        <Button size="large" type="primary" class="btn-phone" disabled>
          #
        </Button>
      </Col>
    </Row>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.btn-area {
  margin: 8px;
}
.btn-phone {
  width: 80px;
  height: 80px;
  line-height: 76px;
  background-color: #f0f3f7;
  border: 1px solid #cecece;
  border-radius: 10px;
  font-size: 36px;
  font-weight: bold;
  color: #3c4c5e;
}
.btn-phone:hover {
  background-color: #3aa48f;
  border: #3aa48f 1px solid;
  color: #fff;
}
</style>
