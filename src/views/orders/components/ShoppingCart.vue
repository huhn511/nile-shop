<template>
 <el-table
    :data="cart"
    stripe
    style="width: 100%">
     <el-table-column
   prop="details.name"
   label="Product Title">
    <template scope='scope'>
        {{ scope.row.item.data.title }}
    </template>
   </el-table-column>
  <el-table-column
   label="Price">
   <template scope='scope'>
    {{ scope.row.item.data.price }} {{ scope.row.item.data.currency }}
   </template>
  </el-table-column>
  <el-table-column
   prop="quantity"
   label="Quantity"></el-table-column>
  <el-table-column
      label="">
      <template scope="scope">
       <el-button type="success" icon="el-icon-plus" @click='addToCart(scope.row.item)' size="mini"></el-button>
       <el-button type="danger" icon="el-icon-minus" @click='removeFromCart(scope.row.item.data.id)' size="mini"></el-button>
      </template>
     </el-table-column>
 </el-table>
</template>
<script>
export default {
 computed: {
  cart() {
   return this.$store.state.cart.items
  }
 },
 methods: {
  removeFromCart(id) {
    this.$store.dispatch('RemoveFromCart', id)
  },
  addToCart(product) {
    this.$store.dispatch('AddToCart', product)
  }
 }
}
</script>