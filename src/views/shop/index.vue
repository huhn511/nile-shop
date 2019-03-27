<template>
  <div class="shop">
    <div v-if="!published">
        <h2>Publish shop</h2>
        <create-shop published: false />
    </div>
    <div v-if="published">
        <shop-details :details="{shop}" />
        <h2>Update shop</h2>
        <update-shop published: true />
    </div>
  </div>
</template>

<script>
import ShopDetails from "./components/ShopDetails";
import CreateShop from "./components/CreateShop";
import UpdateShop from "./components/UpdateShop";

export default {
  name: "Shop",
  components: { ShopDetails, CreateShop, UpdateShop },
  data() {
    return {
      shop: {},
      published: false
    };
  },
  created() {
    // fetch products from database
    let shop_string = localStorage.getItem("shop") || "{}";
    this.shop = JSON.parse(shop_string);
    console.log("shopp?", this.shop);
    
    this.published = JSON.stringify(this.shop) !== '{}'


  }
};
</script>
