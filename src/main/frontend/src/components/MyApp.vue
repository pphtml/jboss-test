<template>
    <v-app id="example-2" toolbar>
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
    </v-app>
</template>

<script>
    import RegexRegex from './RegexRegex.vue'
    import SampleText from './SampleText.vue'
    import SampleMasked from './SampleMasked.vue'
    import SampleDataGenerator from './SampleDataGenerator.vue'

    export default {
        name: 'my-app-layout',
        data () {
            return {
                drawer: false,
                items: [
                    { title: 'Home', icon: 'dashboard' },
                    { title: 'About', icon: 'question_answer' }
                ],
                right: null
            }
        },
        components: {
            'regex-regex': RegexRegex,
            'sample-text': SampleText,
            'sample-masked': SampleMasked,
            'sample-data-generator': SampleDataGenerator
        }
    }
</script>