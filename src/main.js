import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles.css'
import './styles-multipage.css'
import './styles-intro.css'
import './styles-brand.css'
import './styles-i18n.css'
import './styles-responsive.css'
import './styles-about.css'

createApp(App).use(router).mount('#app')
