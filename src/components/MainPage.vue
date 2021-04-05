<template>
  <div class="main-page_wrapper">
    <div class="main-page">
      <h1>Магазины</h1>
      <div v-for="shop of dataShops" :key="shop.shop_id" class="main-page_shops">
        <router-link :to="{name:'shop', params:{shopId:shop.shop_id}}" class="main-page_shop">
          {{ shop.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import data from "../data.json"

export default {
  name: "MainPage",
  data() {
    return {
      dataShops: data
    }
  },
}
</script>

<style scoped>

h1 {
  margin: 0;
  padding: 20px 0;
  text-align: center;
  color: #B32424;
}
.main-page_wrapper{
  background: rgba(179, 36, 36, .8);
}
.main-page_shops {
  margin: 0 30px;
  padding: 15px 0;
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, .3);
}

.main-page {
  max-width: 80%;
  margin: 0 auto;
  min-width: 250px;
  -webkit-box-shadow: 4px 4px 29px 0 rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 4px 4px 29px 0 rgba(34, 60, 80, 0.2);
  box-shadow: 4px 4px 29px 0 rgba(34, 60, 80, 0.2);
  background: white;

}

.main-page_shop {
  color: black;
  font-size: 16px;
  text-decoration: none;
  display: inline-block;
  margin-left: 10px;
}

.main-page_shops:hover {
  background: #e7e3e3;
  text-decoration: none;
}

@media screen and (max-width: 700px) {
  .main-page_shop,
  h1{
    font-size: 50px;
  }
  .main-page{
    max-width: 100%;
  }

}
</style>