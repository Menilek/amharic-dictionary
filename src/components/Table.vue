<script setup lang="ts">
// import { words } from "../words";
import { ref, computed, onBeforeMount, onMounted } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { reject } from "lodash";
import { Modal } from "bootstrap";
import { Word } from "@/types";
import WordModal from "./modals/WordModal.vue";
import CsvModal from "./modals/CsvModal.vue";
import FavouriteModal from "./modals/FavouriteModal.vue";
import RandomModal from "./modals/RandomModal.vue";
import QuizModal from "./modals/QuizModal.vue";
import { getWords } from "../../utils/util";

const favourites = ref();

const wordsPayload = await getWords();
const words = wordsPayload.data;
const searchPlaceholder = `Search ${words.length} words for...`;

let currentWordset = words;

const getWordsByCategory = (category: string) => {
  const categorisedWords = [];
  for (const word of words) {
    if (word.category === category) {
      categorisedWords.push(word);
    }
  }
  return categorisedWords;
};

const verbs = getWordsByCategory("Verb");
// BELOW IS CATEGORY FEATURE - WIP
// const nouns = getWordsByCategory("Noun");
// const adverbs = getWordsByCategory("Adverb");
// const adjectives = getWordsByCategory("Adjective");
// const prepositions = getWordsByCategory("Preposition");
// const phrases = getWordsByCategory("Phrase");
// const conjunctions = getWordsByCategory("Conjunction");
// const prnouns = getWordsByCategory("Pronoun");
// const slangWords = getWordsByCategory("Slang");
// const unknownWords = getWordsByCategory("Unknown");

// const clickCategoryRadioBtn = (e: Event) => {
//   const radioBtn = e.currentTarget as HTMLInputElement;
//   const wordSet = radioBtn.id;
//   console.log(wordSet);
//   if(wordSet === "All") {
//     currentWordset = words;
//   }
//   currentWordset = wordSet;
// }

//TODO: ADD SOLID STARS TO WORDS MARKED AS FAVOURITES
const fetchFavourites = () => {
  const localFavourites = localStorage.getItem("Favourites") as string;
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
};

onBeforeMount(() => {
  fetchFavourites();
});

onMounted(() => {
  const searchInput = document.getElementById("search-input");
  searchInput?.focus();
});

const wordOfInterest = ref({
  amharic: "",
  category: "",
  english: "",
  geez: "",
  _id: "",
});

const query = ref("");

const filteredWords = computed(() => {
  return currentWordset.filter((word: Word) => {
    return (
      word.english.toString().toLowerCase().indexOf(query.value.toLowerCase()) >
        -1 ||
      word.amharic.toString().toLowerCase().indexOf(query.value.toLowerCase()) >
        -1
    );
  });
});

const faveCol = ref("Hide");
const expanderCol = ref("Hide");

const toggleFavouriteColumn = () => {
  if (faveCol.value === "Show") {
    faveCol.value = "Hide";
  } else {
    faveCol.value = "Show";
  }
};

const toggleExpander = () => {
  if (expanderCol.value === "Show") {
    expanderCol.value = "Hide";
  } else {
    expanderCol.value = "Show";
  }
};

const getImagePath = (isFavourite: boolean) => {
  const solidStar = new URL("../assets/star-solid.svg", import.meta.url);
  const emptyStar = new URL("../assets/star-regular.svg", import.meta.url);
  return isFavourite ? solidStar : emptyStar;
};

const isAmharicWordPresent = (amharic: string) => {
  return favourites.value.find((e: Word) => e["amharic"] === amharic)
    ? true
    : false;
};

const toggleFavourite = (e: Event) => {
  const starImage = e.currentTarget as HTMLImageElement;
  const starID = starImage.getAttribute("id");
  const wordObj = words.filter(
    (word: { _id: string | null }) => word._id === starID
  );
  interface WORD {
    english: string;
    amharic: string;
    id: string;
  }
  const word = {
    english: wordObj[0].english,
    amharic: wordObj[0].amharic,
    id: wordObj[0]._id,
  };
  const isArrayAndEmpty = () => {
    return Array.isArray(favourites) && !favourites.value.length;
  };

  let wordPresent = isAmharicWordPresent(word.amharic);
  // console.log(wordPresent)
  if (!wordPresent) {
    const newFavourites = (favourites: Array<WORD>) => favourites.concat(word);
    const newFaves = newFavourites(favourites.value);
    // generateFavouriteHeader(newFaves.length);
    favourites.value = newFaves;
    const favouritesString = JSON.stringify(newFaves);
    localStorage.setItem("Favourites", favouritesString);
  } else {
    let newFaves = reject(
      favourites.value,
      (fave: Word) => fave["amharic"] === word["amharic"]
    );
    // generateFavouriteHeader(newFaves.length);
    favourites.value = [...newFaves];
    const favouritesString = JSON.stringify(newFaves);
    localStorage.setItem("Favourites", favouritesString);
  }

  const classList = starImage.classList;
  if (classList.contains("far")) {
    starImage.classList.remove("far");
    starImage.classList.add("fas");
    starImage.src = `${getImagePath(true)}`;
  } else {
    starImage.classList.remove("fas");
    starImage.classList.add("far");
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
    return "fas fa-star";
  } else {
    return "far fa-star";
  }
};

// can we dynamically create img urls for the favourite star?
// const imgUrl = () => {}

const viewWord = (e: Event) => {
  const img = e.currentTarget as HTMLImageElement;
  const wordID = img.getAttribute("id");
  const wordObj = words.filter(
    (word: { _id: string | null }) => word._id === wordID
  );
  wordOfInterest.value = wordObj[0];
};
</script>

<template>
  <div>
    <ul class="nav nav-pills">
      <li class="nav-item dropdown">
        <a
          class="nav-link"
          data-bs-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="true"
        >
          <img
            class="fa-icon white-icon fa-solid fa-bars"
            src="../assets/bars-solid.svg"
          />
        </a>
        <div class="dropdown-menu">
          <a class="dropdown-item" @click="toggleFavouriteColumn"
            >{{ faveCol }} Favourites</a
          >
          <a class="dropdown-item" @click="toggleExpander"
            >{{ expanderCol }} Expander</a
          >
          <a
            class="dropdown-item"
            data-bs-toggle="modal"
            data-bs-target="#csvModal"
            >Add Words</a
          >
          <a
            class="dropdown-item"
            data-bs-toggle="modal"
            data-bs-target="#favouriteModal"
            >Favourites</a
          >
          <a
            class="dropdown-item"
            data-bs-toggle="modal"
            data-bs-target="#randomModal"
            >Random Word</a
          >
          <a
            class="dropdown-item"
            data-bs-toggle="modal"
            data-bs-target="#quizModal"
            >Quiz</a
          >
        </div>
      </li>
    </ul>
  </div>
  <div class="dictionary-inputs">
    <div class="input-margin">
      <input
        id="search-input"
        type="search"
        name="search-form"
        class="search-query"
        :placeholder="searchPlaceholder"
        v-model="query"
      />
    </div>

    <!-- <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
      <input @click="clickCategoryRadioBtn" type="radio" class="btn-check" name="btnradio" id="All" autocomplete="off" checked="true">
      <label class="btn btn-outline-primary" for="All">All</label>

      <input @click="clickCategoryRadioBtn" type="radio" class="btn-check" name="btnradio" id="Noun" autocomplete="off" checked="">
      <label class="btn btn-outline-primary" for="Noun">Noun</label>

      <input @click="clickCategoryRadioBtn" type="radio" class="btn-check" name="btnradio" id="Verb" autocomplete="off" checked="">
      <label class="btn btn-outline-primary" for="Verb">Verb</label>

      <input @click="clickCategoryRadioBtn" type="radio" class="btn-check" name="btnradio" id="Adverb" autocomplete="off" checked="">
      <label class="btn btn-outline-primary" for="Adverb">Adverb</label>

      <input @click="clickCategoryRadioBtn" type="radio" class="btn-check" name="btnradio" id="Adjective" autocomplete="off" checked="">
      <label class="btn btn-outline-primary" for="Adjective">Adjective</label>

      <input @click="clickCategoryRadioBtn" type="radio" class="btn-check" name="btnradio" id="Preposition" autocomplete="off" checked="">
      <label class="btn btn-outline-primary" for="Preposition">Preposition</label>

      <input @click="clickCategoryRadioBtn" type="radio" class="btn-check" name="btnradio" id="Phrase" autocomplete="off" checked="">
      <label class="btn btn-outline-primary" for="Phrase">Phrase</label>

      <input @click="clickCategoryRadioBtn" type="radio" class="btn-check" name="btnradio" id="Conjugation" autocomplete="off" checked="">
      <label class="btn btn-outline-primary" for="Conjugation">Conjunction</label>

      <input @click="clickCategoryRadioBtn" type="radio" class="btn-check" name="btnradio" id="Pronoun" autocomplete="off" checked="">
      <label class="btn btn-outline-primary" for="Pronoun">Pronoun</label>

      <input @click="clickCategoryRadioBtn" type="radio" class="btn-check" name="btnradio" id="Slang" autocomplete="off" checked="">
      <label class="btn btn-outline-primary" for="Slang">Slang</label>

      <input @click="clickCategoryRadioBtn" type="radio" class="btn-check" name="btnradio" id="Unknown" autocomplete="off" checked="">
      <label class="btn btn-outline-primary" for="Unknown">Unknown</label>
    </div> -->
  </div>

  <WordModal :word="wordOfInterest" />

  <CsvModal />

  <FavouriteModal :favourites="favourites" />

  <RandomModal :verbs="verbs" />

  <QuizModal :verbs="verbs" />

  <table class="table table-hover table-responsive table-striped table-sm">
    <thead>
      <tr>
        <th v-show="faveCol === 'Hide'">
          <img
            class="fa-icon gold-star fas fa-star"
            src="../assets/star-solid.svg"
            alt="Star icon"
          />
        </th>
        <th v-show="expanderCol === 'Hide'">
          <img
            class="fa-icon white-icon fa-solid fa-eye"
            src="../assets/eye-solid.svg"
          />
        </th>
        <th scope="col">English</th>
        <th scope="col">Amharic</th>
      </tr>
    </thead>
    <tbody v-for="word in filteredWords" :key="word._id">
      <tr class="table-active">
        <td v-show="faveCol === 'Hide'">
          <img
            @click="toggleFavourite"
            :id="word._id"
            class="fa-icon star-icon white-icon icon-action far fa-star"
            src="../assets/star-regular.svg"
            alt="Star icon"
          />
        </td>
        <td
          v-show="expanderCol === 'Hide'"
          data-bs-toggle="modal"
          data-bs-target="#viewModal"
        >
          <img
            @click="viewWord"
            :id="word._id"
            class="fa-icon white-icon icon-action fa-solid fa-up-right-and-down-left-from-center"
            src="../assets/up-right-and-down-left-from-center-solid.svg"
          />
        </td>
        <td>{{ word.english }}</td>
        <td>{{ word.amharic }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.gold-star {
  filter: invert(83%) sepia(44%) saturate(1278%) hue-rotate(356deg)
    brightness(98%) contrast(106%);
}

.fa-icon {
  height: 25px;
  width: 25px;
}

.white-icon {
  filter: invert(100%) sepia(4%) saturate(18%) hue-rotate(144deg)
    brightness(104%) contrast(100%);
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
  background: linear-gradient(
      45deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 43%,
      #000 45%,
      #000 55%,
      rgba(0, 0, 0, 0) 57%,
      rgba(0, 0, 0, 0) 100%
    ),
    linear-gradient(
      135deg,
      transparent 0%,
      transparent 43%,
      #000 45%,
      #000 55%,
      transparent 57%,
      transparent 100%
    );
}

input[type="search"]::-webkit-search-cancel-button:hover {
  cursor: pointer;
}
</style>
