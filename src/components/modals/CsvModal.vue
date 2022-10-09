<script setup lang="ts">
import { ref } from 'vue';
import { submitWords } from '../../../utils/util';

const csvInput = ref("");

const wordArray = [] as any;

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
            console.error("An inadequate number of words was submitted within the collection.")
            return;
        }
    })
    return wordArray.length > 0;
}

const submitInput = async () => {
    const validInput = validateInput();
    if (validInput) {
        const res = await submitWords(wordArray);
        console.log(res);
    } else {
        console.error("FAILED");
    }
    // report error and display it within the modal
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
                    <textarea rows="4" cols="35" name="csvText"
                        placeholder="English,Amharic,Geez,Category&#10;Dog,Wusha,ዉሻ,Noun" v-model="csvInput"></textarea>
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
