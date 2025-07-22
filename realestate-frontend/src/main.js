// src/main.js

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './assets/main.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'leaflet/dist/leaflet.css';


import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');

if (process.env.NODE_ENV === 'development') {
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = null;
}
