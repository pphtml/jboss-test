<template>
    <v-flex xs12>
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
    </v-flex>
</template>

<script>
    import Vuex from 'vuex'

    export default {
        computed: Vuex.mapGetters(['sampleText']),
        mounted: function(){
            this.$el.innerText = this.content;
        },
        methods: {
            ...Vuex.mapActions(['updateSampleText']),
            update:function(event){
                //this.$emit('update',event.target.innerText);
                console.info('Updating...');
            }
        },
        props: ['content']
    }
</script>
