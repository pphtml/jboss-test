const store = new Vuex.Store({
    state: {
        regex: '',
        sampleText: '',
        markedText: ''
    },
    mutations: {
        updateRegex: (state, regex) => state.regex = regex,
        updateSampleText: (state, sampleText) => state.sampleText = sampleText,
        updateMarkedText: (state, markedText) => state.markedText = markedText
    },
    actions: {
        updateRegex: (state, regex) => {
            store.commit('updateRegex', regex);
            store.dispatch('computeMaskedOnServer');
        },
        updateSampleText: (state, expression) => {
            let different = store.state.sampleText != expression;
            store.commit('updateSampleText', expression);
            if (different) {
                store.dispatch('computeMaskedOnServer');
            }
        },
        computeMaskedOnServer: _.throttle((state) => {
                axios.get('/api/regex', {params: {text: store.state.sampleText, regex: store.state.regex}})
                    .then(response => {
                        //console.info(response.data);
                        store.commit('updateMarkedText', response.data.result.maskedText);
                    }).catch(e => {
                    console.info(`Handling of exception not implemented yet: ${e}`);
                });
            }, 100), // ms
        generateSampleData: (state) => {
            store.commit('updateRegex', '[A-Z]\\w+');
            store.dispatch('updateSampleText', 'First Second third Fourth');
        }
    },
    getters: {
        regex: (state) => state.regex,
        sampleText: (state) => state.sampleText,
        markedText: (state) => state.markedText
    }
});

Vue.component('my-app-layout', {
    template: `  <v-app id="example-2" toolbar>
    <!--<v-navigation-drawer absolute persistent light v-model="drawer" overflow>-->
    <v-navigation-drawer permanent clipped light v-model="drawer">
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
               <v-icon>home</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Regular Expression</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" @click="">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed class="indigo darken-4" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Toolbar</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid>
        <regex-regex></regex-regex>
        <div class="mark-container">
            <sample-text class="sample-text"></sample-text>
            <sample-masked class="highlights"></sample-masked>
        </div>
        <sample-data-generator></sample-data-generator>
      </v-container>
    </main>
  </v-app>`,
    data () {
        return {
            drawer: true,
            items: [
                { title: 'Home', icon: 'dashboard' },
                { title: 'About', icon: 'question_answer' }
            ],
            right: null
        }
    }
});

Vue.component('regex-regex', {
    template: `<v-flex xs12>
            <v-text-field
              label="Regular Expression"
              class="mono-font"
              spellcheck="false"
              :value="regex" @keyup.stop="updateRegex($event.target.value)"
            ></v-text-field>
          </v-flex>`,
    computed: Vuex.mapGetters(['regex']),
    methods: Vuex.mapActions(['updateRegex'])
});

Vue.component('sample-text', {
    template: `<v-flex xs12>
            <v-text-field
              label="Sample Text"
              class="mono-font"
              multi-line
              autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
              :value="sampleText" @keyup.stop="updateSampleText($event.target.value)"
            ></v-text-field>
          </v-flex>`,
    computed: Vuex.mapGetters(['sampleText']),
    methods: Vuex.mapActions(['updateSampleText'])
});

Vue.component('sample-masked', {
    template: `<div class="mono-font" style="font-size: 16px;" v-html="markedText"></div>`,
    computed: Vuex.mapGetters(['markedText'])
});

Vue.component('sample-data-generator', {
    template: `<v-btn light @click="generateSampleData()">Generate Sample Data</v-btn>`,
    methods: Vuex.mapActions(['generateSampleData'])
});

Vue.component('my-app', {
    template: `  <v-app light>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon light v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" light></v-toolbar-side-icon>
      <v-btn
        icon
        light
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn
        icon
        light
        @click.stop="clipped = !clipped"
      >
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn
        icon
        light
        @click.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        light
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <main>
      <v-content>
        <v-container fluid>
          <v-slide-y-transition mode="out-in">
            <v-layout column align-center>

              <hello></hello>

            </v-layout>
          </v-slide-y-transition>
        </v-container>
      </v-content>
    </main>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      app
    >
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>`,
    data () {
        return {
            clipped: false,
            drawer: true,
            fixed: false,
            items: [{
                icon: 'bubble_chart',
                title: 'Inspire'
            }],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'Vuetify.js'
        }
    }
});

Vue.component('kalendar', {
    template: `<v-layout row wrap>
    <v-flex md12 lg8 class="hidden-xs-only">
      <v-date-picker v-model="picker2" landscape></v-date-picker>
    </v-flex>
    <v-flex md12 lg4>
        <div>Dnes je {{picker2}}</div>
    </v-flex>
  </v-layout>`,
    data () {
        return {
            picker2: null
        }
    }
});

new Vue({
    el: '#app',
    store: store,
});
