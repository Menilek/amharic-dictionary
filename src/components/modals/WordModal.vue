<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { Word } from '@/types';

const props = defineProps({
  word: {
    required: true,
    type: Object as PropType<Word>
  }
})
</script>

<template>
  <div class="modal fade modal-text" id="viewModal" tabindex="-1" aria-labelledby="viewModalLabel" aria-hidden="true"
    ref="modalElement">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title modal-text" id="viewModalLabel">Viewing: {{ props.word.english }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <table class="table">
            <thead>
              <th>Amharic</th>
              <th>አማሪኛ</th>
              <th>Category</th>
              <th>Edit</th>
              <th>Delete</th>
            </thead>
            <tbody>
              <td>{{ props.word.amharic }}</td>
              <td>{{ props.word.geez }}</td>
              <td>{{ props.word.category }}</td>
              <td>
                <img class="fa-icon white-icon fa-solid fa-pen-to-square" src="../../assets/pen-to-square-solid.svg" />
              </td>
              <td>
                <img class="fa-icon white-icon fas fa-trash-alt" src="../../assets/trash-alt-solid.svg" />
              </td>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.fa-icon {
  height: 25px;
  width: 25px;
}

.white-icon {
  filter: invert(100%) sepia(4%) saturate(18%) hue-rotate(144deg) brightness(104%) contrast(100%);
}

.icon-action {
  cursor: pointer;
}
</style>
