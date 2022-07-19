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
12. 412 error彈窗


***node***
14.18.2

***i18n***
> Warning: You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.
https://vue-i18n.intlify.dev/guide/advanced/optimization.html
https://github.com/intlify/vue-i18n-next/issues/789
***keycloak***
https://www.keycloak.org/getting-started/getting-started-docker
***Loading***
BlockUI vs vue-loading-overlay vs iview(Spinner)
***Volar***
https://github.com/johnsoncodehk/volar/issues/1247#issuecomment-113979710

***countdown***
時間比較問題 (string vs number)
```js
let diff = new Date() - new Date(); // x
let diff = new Date().valueOf() - new Date.valueOf(); // v
```

TS
https://stackoverflow.com/questions/42233987/how-to-configure-custom-global-interfaces-d-ts-files-for-typescript/42257742#42257742