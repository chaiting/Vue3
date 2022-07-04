import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import ViewUIPlus from "view-ui-plus";
import "view-ui-plus/dist/styles/viewuiplus.css";
import "@/assets/base.css";
import utils from "./utils";
// import lodash from "lodash";

console.log(utils.add(1, 2));
// console.log(lodash);
let person: School.Person;
person = {
  name: "Joe",
  age: 1,
  course: "A",
};

console.log(person);

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(ViewUIPlus);
app.mount("#app");
