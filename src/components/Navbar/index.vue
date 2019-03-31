<template>
  <nav class="main-nav">


    <router-link to="/" class="nav-item nav-item--logo" exact-active-class="active">
      <div class="logo"></div>
      <div class="logo-wrapper">
        <img alt="nile" class="logo logo-rotation-1" src="@/assets/logo_1.svg" />
        <img alt="nile" class="logo logo-rotation-2" src="@/assets/logo_1.svg" />
        <img alt="nile" class="logo logo-rotation-3" src="@/assets/logo_1.svg" />
        <img alt="nile" class="logo logo-rotation-4" src="@/assets/logo_1.svg" />
      </div>
      <img alt="nile typo" class="nile-typo" src="@/assets/nile_typo.svg"/>
    </router-link>


    <div class="nav-menu">
      <router-link to="/login" class="nav-item" active-class="active">
        <span>Demo Login</span>
      </router-link>
    </div>
  </nav>
</template>

<script>

export default {
};
</script>

<style lang="scss">
// ------------------------------------------
//  N A V I G A T I O N
// ------------------------------------------

.main-nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--white);
  box-shadow: 0 3px 6px rgba(0,0,0,.15);
  transition: all 200ms ease-in-out;
  .nav-menu {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .nav-item {
    position: relative;
    overflow: hidden;
    height: 100%;
    padding: 0 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: var(--dark);
    text-decoration: none;
    opacity: .75;
    transition: all 200ms ease-in-out;
    &--logo {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-left: 15px;
      padding-right: 15px;
      opacity: 1;
      .nile-typo {
        height: 32px;
        filter: invert(100%);
        transition: all 200ms ease-in-out;
      }
      .logo-wrapper {
        height: 40px;
        width: 40px;
        border-radius: 100px;
        margin-right: 20px;
        position: relative;
        filter: invert(100%);
        transition: all 200ms ease-in-out;
        img.logo {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          transition: all 200ms ease-in-out;
          &.logo-rotation-1 {
            opacity: 1 !important;
          }
          &.logo-rotation-2 {
            opacity: .1 !important;
          }
          &.logo-rotation-3 {
            opacity: .1 !important;
          }
          &.logo-rotation-4 {
            opacity: .1 !important;
          }
        }
      }

    }
    &:before {
      content: '';
      position: absolute;
      bottom: -5px;
      height: 10px;
      width: 0;
      border-radius: 10px;
      transition: all 200ms ease-in-out;
    }
    &:hover, &.active {
      opacity: 1;
      background-color: rgba(0,0,0,.05);
      color: var(--secondary-2);
      &:before {
        content: '';
        position: absolute;
        bottom: -5px;
        height: 10px;
        width: 50px;
        border-radius: 10px;
        background-color: var(--secondary-2);
      }
    }
    &:hover {
      cursor: pointer;
      &:before {
        width: 10px;
      }
    }
  }
  &.top {
    background-color: rgba(0,0,0,.1);
    box-shadow: none;
    .nav-item {
      color: var(--white);
      &--logo {
        .logo-wrapper {
          filter: invert(0%);
        }
        .nile-typo {
          filter: invert(0%);
        }
      }
      &:hover, &.active {
        background-color: rgba(255,255,255,.1);
      }
    }
  }
}


// ------------------------------------------
//  N A V I G A T I O N
// ------------------------------------------


img.logo.logo-rotation-2 {
  opacity: .2;
}

img.logo.logo-rotation-3 {
  opacity: .2;
}

img.logo.logo-rotation-4 {
  opacity: .2;
}

@-webkit-keyframes rotation-1 /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.logo-rotation-1 {
  -webkit-animation: rotation-1 10s linear infinite;
  -moz-animation: rotation-1 10s linear infinite;
  -ms-animation: rotation-1 10s linear infinite;
  -o-animation: rotation-1 10s linear infinite;
  animation: rotation-1 10s linear infinite;
}

@-webkit-keyframes rotation-2 /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.logo-rotation-2 {
  -webkit-animation: rotation-2 8s linear infinite;
  -moz-animation: rotation-2 8s linear infinite;
  -ms-animation: rotation-2 8s linear infinite;
  -o-animation: rotation-2 8s linear infinite;
  animation: rotation-2 8s linear infinite;
}


@-webkit-keyframes rotation-3 /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.logo-rotation-3 {
  -webkit-animation: rotation-3 6s linear infinite;
  -moz-animation: rotation-3 6s linear infinite;
  -ms-animation: rotation-3 6s linear infinite;
  -o-animation: rotation-3 6s linear infinite;
  animation: rotation-3 6s linear infinite;
}



@-webkit-keyframes rotation-4 /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.logo-rotation-4 {
  -webkit-animation: rotation-4 4s linear infinite;
  -moz-animation: rotation-4 4s linear infinite;
  -ms-animation: rotation-4 4s linear infinite;
  -o-animation: rotation-4 4s linear infinite;
  animation: rotation-4 4s linear infinite;
}


</style>
