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
import TreeSelect from 'primevue/treeselect';
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'
import Skeleton from 'primevue/skeleton';
import Dropdown from 'primevue/dropdown';
import Textarea from 'primevue/textarea';
import FileUpload from 'primevue/fileupload';
import Galleria from 'primevue/galleria';
import Tooltip from 'primevue/tooltip';
import Tag from 'primevue/tag';
import Calendar from 'primevue/calendar';
import InputNumber from 'primevue/inputnumber';
import Checkbox from 'primevue/checkbox';
import Card from 'primevue/card';
import Password from 'primevue/password';
import OverlayPanel from 'primevue/overlaypanel';
import Menu from 'primevue/menu';
import Avatar from 'primevue/avatar';
import InputSwitch from 'primevue/inputswitch';

import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import Chart from 'primevue/chart';
import Knob from 'primevue/knob';

import 'primevue/resources/themes/mdc-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import i18n from "./i18n"

import FlagIcon from 'vue-flag-icon';

const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);
app.use(i18n);
app.use(FlagIcon);

app.component("Paginator", Paginator);
app.component("Button", Button);
app.component("InputText", InputText);
app.component("Toast", Toast);
app.component("ConfirmPopup", ConfirmPopup);
app.component("Chips", Chips);
app.component("TreeSelect", TreeSelect);
app.component("DataView", DataView);
app.component("DataViewLayoutOptions", DataViewLayoutOptions);
app.component("Skeleton", Skeleton);
app.component("Dropdown", Dropdown);
app.component("Textarea", Textarea);
app.component("FileUpload", FileUpload);
app.component("Galleria", Galleria);
app.component("Tag", Tag);
app.component("Calendar", Calendar);
app.component("InputNumber", InputNumber);
app.component("Checkbox", Checkbox);
app.component("Card", Card);
app.component("Password", Password);
app.component("OverlayPanel", OverlayPanel);
app.component("Menu", Menu);
app.component("Avatar", Avatar);
app.component("InputSwitch", InputSwitch);
app.component("Chart", Chart);
app.component("Knob", Knob);

app.directive('tooltip', Tooltip);

app.mount('#app');