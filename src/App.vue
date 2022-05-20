<script setup lang="ts">
import Table from './components/Table.vue'
</script>

<template>
  <Suspense timeout="0">
    <template #default>
      <Table />
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

<style>
@import "~/bootswatch/dist/darkly/bootstrap.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
