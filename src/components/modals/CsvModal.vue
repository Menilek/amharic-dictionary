<script setup lang="ts">
import { ref, watch } from 'vue';
import { submitWords } from '../../../utils/util';

const csvInput = ref("");

const wordArray = [] as any;

const errorPresent = ref(false);
const errorMessage = ref("");

watch(csvInput, () => {
    errorPresent.value = false;
    errorMessage.value = "";
})

const validateInput = () => {
    const arrayInput = csvInput.value.split(/\r?\n/);
    arrayInput.forEach(wordCollection => {
        const commaCount = wordCollection.split(",").length - 1;
        if (commaCount === 3) {
            const word = wordCollection.split(",");
            const entry = {
                "english": word[0],
                "amharic": word[1],
                "geez": word[2],
                "category": word[3]
            }
            wordArray.push(entry);
        } else {
            errorMessage.value = "Ensure all four fields are populated";
            return;
        }
    })
    return wordArray.length > 0;
}

const submitInput = async () => {
    const validInput = validateInput();
    if (validInput) {
        errorPresent.value = false;
        const res = await submitWords(wordArray);
        // if (res !== "200") {
        //     errorPresent.value = true;
        //     errorMessage.value = res
        // }
    } else {
        errorPresent.value = true;
    }
}
</script>

<template>
    <div class="modal fade modal-text" id="csvModal" tabindex="-1" aria-labelledby="csvModalLabel" aria-hidden="true"
        ref="modalElement">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="csvModalLabel">Add New Words in CSV format</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h5 v-if="errorPresent">{{ errorMessage }}</h5>
                    <h6 v-if="csvInput.length">English,Amharic,Geez,Category</h6>
                    <h6 v-if="csvInput.length">Dog,Wusha,ዉሻ,Noun</h6>
                    <textarea rows="4" cols="35" name="csvText"
                        placeholder="English,Amharic,Geez,Category&#10;Dog,Wusha,ዉሻ,Noun"
                        v-model="csvInput"></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" @click="submitInput" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
</style>
