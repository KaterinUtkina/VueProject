<template>
  <div>
    <div class="wrapper_filters_content_mobile">
      <div v-if="checkedFilters[nameData].length>=2" class="filter_wrapper">
        <p class="header_filter"> Выбранные фильтры</p>
        <div v-for="checkedFilter of checkedFilters[nameData]" :key="checkedFilter.i">
          <div class="checkedFilter_item" v-if="checkedFilter.name!=='p'">
            {{ filtersNames[checkedFilter.name] }} : {{ checkedFilter.value }}
            <button v-on:click="()=>clickCheckboxFilter(checkedFilter.name, checkedFilter.value)">
              Х
            </button>
          </div>
        </div>
      </div>
      <div v-for="filter of this.filters" :key="filter.i">
        <div>
          <div class="filter_wrapper">
            <p class="header_filter">{{ filtersNames[filter.name] }}</p>
            <div class="filter">
              <div v-for="item of filter.value" :key="filter.value.indexOf(item)">
                <label class="filter_item">
                  <input type="checkbox" :checked="checkedFilters[nameData].some(check => check.value === item)"
                         @change="clickCheckboxFilter(filter.name, item)">{{ item }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="filter_wrapper filter_price">
        <div>
          <p class="header_filter">Цена</p>
          <div>
            <label class="filter_item">
              От <input type="text" class="filter_price_ite_input"
                        v-model="price.down">
            </label>
            <label class="filter_item">
              До <input type="text" class="filter_price_ite_input"
                        v-model="price.up">
            </label>
            <button class="filter_wrapper_price_btn"
                    v-on:click="()=>clickCheckboxFilterPrice(price.down, price.up)">Применить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Filters",
  props: ['filters', 'nameData'],
  data() {
    return {
      price: {
        down: "",
        up: ""
      },
      checkedFilters: {
        draft: [
          {
            name: "p",
            value: [null, null]
          },
        ],
        bottles: [
          {
            name: "p",
            value: [null, null]
          },
        ]
      },
      filtersNames: {
        s: "Стиль",
        d: "Объем",
        a: "Алкоголь",
        m: "Производитель"
      }
    }
  },
  methods: {
    clickCheckboxFilter(name, value) {
      this.checkedFilters[this.nameData] = this.checkedFilters[this.nameData].some(filter => (filter.name === name && filter.value === value)) ?
          this.checkedFilters[this.nameData].filter(filter => filter.value !== value)
          : [...this.checkedFilters[this.nameData], {name: name, value: value}]
      this.filteringData()
    },
    clickCheckboxFilterPrice(price_down, price_up) {
      if (price_down === "") {
        if (price_up === "") {
          this.clickCheckboxPrice(this.nameData, null, null)
        } else {
          this.clickCheckboxPrice(this.nameData, null, price_up)
        }
      } else {
        if (price_up === "") {
          this.clickCheckboxPrice(this.nameData, price_down, null)
        } else {
          this.clickCheckboxPrice(this.nameData, price_down, price_up)
        }
      }
      this.filteringData()
    },
    clickCheckboxPrice(nameData, value_down, value_up) {
      this.checkedFilters[nameData].map(item => {
        if (item.name === "p") {
          item.value[0] = value_down
          item.value[1] = value_up
        }
      })
    },
    filteringData() {
      this.$emit('filteringData', this.nameData, this.checkedFilters[this.nameData])
    }
  }
}
</script>

<style scoped>

.header_filter {
  padding-top: 15px;
  margin-left: 20px;
  margin-bottom: 10px;
  font-size: 18px;
  color: #b32424;
}

.filter_wrapper,
.filter {
  background: white;
}

.filter {
  height: 150px;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: 2px;
}

::-webkit-scrollbar {
  width: 7px;
  height: 8px;
  background-color: #FFF;
}

::-webkit-scrollbar-thumb {
  background-color: #b32424;
  border-radius: 2em;
  box-shadow: inset 1px 1px 10px #f3faf7;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(179, 36, 36, .5)
}

.filter_item {
  display: flex;
  margin: 10px 0 10px 20px;
}

.filter_wrapper_price_btn {
  width: 90px;
  display: block;
  margin: 10px auto 0;
  text-align: center;
  background: #B32424;
  border: 1px solid #B32424;
  color: #FFFFFF;
  cursor: pointer;
}

.filter_wrapper_price_btn:hover {
  background: rgba(179, 36, 36, .6);
  border: 1px solid rgba(179, 36, 36, .6);
}

.filter_wrapper_price_btn:active {
  background: rgba(102, 20, 20, 0.6);
  border: 1px solid rgba(102, 20, 20, 0.6);
}

.filter_wrapper_price_btn:focus {
  border: 2px solid rgba(102, 20, 20, 0.6);
}

.filter_price_ite_input {
  margin-left: 5px;
  width: 50%;
}

.filter_price {
  padding-bottom: 10px;
}

.filter_item_price input {
  width: 80px;
}

.checkedFilter_item {
  display: inline-block;
  margin: 0 5px 5px 20px;
  padding: 3px;
  border: 1px solid #5e5e5e;
  border-radius: 10px;
}

.checkedFilter_item button {
  color: #5e5e5e;
  margin-left: 5px;
  border-left: 1px solid #5e5e5e;
  cursor: pointer;
  background: none;
}

.checkedFilter_item button:focus {
  border: 1px solid black;
}

button {
  outline: none;
  border: none;
}

.modal_filter_wrapper {

}

@media screen and (max-width: 700px) {
  .filter_wrapper {
    font-size: 40px;
  }

  .header_filter,
  .filter_price_ite_input{
    font-size: 40px;
  }

  .filter_wrapper_price_btn {
    width: 270px;
    font-size: 40px;
  }

  .wrapper_filters_content_mobile {
    width: 650px;
    box-sizing: border-box;
    padding: 10px 25px;
    background: rgb(179, 36, 36);
  }
}
</style>