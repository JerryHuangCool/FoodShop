import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { ElButton,ElPopconfirm } from "element-plus"; 
import './mock/mockServer';//加载mock，获取模拟数据
import VueLazyload from 'vue-lazyload';
import loading from './assets/images/loading.gif';


const app = createApp(App);
app.use(router);
app.use(store);
app.use(VueLazyload,{
    loading
});
app.component(ElButton.name,ElButton);
app.component(ElPopconfirm.name,ElPopconfirm);
app.mount('#app');


