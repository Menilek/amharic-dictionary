<script setup lang="ts">
import { PropType } from "vue";
  import { Word } from '../../types';

  const props = defineProps({
      favourites: {
          required: true,
          type: Array as PropType<Word[]>
      }
  })
</script>

<template>
    <div class="modal fade modal-text" id="favouriteModal" tabindex="-1" aria-labelledby="favouriteModalLabel"
        aria-hidden="true" ref="modalElement">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title modal-text" id="favouriteModalLabel">Add favourites to see them here</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>English</th>
                                <th>Amharic</th>
                            </tr>
                        </thead>
                        <tbody v-for="word in favourites" :key="word._id">
                            <tr>
                                <td>{{ favourites.indexOf(word) + 1 }}</td>
                                <td>{{ word.english }}</td>
                                <td>{{ word.amharic }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
</style>
