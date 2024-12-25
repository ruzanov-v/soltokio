import { createApp } from 'vue'
import './style.css'
import '@sukacripta/uikit-soltokio/src/style.css'
import App from './App.vue'
import { createRouter } from './router/createRouter'

createApp(App)
    .use(createRouter())
    .mount('#app')

setTimeout(() => {
    const appSplashEl = document.querySelector<HTMLDivElement>('#app-splash')

    if (!appSplashEl) {
        throw new Error()
    }

    appSplashEl.style.animation = '0.4s linear 0s 1 running app-ready'
    appSplashEl.addEventListener('animationend', () => {
        appSplashEl.style.display = 'none' 
    })
}, 500)