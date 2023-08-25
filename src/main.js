import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import router from './router/router';

import Paginator from 'primevue/paginator';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import ConfirmPopup from 'primevue/confirmpopup';
import Chips from 'primevue/chips';

import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

import 'primevue/resources/themes/mdc-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);

app.component("Paginator", Paginator);
app.component("Button", Button);
app.component("InputText", InputText);
app.component("Toast", Toast);
app.component("ConfirmPopup", ConfirmPopup);
app.component("Chips", Chips);

app.mount('#app');
