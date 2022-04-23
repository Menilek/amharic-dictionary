<script setup lang="ts">

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
                            <th>#</th>
                            <th>English</th>
                            <th>Amharic</th>
                        </thead>
                        <tbody>
                            <td>1</td>
                            <td>Dog</td>
                            <td>Wusha</td>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
</style>
