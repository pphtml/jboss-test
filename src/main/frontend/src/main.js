import Vue from 'vue'
import App from './App.vue'
import MyApp from './components/MyApp.vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import { store } from './store'

Vue.use(Vuetify)

new Vue({
    el: '#app',
    store,
    render: h => h(MyApp)
})
