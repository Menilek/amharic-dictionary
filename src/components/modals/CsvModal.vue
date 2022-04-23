<script setup lang="ts">
import { ref } from 'vue';
const csvInput = ref();
// ADD VALIDATION AGAINST ENTERING POORLY FORMED CSV DATA
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
                    <textarea rows="4" cols="40" name="csvText"
                        placeholder="English,Amharic,Geez,Category&#10;Dog,Wusha,ዉሻ,Noun" v-model="csvInput"></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
</style>
