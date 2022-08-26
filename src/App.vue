<script setup lang="ts">
import Table from './components/Table.vue'
</script>

<template>
  <Suspense timeout="0">
    <template #default>
      <Table />
    </template>
    <template #fallback>
      <div class="loading-div">
        <h1 id="big-font">ገና አልዚጊጅም</h1>
        <h2>Gena alzigijum</h2>
        <h3>Not ready yet</h3>
      </div>
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
.loading-div {
  color: white;
  padding-top: 15%;
  transform: scale(1);
  animation: pulse 1s linear infinite;
}
@keyframes pulse {
  0% {
    transform: scale(0.95);
  }
  70% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.95);
  }
}
#big-font {
  font-size: 10vw;
}
</style>
