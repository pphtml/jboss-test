<template>
    <!--<v-text-field-->
            <!--label="Sample Text"-->
            <!--class="mono-font"-->
            <!--multi-line-->
            <!--autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"-->
            <!--:value="sampleText" @keyup.stop="updateSampleText($event.target.value)"-->
    <!--&gt;</v-text-field>-->

    <div contenteditable="true" class="mono-font" autocomplete="off" autocorrect="off" autocapitalize="off"
         spellcheck="false" style="background-color: #eee; overflow: auto; resize: both;" @input="update"
    ></div>
</template>

<script>
    import Vuex from 'vuex'

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
                    console.info('MUTATION!!! ' + mutation.payload);
                    //console.info(this.mytext);
                    this.mytext = mutation.payload;
                    let previousPosition = getCaretCharacterOffsetWithin(this.$el);
                    console.info(previousPosition);
                    let textLengthBefore = this.$el.innerText.length;
                    if (true || computePlainTextLength(this.mytext) == textLengthBefore) {
                        this.$el.innerHTML = this.mytext;
                        let textLengthAfter = this.$el.innerText.length;
                        //console.info(`B: ${textLengthBefore}, A: ${textLengthAfter}`);

                        let selection = window.getSelection();

                        let range = createRange(this.$el.parentNode, { count: previousPosition });

                        if (range) {
                            range.collapse(false);
                            selection.removeAllRanges();
                            selection.addRange(range);
                        }
                    }
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
