import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);

createApp(App).mount("#app");

// // main.js
// import { createApp } from 'vue';
// import App from './App.vue';
// import router from './router'; // if using Vue Router

// import { Amplify } from 'aws-amplify';
// // For Gen2, use the outputs file generated from your backend deployment
// // import awsconfig from './aws-exports'; // or amplify_outputs.json
// import awsconfig from '../amplify_outputs.json'

// Amplify.configure(awsconfig);

// const app = createApp(App);
// // Tell Vue to treat Amplify’s custom elements (e.g. <authenticator>) as custom elements
// app.config.compilerOptions.isCustomElement = tag => tag.startsWith('amplify-');
// app.use(router);
// app.mount('#app');

