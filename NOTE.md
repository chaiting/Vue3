### Issue
1. JS or TS => TS
2. Vue3 + Vue router + Linter / Formatter => npm init@latest
3. Pinia Pinia-plugin-persist
4. view-ui-plus i18n
5. vue-keycloak-js
6. axios axios-mock fontawesome is-blank jquery js-file-download lodash ramda vue-moment chart
7. build script, env variable
8. 壓縮 切檔(webpackChunkName) 路徑 browser cache(ex: hash:8)
9. post message, ajax 轉圈, 時間倒數
10. 既有元件轉 vue3 寫法
11. 登出後,keycloak.logoutFn()？
12. 412 error 彈窗
13. v-charts -> vue-chart (https://github.com/ecomfe/vue-echarts)
#### 08/10
1. 跳轉500、401、403，關閉所有modal 
2. 數字format
3. Table 欄位按照（字串靠左、數字靠右、日期靠中間）
4. 單一input，form表單按下enter不要重整
5. 前端仿照後端core
6. 可顯示list訊息alert，string, array
7. input 同時顯示clearable + show-word-limit
8. 分頁邏輯hook
9. 分頁顯示比數統一處理，若有特殊情境可自行定義
10. bpm簽核歷程共用元件
10. 補上共用utility，檢核規則參照A05
11. esun-alert、esun-confirm，透過method呼叫。
12. Input 預設clearable

**_環境_**
- node: 16.16
- vscode: 1.67
- Vue Language Features (Volar): 0.38.5
- TypeScript Vue Plugin (Volar): 0.38.5
- 禁用 vetur
- vue.js devtool (chrome): 6.2.1

**_i18n_**

> Warning: You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.
> https://vue-i18n.intlify.dev/guide/advanced/optimization.html
> https://github.com/intlify/vue-i18n-next/issues/789
> **_keycloak_**
> https://www.keycloak.org/getting-started/getting-started-docker
> **_Loading_**
> BlockUI vs vue-loading-overlay vs iview(Spinner)
> **_Volar_**
> https://github.com/johnsoncodehk/volar/issues/1247#issuecomment-113979710

**_countdown_**
時間比較問題 (string vs number)

```js
let diff = new Date() - new Date(); // x
let diff = new Date().valueOf() - new Date.valueOf(); // v
```

TS
https://stackoverflow.com/questions/42233987/how-to-configure-custom-global-interfaces-d-ts-files-for-typescript/42257742#42257742
https://github.com/rollup/rollup/issues/2793
https://github.com/rollup/rollup/blob/master/CHANGELOG.md#breaking-changes
