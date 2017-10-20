<template>
    <!--<v-text-field-->
            <!--label="Sample Text"-->
            <!--class="mono-font"-->
            <!--multi-line-->
            <!--autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"-->
            <!--:value="sampleText" @keyup.stop="updateSampleText($event.target.value)"-->
    <!--&gt;</v-text-field>-->

    <div contenteditable="true" class="mono-font" style="background-color: #eee; overflow: auto; resize: both;"
         @input="update"
    ></div>
</template>

<script>
    import Vuex from 'vuex'

    export default {
        //computed: Vuex.mapGetters(['sampleText']),
        mounted: function(){
            this.$el.innerHTML = this.mytext;
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === 'updateMarkedText') {
                    console.info('MUTATION!!! ' + mutation.payload);
                    //console.info(this.mytext);
                    this.mytext = mutation.payload;
                }
            })
        },
        methods: {
            //...Vuex.mapActions(['updateSampleText']),
            update: function(event){
                this.$store.dispatch('updateSampleText', event.target.innerText);
            }
        },
        computed:  {
                // mytext: 'Abc123'
                mytext: {
                    get: function () {
                        //return 'Def345';
                        console.info('GET');
                        return this.$store.getters.markedText;
                    },
                    set: function (newValue) {
                        console.info(`Setting newValue ${newValue}`);
                    }
                }
            }
    }
</script>
