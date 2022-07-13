import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { App } from "vue";

export default (app: App) => {
  app.component("font-awesome-icon", FontAwesomeIcon);
  library.add(fas, fab, far);
};
