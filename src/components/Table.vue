<script setup lang="ts">
import { words } from "../words";
import { ref, computed } from 'vue'

const showRow = ref(false);

const query = ref("");
const searchParams = ['english', 'amharic', 'geez'];

const filteredWords = computed(() => {
  return words.filter((word) => {
      return word.english.toString().toLowerCase().indexOf(query.value.toLowerCase()) > -1 || word.amharic.toString().toLowerCase().indexOf(query.value.toLowerCase()) > -1;
  });
});

const hiddenGeez = ref("");
const hiddenCategory = ref("");

const favourites = ref();

const faveCol = ref("Hide");
const expanderCol = ref("Hide");

const toggleFavouriteColumn = () => {
  if (faveCol.value === "Show") {
    faveCol.value = "Hide"
  } else {
    faveCol.value = "Show"
  }
}

const toggleExpander = () => {
if (expanderCol.value === "Show") {
    expanderCol.value = "Hide"
  } else {
    expanderCol.value = "Show"
  }
}

const getImagePath = (isFavourite: boolean) => {
  const solidStar = new URL("../assets/star-solid.svg", import.meta.url);
  const emptyStar = new URL("../assets/star-regular.svg", import.meta.url);
  return isFavourite ? solidStar : emptyStar;
}

const toggleRow = (e) => {
  const rowID = e.target.getAttribute('id');
  const rowGeez = e.target.getAttribute('value');
  const rowCategory = e.target.getAttribute('name');
  console.log(rowGeez)
  console.log(rowCategory)
  const btn = document.getElementById(rowID) as HTMLButtonElement;
  if (btn.textContent === "⯅") {
    btn.textContent = "▼";
    showRow.value = false;
  } else {
    btn.textContent = "⯅";
    hiddenGeez.value = rowGeez;
    hiddenCategory.value = rowCategory;
    showRow.value = true;
  }
}

const toggleFavourite = (e) => {
  const starID = e.target.getAttribute('id');
  const starImage = e.currentTarget as HTMLImageElement;
  const classList = starImage.classList;
  if (classList.contains('far')) {
    starImage.classList.remove('far');
    starImage.classList.add('fas');
    starImage.src=`${getImagePath(true)}`;
  } else {
    starImage.classList.remove('fas');
    starImage.classList.add('far');
    starImage.src=`${getImagePath(false)}`;
  }
}
</script>

<template>
<div class="dictionary-inputs">
  <div class="input-margin">
    <input
      name="search-form"
      class="search-query"
      placeholder="Search for..."
      v-model="query"
    />
  </div>
  <div class="input-margin">
    <button class="btn btn-info" @click="toggleFavouriteColumn">{{ faveCol }} Favourites</button>
    <button class="btn btn-info pad-left" @click="toggleExpander">{{ expanderCol }} Expander</button>
  </div>
  <div class="input-margin">
    <button class="btn btn-primary">Browse Favourites</button>
    <button class="btn btn-primary pad-left">Add Word</button>
    <button class="btn btn-primary pad-left">Dump CSV</button>
  </div>
</div>
  <table class="table table-hover table-responsive table-striped table-sm">
    <thead>
      <tr>
        <th v-show='faveCol === "Hide"'>
          <img class="star-icon gold-star fas fa-star" src="../assets/star-solid.svg" alt="Star icon" />
        </th>
        <th v-show='expanderCol === "Hide"' scope="col">▼</th>
        <th scope="col">English</th>
        <th scope="col">Amharic</th>
      </tr>
    </thead>
    <tbody v-for="word in filteredWords" :key="word._id">
      <tr class="table-active">
        <td v-show='faveCol === "Hide"'>
          <img v-on:click="toggleFavourite" :id="word._id" class="star-icon white-star star-action far fa-star" src="../assets/star-regular.svg" alt="Star icon" />
        </td>
        <button v-show='expanderCol === "Hide"' class="btn btn-primary" v-on:click="toggleRow" :value="word.geez" :name="word.category" :id="word._id">▼</button>
        <td>{{ word.english }}</td>
        <td>{{ word.amharic }}</td>
        <!-- <td rowspan="3">
          <table class="table table-hover table-responsive" v-show="showRow">
            <tr>
              <td>{{ word.geez }}</td>
              <td>{{ word.category }}</td>
            </tr>
          </table>
        </td> -->
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.gold-star {
  filter: invert(83%) sepia(44%) saturate(1278%) hue-rotate(356deg) brightness(98%) contrast(106%);
}
.star-icon {
  height: 25px;
  width: 25px;
}
.white-star {
  filter: invert(100%) sepia(4%) saturate(18%) hue-rotate(144deg) brightness(104%) contrast(100%);
}
.star-action {
  cursor: pointer;
}
.dictionary-inputs {
  position: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 20px;
  text-align: center;
}
.input-margin {
  margin: 0px 6px 10px;
}
.pad-left {
  margin-left: 9px;
}
</style>
