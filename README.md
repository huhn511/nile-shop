# Nile Store

> A decentralized, commission-free, local-economy focused online shopping platform.

<p align="center">
  <img width="320" src="https://pbs.twimg.com/profile_images/1096368536874876928/q_ELdaDf_400x400.png">
</p>

<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.5.17-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/ElemeFE/element">
    <img src="https://img.shields.io/badge/element--ui-2.4.11-brightgreen.svg" alt="element-ui">
  </a>
</p>

## Demo

The demo application is hosted on Heroku on a free plan, so it might need to load a bit longer for the first visit.
[Try the demo!](https://nile-shop.herokuapp.com)


## Introduction

The basis of the services we provide are the vendors that provide their products and services digitally. 

The vendor uses the Nile Shop application to manage all things related to the shop.

This project is based on [vue-element-admin](http://panjiachen.github.io/vue-element-admin). This is a front-end management background integration solution. It based on [vue](https://github.com/vuejs/vue) and use the UI Toolkit [element](https://github.com/ElemeFE/element).

## Build Setup

```bash
# Clone project
git clone https://github.com/huhn511/nile-shop

# Install dependencies
npm install

# Serve with hot reload at localhost:9528
npm run dev

# Build for production with minification
npm run build

# Build for production and view the bundle analyzer report
npm run build --report
```

### Docker

```bash
# Build the container
docker build -t nile/shop .

# Run the app
docker run -p 8080:8080 nile/shop
``` 