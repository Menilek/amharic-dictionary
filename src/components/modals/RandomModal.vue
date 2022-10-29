<script setup lang="ts">
import { defineProps, PropType, ref } from "vue";
import { Word } from '@/types';

  const props = defineProps({
      verbs: {
          required: true,
          type: Array as PropType<Word[]>
      }
  })

  const amharicVerb = ref("");
  const englishVerb = ref("");

  const showEnglish = ref(false);

  const revealEnglish = () => {
    showEnglish.value = !showEnglish.value;
  }

  const clearVerbs = () => {
    amharicVerb.value = "";
    englishVerb.value = "";
  }

  const getRandomVerb = () => {
    clearVerbs();
    const max = props.verbs.length;
    const randomNumber = Math.floor(Math.random() * max);
    const randomVerb = props.verbs[randomNumber];
    console.log(randomVerb)
    amharicVerb.value = randomVerb.amharic;
    englishVerb.value = randomVerb.english;
  }

getRandomVerb();

</script>

<template>
    <div class="modal fade modal-text" id="randomModal" tabindex="-1" aria-labelledby="randomModalLabel"
        aria-hidden="true" ref="modalElement">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title modal-text" id="randomModalLabel">Random Word</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h2>{{ amharicVerb }}</h2>
                    <h4 v-if="showEnglish">{{ englishVerb }}</h4>
                </div>
                <button type="button" class="btn btn-success btn-lg btn-block" @click="revealEnglish">{{ showEnglish ? 'Hide English' : 'Reveal English' }}</button>
                <button type="button" class="btn btn-primary btn-lg btn-block" @click="getRandomVerb">Get New Word</button>
            </div>
        </div>
    </div>
</template>

<style>
</style>
