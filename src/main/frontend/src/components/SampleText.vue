<template>
    <!--<v-text-field-->
            <!--label="Sample Text"-->
            <!--class="mono-font"-->
            <!--multi-line-->
            <!--autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"-->
            <!--:value="sampleText" @keyup.stop="updateSampleText($event.target.value)"-->
    <!--&gt;</v-text-field>-->

    <div contenteditable="true" class="mono-font" autocomplete="off" autocorrect="off" autocapitalize="off"
         spellcheck="false" style="background-color: #eee; overflow: auto; resize: both;" @keyup.stop="update"
    ></div>
</template>

<script>
    import Vuex from 'vuex'
    import he from 'he'

    function getPlainText(html) {
        return html.split(/<\/?mark>/).join('');
    }

    function computePlainTextLength(html) {
        let textOnly = html.split(/<\/?mark>/).join('');
        return textOnly.length;
    }

    function getCaretCharacterOffsetWithin(element) {
        let caretOffset = 0;
        // debugger;
        let selection = window.getSelection();
        if (selection.rangeCount > 0) {
            let range = selection.getRangeAt(0);
            let preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
        }
        return caretOffset;
    }

    function createRange(node, chars, range) {
        if (!range) {
            range = document.createRange()
            range.selectNode(node);
            range.setStart(node, 0);
        }

        if (chars.count === 0) {
            range.setEnd(node, chars.count);
        } else if (node && chars.count >0) {
            if (node.nodeType === Node.TEXT_NODE) {
                if (node.textContent.length < chars.count) {
                    chars.count -= node.textContent.length;
                } else {
                    range.setEnd(node, chars.count);
                    chars.count = 0;
                }
            } else {
                for (var lp = 0; lp < node.childNodes.length; lp++) {
                    range = createRange(node.childNodes[lp], chars, range);

                    if (chars.count === 0) {
                        break;
                    }
                }
            }
        }

        return range;
    }

    export default {
        //computed: Vuex.mapGetters(['sampleText']),
        mounted: function(){
            this.$el.innerHTML = this.mytext;
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === 'updateMarkedText') {
                    //console.info('MUTATION!!! ' + replaceOld);
                    //console.info(this.mytext);
                    this.mytext = mutation.payload;
                    let previousPosition = getCaretCharacterOffsetWithin(this.$el);
                    //console.info(previousPosition);
                    let textLengthBefore = this.$el.innerText.length;
                    let textLengthAfter = computePlainTextLength(this.mytext);
                    if (textLengthAfter == textLengthBefore) {
                    //if (!this.$store.getters.waitingForServer) {
                        this.$el.innerHTML = this.mytext;
                        // this.$el.innerText.length;

                        let selection = window.getSelection();

                        let range = createRange(this.$el.parentNode, { count: previousPosition });

                        if (range) {
                            range.collapse(false);
                            selection.removeAllRanges();
                            selection.addRange(range);
                        }
                    } else {
                        console.info(`ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZzz ${this.$store.getters.waitingForServer}`);
                    }
                }
            })
        },
        methods: {
            //...Vuex.mapActions(['updateSampleText']),
            update: function(event){
                let plainText = getPlainText(event.target.innerHTML);
                let unescaped = he.decode(plainText);
                //console.info(`@Update, lenght: ${unescaped}`);
//                if (event.target.innerText.length != event.target.innerText.trim().length) {
//                    debugger;
//                }
                // this.$store.dispatch('updateSampleText', event.target.innerText);
                this.$store.dispatch('updateSampleText', unescaped);
            }
        },
        computed:  {
                mytext: {
                    get: function () {
                        //return 'Def345';
                        //console.info('GET');
                        return this.$store.getters.markedText;
                    },
                    set: function (newValue) {
                        console.info(`Setting newValue ${newValue}`);
                    }
                }
            }
    }
</script>

<style scoped>
    div {
        min-height: 5em;
    }
</style>
