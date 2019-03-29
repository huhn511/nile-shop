<template>
  <div class="main">
    <nav-bar></nav-bar>
    <div class="home-container">
        <h1>Welcome to the Nile Shop Manager</h1>
        <p>This is a proof of concept of the nile shop application, which stores product blueprints in the Tangle and managable via mam stream.</p>
        <p>
        <a href="https://nile.shopping/" target="_blank" rel="noopener">Nile</a>
        is a decentralized and commission-free shopping ecosystem that promotes local economies.
        </p>
        <h3>How it works</h3>

        <p>You can create products, each defined as an object and stores a MAM channel.</p>
        <p>Credentials are stored in the local database in your browser, so the key to publishes messages in the MAM channel is owned just by you.</p>
        <p>So there is no third party, which stores your secret information. It's all on your device!</p>
        <p>The value of the product attributes can be updaded via a new message in the MAM stream, which contains the changes.</p>
        <p>To fetch the actual information about the product, the application walks thourgh the whole messages of the MAM stream and builds the latest product with actual attributes values.</p>
        <a href="#/shop/shop">Test it and create an shop!</a>
        <div class="section section--use-case" id="use-cases">
          <div class="container">
            <el-row>
              <el-col :span="12">
                <h3 class="section-hero">Features</h3>
                <el-collapse v-model="activeNames" @change="handleChange">
                  <el-collapse-item name="1">
                    <template slot="title">
                      <span>
                        <span class="counter">1</span>All orders on a RFID Card
                      </span>
                    </template>
                    <div> The MAM root of an order can be written on an RFID card. With the READ function, you can scan a card and gets information about it through the messages in the MAM channel.</div>
                  </el-collapse-item>
                  <el-collapse-item name="2">
                    <template slot="title">
                      <span>
                        <span class="counter">2</span>Scan it, pack it, check it!
                      </span>
                    </template>
                    <div>All information gets displayed on the screen for packing the correct products. You can simply check the packed products like a todo list.</div>
                  </el-collapse-item>
                  <el-collapse-item name="3">
                    <template slot="title">
                      <span>
                        <span class="counter">3</span> Card rewards - support your local!
                      </span>
                    </template>
                    <div>The card will be delivered within the package. The buyer can collect those cards and gets a good discount in the local shop for exchange with 5 cards for example.</div>
                  </el-collapse-item>
                </el-collapse>
              </el-col>
              <el-col :span="12">
                <img alt="vendor" src="@/assets/customer-circled.jpg">
              </el-col>
            </el-row>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/Navbar/index";

export default {
  name: "home",
  components: {
    NavBar
  },
  data() {
    return {
      activeNames: ["1", "2", "3"]
    }
  },
  methods: {
    handleChange(val) {
      console.log(val);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.container {
  width: 1200px;
  margin: 0 auto;
}

.section {
  padding: 100px 0;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  background-color: var(--white);
  &-hero {
    margin-bottom: 30px;
  }
  &__light {
    background-color: #f5f8fa;
  }
  &__dark {
    background-color: var(--dark);
    color: var(--white);
  }
  &__primary {
    background-image: linear-gradient(
      to right bottom,
      #0b5d9e,
      #0074a9,
      #0089ae,
      #2e9db0,
      #5ab0b2
    );
    color: var(--white);
  }
  &__secondary {
    background-image: linear-gradient(
      to right bottom,
      #139b48,
      #48a84f,
      #69b558,
      #86c263,
      #a2cf6f
    );
    color: var(--white);
  }
}

.section--use-case {
  img {
    width: 500px;
  }
  hr {
    border-color: rgba(0, 0, 0, 0.05);
  }
  .flex-end {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
  }
}

.section--use-case {
  img {
    border-radius: 100%;
  }
  color: var(--dark);
}
.el-collapse {
  border: none;
  margin-left: 40px;
  .el-collapse-item__wrap {
    border-bottom: none;
  }
  .el-collapse-item {
    background-color: transparent;
    margin-bottom: 30px;
    &__header {
      position: relative;
      border: none;
      font-size: 24px;
      font-weight: 700;
      background-color: transparent;
      i {
        display: none;
      }
    }
    &__content {
      font-size: 16px;
      line-height: 1.5;
    }
    .counter {
      position: absolute;
      left: -40px;
      height: 40px;
      width: 40px;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--dark);
      background-color: rgba(0, 0, 0, 0.05);
      transition: all 200ms ease-in-out;
    }
    &.is-active {
      .counter {
        background-color: #69bae8;
        color: var(--white);
      }
    }
  }
}
</style>
