<script setup lang="ts">
import { PropType, ref } from "vue";
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
    amharicVerb.value = randomVerb.amharic;
    englishVerb.value = randomVerb.english;
  }

getRandomVerb();

const quizActive = ref(false);

const quizTimer = ref(10);

const timerCountdown = () => {
   quizTimer.value = 10;
   const timer = setInterval(() => {
      if (quizTimer.value <= 0) {
        clearInterval(timer);
      } else {
        quizTimer.value = quizTimer.value  - 1;
      }
}, 1000);
}

const startQuiz = () => {
  quizActive.value = false;
  if (quizActive.value === false) {
    quizActive.value = true;
    const questionLimit = 5;
    const score = 0;
    timerCountdown()
    // after 10 seconds evaluate the input
    // if correct add points
    // if incorrect say nothing and show next question
  } else {
    quizActive.value = false;
    quizTimer.value = 10;
  }
}

const closeModal = () => {
  quizActive.value = false;
  quizTimer.value = 10;
}

</script>

<template>
    <div class="modal fade modal-text" id="quizModal" tabindex="-1" aria-labelledby="quizModalLabel"
        aria-hidden="true" ref="modalElement">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title modal-text" id="quizodalLabel">Quiz</h5>
                    <button @click="closeModal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div v-if="quizActive" class="alert alert-danger" role="alert">
                    <h4>
                      {{ quizTimer }}
                    </h4>
                  </div>
                    <h2>{{ amharicVerb }}</h2>
                    <h4 v-if="showEnglish">{{ englishVerb }}</h4>
                    <input type="text" />
                </div>
                <button v-if="!quizActive" type="button" class="btn btn-warning btn-lg btn-block" @click="startQuiz">Start Quiz</button>
            </div>
        </div>
    </div>
</template>

<style>
</style>
