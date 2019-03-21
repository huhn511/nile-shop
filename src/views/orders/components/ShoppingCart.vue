<template>
 <el-table
    :data="cart"
    stripe
    style="width: 100%">
     <el-table-column
   prop="details.name"
   label="Product Title">
    <template scope='scope'>
        {{ scope.row.data.title }}
    </template>
   </el-table-column>
  <el-table-column
   label="Price">
   <template scope='scope'>
    {{ scope.row.data.price }} {{ scope.row.data.currency }}
   </template>
  </el-table-column>
  <el-table-column
   prop="quantity"
   label="Quantity"></el-table-column>
  <el-table-column
      label="">
      <template scope="scope">
       <el-button type="success" icon="plus" @click='addToCart(scope.row)' size="mini"></el-button>
       <el-button type="danger" icon="minus" @click='removeFromCart(scope.row.data.id)' size="mini"></el-button>
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
      console.log("removeFromCart", id)
      console.log("this.$store.state.cart.items", this.$store.state.cart.items)

    this.$store.dispatch('RemoveFromCart', id)
      console.log("this.$store.state.cart.items after", this.$store.state.cart.items)
  },
  addToCart(product) {
        console.log("addToCart", product)
        this.$store.dispatch('AddToCart', product)
  }
 }
}
</script>