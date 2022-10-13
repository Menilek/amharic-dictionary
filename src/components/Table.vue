<script setup lang="ts">
// import { words } from "../words";
import { ref, computed, onBeforeMount, onMounted } from 'vue';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { reject } from 'lodash';
import { Modal } from "bootstrap";
import { Word } from '@/types';
import WordModal from './modals/WordModal.vue';
import CsvModal from './modals/CsvModal.vue';
import FavouriteModal from './modals/FavouriteModal.vue';
import { getWords } from '../../utils/util'

const favourites = ref();

const wordsPayload = await getWords();
const words = wordsPayload.data;

//TODO: ADD SOLID STARS TO WORDS MARKED AS FAVOURITES
const fetchFavourites = () => {
  const localFavourites = localStorage.getItem('Favourites') as string;
  let faves = JSON.parse(localFavourites);
  if (faves === null) {
    faves = [];
  }
  favourites.value = faves;
};

const displayFavouriteStars = (word: string, favourites: string) => {
  // if amharic in favourites
  // return solid star
  // else return regular star
}

onBeforeMount(() => {
  fetchFavourites();
})

onMounted(() => {
  const searchInput = document.getElementById("search-input");
  searchInput?.focus();
})

const wordOfInterest = ref({
  amharic: "",
  category: "",
  english: "",
  geez: "",
  _id: ""
});

const query = ref("");

const filteredWords = computed(() => {
  return words.filter((word: Word) => {
    return word.english.toString().toLowerCase().indexOf(query.value.toLowerCase()) > -1 || word.amharic.toString().toLowerCase().indexOf(query.value.toLowerCase()) > -1;
  });
});

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
};

const isAmharicWordPresent = (amharic: string) => {
  return favourites.value.find((e: Word) => e['amharic'] === amharic) ? true : false;
};

const toggleFavourite = (e: Event) => {
  const starImage = e.currentTarget as HTMLImageElement;
  const starID = starImage.getAttribute('id');
  const wordObj = words.filter((word: { _id: string|null; }) => word._id === starID);
  interface WORD {
        english: string,
        amharic: string,
        id: string
    }
  const word = { english: wordObj[0].english, amharic: wordObj[0].amharic, id: wordObj[0]._id };
  const isArrayAndEmpty = () => {
    return Array.isArray(favourites) && !favourites.value.length;
  };

  let wordPresent = isAmharicWordPresent(word.amharic);
  console.log(wordPresent)
  if (!wordPresent) {
    const newFavourites = (favourites: Array<WORD>) => favourites.concat(word);
    const newFaves = newFavourites(favourites.value);
    // generateFavouriteHeader(newFaves.length);
    favourites.value = newFaves;
    const favouritesString = JSON.stringify(newFaves);
    localStorage.setItem('Favourites', favouritesString);
  } else {
    let newFaves = reject(favourites.value, (fave: Word) => fave['amharic'] === word['amharic']);
    // generateFavouriteHeader(newFaves.length);
    favourites.value = [...newFaves];
    const favouritesString = JSON.stringify(newFaves);
    localStorage.setItem('Favourites', favouritesString);
  }

  const classList = starImage.classList;
  if (classList.contains('far')) {
    starImage.classList.remove('far');
    starImage.classList.add('fas');
    starImage.src = `${getImagePath(true)}`;
  } else {
    starImage.classList.remove('fas');
    starImage.classList.add('far');
    starImage.src = `${getImagePath(false)}`;
  }
};

// const getFavouriteIcon = (amharic: string) => {
//   // if amharic in favourites
//   // return solid star
//   // else return regular star
//   const solidStar = new URL("../assets/star-solid.svg", import.meta.url);
//   const emptyStar = new URL("../assets/star-regular.svg", import.meta.url);
//   if (isAmharicWordPresent(amharic)) {
//     return solidStar;
//   } else {
//     return emptyStar;
//   }
// }

const getFavouriteClassNames = (amharic: string) => {
  //far fa-star
  if (isAmharicWordPresent(amharic)) {
    return 'fas fa-star';
  } else {
    return 'far fa-star';
  }
}

// can we dynamically create img urls for the favourite star?
// const imgUrl = () => {}

const viewWord = (e: Event) => {
  const img = e.currentTarget as HTMLImageElement;
  const wordID = img.getAttribute('id');
  const wordObj = words.filter((word: { _id: string|null; }) => word._id === wordID);
  wordOfInterest.value = wordObj[0];
}
</script>

<template>
  <div class="dictionary-inputs">
    <div class="input-margin">
      <input id="search-input" type="search" name="search-form" class="search-query" placeholder="Search for..." v-model="query" />
    </div>
    <div class="input-margin">
      <button class="btn btn-info" @click="toggleFavouriteColumn">{{ faveCol }} Favourites</button>
      <button class="btn btn-info pad-left" @click="toggleExpander">{{ expanderCol }} Expander</button>
    </div>
    <div class="input-margin">
      <button class="btn btn-primary">Add Word</button>
      <button class="btn btn-primary pad-left" data-bs-toggle="modal" data-bs-target="#csvModal">Bulk Upload</button>
    </div>
    <div class="input-margin">
      <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#favouriteModal">Browse Favourites</button>
    </div>
  </div>

  <WordModal :word=wordOfInterest />

  <CsvModal />

  <FavouriteModal :favourites=favourites />

  <table class="table table-hover table-responsive table-striped table-sm">
    <thead>
      <tr>
        <th v-show='faveCol === "Hide"'>
          <img class="fa-icon gold-star fas fa-star" src="../assets/star-solid.svg" alt="Star icon" />
        </th>
        <th v-show='expanderCol === "Hide"'>
          <img class="fa-icon white-icon fa-solid fa-eye" src="../assets/eye-solid.svg" />
        </th>
        <th scope="col">English</th>
        <th scope="col">Amharic</th>
      </tr>
    </thead>
    <tbody v-for="word in filteredWords" :key="word._id">
      <tr class="table-active">
        <td v-show='faveCol === "Hide"'>
          <img @click="toggleFavourite" :id="word._id" class="fa-icon star-icon white-icon icon-action far fa-star"
            src="../assets/star-regular.svg" alt="Star icon" />
        </td>
        <td v-show='expanderCol === "Hide"' data-bs-toggle="modal" data-bs-target="#viewModal">
          <img @click="viewWord" :id="word._id"
            class="fa-icon white-icon icon-action fa-solid fa-up-right-and-down-left-from-center"
            src="../assets/up-right-and-down-left-from-center-solid.svg" />
        </td>
        <td>{{ word.english }}</td>
        <td>{{ word.amharic }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.gold-star {
  filter: invert(83%) sepia(44%) saturate(1278%) hue-rotate(356deg) brightness(98%) contrast(106%);
}

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

.modal-text {
  color: white;
}

input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-left: 10px;
  background:
    linear-gradient(45deg, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 43%,#000 45%,#000 55%,rgba(0,0,0,0) 57%,rgba(0,0,0,0) 100%),
    linear-gradient(135deg, transparent 0%,transparent 43%,#000 45%,#000 55%,transparent 57%,transparent 100%);
}

input[type="search"]::-webkit-search-cancel-button:hover {
  cursor: pointer;
}
</style>
