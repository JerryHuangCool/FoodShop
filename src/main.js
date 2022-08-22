import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { ElButton,ElPopconfirm } from "element-plus"; 
const app = createApp(App);
app.use(router);
app.use(store);
app.component(ElButton.name,ElButton);
app.component(ElPopconfirm.name,ElPopconfirm);
app.mount('#app');


