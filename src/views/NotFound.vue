<template>
  <div>
    <div class="formContainer">
      <header>Oops, 網頁不存在！</header>
      <div class="formContent formErrorPage">
        <div class="formContentFirst">
          <div class="errorPageIcon">
            <img src="@/assets/images/ic_big_red_alert.svg" />
          </div>
        </div>

        <div class="formContentSec">
          <div class="errorPageContent">
            <div class="mainContent">親愛的主管/同仁，您好：</div>
            <div class="mainContent">
              <p class="emp">很抱歉，您所查詢的網頁不存在！</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.contentContainer {
  width: 98%;
  max-width: 1200px;
  margin: 0 auto;
  letter-spacing: 0.03em;
}
.formContainer {
  background: #fff;
  border-radius: 5px;
  padding: 25px 5%;
}
header {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 25px;
}
.fontContent {
  width: 100%;
  display: inline-block;
}
.formErrorPage .formContentFirst {
  width: 30%;
  margin-right: 0;
}
.formContentFirst {
  float: left;
  position: relative;
}
.errorPageIcon {
  width: 250px;
  height: 200px;
  margin: 0 auto 0 auto;
}
.errorPageIcon img {
  width: 180px;
  height: 180px;
}
.formErrorPage .formContentSec {
  width: 52%;
  margin-bottom: 40px;
}
.formContentSec {
  display: inline-block;
  position: relative;
}
.errorPageContent {
  margin-top: 40px;
  margin-bottom: 20px;
}
.errorPageContent .mainContent {
  font-size: 26px;
  line-height: 1.5;
  margin-bottom: 15px;
}
.errorPageContent .mainContent p.emp {
  color: #f94e4e;
}
</style>
