<template>
  <div class="app-container" v-loading="loading">
    <div v-if="!published">
      <router-link to="/shop/shop">Create your shop first!</router-link>
    </div>
    <el-form v-if="published" ref="form" :model="form" label-width="120px">
      <el-form-item label="Title">
        <el-input v-model="form.title" placeholder="Product title"/>
      </el-form-item>
      <el-form-item label="Description:">
        <el-input
          v-model="form.desc"
          :rows="5"
          type="textarea"
          class="product-textarea"
          autosize
          placeholder="Product description"
        />
        <span
          v-show="descriptionLength"
          class="word-counter"
        >{{ descriptionLength }} Chars (1000 Max)</span>
      </el-form-item>
      <el-form-item label="Price">
        <el-col :span="19">
          <el-input type="number" v-model="form.price" step="any" placeholder="1000"></el-input>
        </el-col>
        <el-col :span="5">
          <el-select v-model="form.currency" placeholder="choose currency">
            <el-option label="Euro" value="euro"></el-option>
            <el-option label="IOTA" value="iota"></el-option>
          </el-select>
        </el-col>
      </el-form-item>

      <el-form-item label="Location">
        <LocationChooseMap @update="updateIac"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
      <el-row></el-row>
    </el-form>
  </div>
</template>

<script>
import {
  createProductChannel,
  generateSeed,
  appendAttributesUpdate
} from "@/utils/MAM";

import LocationChooseMap from "@/components/LocationChooseMap";

export default {
  components: { LocationChooseMap },
  data() {
    return {
      shop: {},
      next_id: 0,
      products: [],
      loading: false,
      published: false,
      form: {
        title: "",
        desc: ""
      }
    };
  },
  computed: {
    descriptionLength() {
      return this.form.desc.length;
    },
    calculateIac() {}
  },
  methods: {
    loadProducts() {
      let _products = localStorage.getItem("products") || "[]";
      this.products = JSON.parse(_products);
      if (this.products.length) {
        this.next_id = this.products.length + 1;
      } else {
        this.next_id = 1;
      }
    },
    createProduct: async function(product) {
      this.loading = true;

      let seed = generateSeed();

      let response = await createProductChannel(product, seed);

      response.seed = seed;

      this.products.push(response);
      let parsed = JSON.stringify(this.products);
      localStorage.setItem("products", parsed);
      this.loadProducts();

      // save product in shop details
      let shop_detals_object = {
        product: response.root
      };

      let shop_response = await appendAttributesUpdate(
        shop_detals_object,
        "add_blueprint",
        this.shop.catalog_seed,
        this.shop.catalog_next_root,
        this.shop.catalog_start
      );

      // save new shop secrets in database
      this.shop.catalog_start = shop_response.start;
      this.shop.catalog_next_root = shop_response.next_root;

      parsed = JSON.stringify(this.shop);

      localStorage.setItem("shop", parsed);

      this.loading = false;

      this.$notify({
        title: "Sucecss",
        message: `Product ${this.form.title} created!`,
        type: "success",
        duration: 2000
      });
      this.form = {
        title: "",
        desc: ""
      };
      this.$router.push("/products");
    },
    onSubmit() {
      this.form.id = this.next_id;
      if (this.iac && this.showMap) {
        this.form.iac = this.iac;
      }
      this.createProduct(this.form);
    },
    onCancel() {
      this.$router.push("/products");
    },
    updateIac(newIac) {
      this.form.iac = newIac
    }
  },
  mounted() {
    // fetch seed from database
    let shop_string = localStorage.getItem("shop") || "{}";
    this.shop = JSON.parse(shop_string);
    this.published = JSON.stringify(this.shop) !== "{}";

    console.log("loaded shop", this.shop);
    this.loadProducts();
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
