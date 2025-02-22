import { createApp } from "vue";
import App from "./App.vue";

declare global {
  interface Window {
    __POWERED_BY_WUJIE__?: boolean;
    __WUJIE_MOUNT: () => void;
    __WUJIE_UNMOUNT: () => void | Promise<void>;
    __WUJIE: { mount: () => void };
  }
}

if (window.__POWERED_BY_WUJIE__) {
  let instance: any;
  window.__WUJIE_MOUNT = () => {
    instance = createApp(App)
    instance.mount("#app");
  };
  window.__WUJIE_UNMOUNT = () => {
    instance.unmount();
  };
  // module脚本异步加载，应用主动调用生命周期
  window.__WUJIE.mount();
} else {
  createApp(App).mount("#app");
}
