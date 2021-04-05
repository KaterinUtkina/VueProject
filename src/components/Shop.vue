<template>
  <div class="shop_wrapper">
    <div v-if="loader===false" class="shop_wrapper_flex">
      <div class="shop_wrapper_back_container">
        <router-link :to="{name:'main_page'}" class="shop_wrapper_button-back">
          Назад к списку магазинов
        </router-link>
        <button class="show_filters_btn" v-on:click="changeShowFilters">
          <div v-if="!showFilters">
            Показать фильтры
          </div>
          <div v-else>
            Скрыть фильтры
          </div>
        </button>
        <div class="wrappers_shop_filters">
          <Filters v-bind:filters="filters.filter_draft"
                   v-if="checkedDataDraft" v-bind:nameData="'draft'"
                   v-on:filteringData="filteringData"
                   v-bind:class="{show_filters_content_selected:showFilters}"
                   class="show_filters_content"/>
          <Filters v-bind:filters="filters.filter_bottles"
                   v-if="checkedDataBottles" v-bind:nameData="'bottles'"
                   v-on:filteringData="filteringData"
                   v-bind:class="{show_filters_content_selected:showFilters}"
                   class="show_filters_content"/>
        </div>
      </div>
      <div class="shop_wrapper_content">
        <nav class="shop_wrapper_content_button-change-data">
          <div class="shop_wrapper_content_change-data_item">Ассортимент</div>
          <button v-on:click="() => changeData('draft')"
                  v-bind:class="{active:checkedDataDraft}"
                  class="shop_wrapper_content_button-change-data_item">на розлив
          </button>
          <button v-on:click="() => changeData('bottles')"
                  v-bind:class="{active:checkedDataBottles}"
                  class="shop_wrapper_content_button-change-data_item">в таре
          </button>
        </nav>
        <hr/>
        <Products v-bind:data="shopIdData.draft"
                  v-if="checkedDataDraft"/>
        <Products v-bind:data="shopIdData.bottles"
                  v-if="checkedDataBottles"/>
      </div>
    </div>
    <div v-if="loader===true" class="shop_wrapper_preloader">
      <img src="./preloader.gif" alt="preloader" width="100"/>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import getFilters from "./utility/getFiltres"
import Filters from "./Filters";
import Products from "./Products";
import {filtering} from "./utility/filteringData";
import {filteringPrice} from "./utility/filteringData";

export default {
  name: "Shop",
  components: {Products, Filters},
  data() {
    return {
      id: this.$route.params.shopId,
      shopIdData: {},
      checkedDataDraft: true,
      checkedDataBottles: false,
      filters: {},
      loader: false,
      dataContainer: {},
      showFilters: false
    }
  },
  methods: {
    changeData(data) {
      if (data === "draft") {
        this.checkedDataDraft = true
        this.checkedDataBottles = false
      } else {
        this.checkedDataDraft = false
        this.checkedDataBottles = true
      }
    },
    getDataShop() {
      this.loader = true
      axios
          .get('/stock/get/?shop_id=' + `${this.id}`, {
                headers: {
                  "Accept": "application/json"
                }
              }
          )
          .then(response => {
            this.dataContainer = {...response.data.data}
            this.shopIdData = {...response.data.data}
          })
          .then(() => this.filters = getFilters(this.shopIdData))
          .then(() => this.loader = false)
    },
    filteringData(name, checkedFilters) {
      this.shopIdData[name] = this.dataContainer[name].filter(obj => filteringPrice(obj, checkedFilters[0]))
      for (let i = 0; i < this.filters.filter_bottles.length; i++) {
        this.shopIdData[name] = this.shopIdData[name].filter(obj => filtering(obj, i, checkedFilters, this.filters.filter_bottles[i].name)
        )
      }
    },
    changeShowFilters() {
      this.showFilters ? this.showFilters = false : this.showFilters = true
    },
  },
  mounted() {
    this.getDataShop()
  }
}
</script>

<style scoped>
.shop_wrapper_preloader {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  transform: translateX(-50px) translateY(-50px);
}

.shop_wrapper_back_container {
  width: 20%;
  min-width: 150px;
  margin: 0 auto;
}

.shop_wrapper {
  background: rgba(179, 36, 36, .8);
}

.shop_wrapper_flex {
  display: flex;
  min-width: 600px;
  justify-content: flex-start;
}

.shop_wrapper_button-back {
  display: inline-block;
  text-align: center;
  text-decoration: none;
  color: white;
  font-size: 12px;
  padding: 20px 0 10px;
  left: 10px;
}

.shop_wrapper_content {
  width: 70%;
  margin: 0 auto;
  padding: 0 0 20px 20px;
  background: white;
  min-width: 580px;
}

.shop_wrapper_content_button-change-data {
  padding: 20px 0;
}

.shop_wrapper_content_button-change-data_item {
  cursor: pointer;
  font-size: 26px;
  font-weight: bold;
  color: rgba(0, 0, 0, .5);
  text-decoration: underline;
  background: none;
  display: inline-block;
}

.shop_wrapper_content_change-data_item {
  display: inline-block;
  cursor: pointer;
  font-size: 26px;
  font-weight: bold;
  color: rgb(179, 36, 36);
}

button {
  outline: none;
  border: none;
}

.show_filters_btn {
  display: none;
  padding: 0;
}

.active {
  color: rgb(179, 36, 36);
}


@media screen and (max-width: 700px) {
  .shop_wrapper_flex {
    display: block;
  }

  .shop_wrapper,
  .shop_wrapper_content_change-data_item,
  .shop_wrapper_content_button-change-data_item,
  .shop_wrapper_button-back{
    font-size: 50px;
  }


  .show_filters_content {
    display: none;
  }

  .show_filters_content_selected {
    position: absolute;
    display: block;
  }

  .shop_wrapper_back_container,
  .shop_wrapper_content {
    width: 650px;
  }

  .show_filters_btn {
    display: block;
    font-size: 50px;
    background: none;
    color: #FFFFFF;
    cursor: pointer;
  }

  .show_filters_btn:focus {
    border: 2px solid rgba(102, 20, 20, 0.6);
  }
}

</style>