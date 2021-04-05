<template>
  <div>
    <div v-if="data && data.length===0">
      <p class="products_none">Упс.. По заданным фильтрам ничего не найдено :( </p>
    </div>
    <div v-else class="table_wrapper">
      <table>
        <thead>
        <tr>
          <th>
            Название
          </th>
          <th>
            Цена
          </th>
          <th class="products_item_m_header">
            Производитель
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item of this.data" :key="item.i" class="products_item_line">
          <td>
            {{ item.t }}
          </td>
          <td>
            {{ item.p }}р.
          </td>
          <td class="products_item_m">
            {{ item.m }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>


export default {
  name: "Products",
  props: ['data'],
}
</script>

<style scoped>
.products_item_line td {
  min-width: 150px;
}
.table_wrapper th{
  text-align: left;
}

.products_none {
  color: rgba(0, 0, 0, .7);
  font-size: 20px;
  text-align: center;
  font-weight: lighter;
}

@media screen and (max-width: 700px) {
  .products_none {
    font-size: 50px;
  }
  .products_item_line td {
    max-width: 500px;
/*
    word-break: break-all;
*/
  }
  .table_wrapper {
    font-size: 40px;
  }
  .products_item_m_header{
    display: none;
  }
  .products_item_m{
    display: none;
  }
}
</style>