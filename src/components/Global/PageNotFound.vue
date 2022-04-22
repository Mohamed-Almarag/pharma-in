<template>
  <div class="page-not-found view-padding">
    <div class="container">
      <div class="main-content">
        <h2 class="h1 text-center error-number">404</h2>
        <h6 class="error-words text-capitalize">opps! page not found</h6>
        <p class="error-message text-capitalize text-center">
          the page you are looking for dosn't exist , you may have mistyped the
          address or the page may have moved.
        </p>
        <router-link
          class="d-block details-button text-capitalize go-to-home-page"
          :to="{ name: 'Home' }"
          >home</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
  mounted() {
    let mainContent = document.querySelector(".main-content");
    window.onmousemove = function (e) {
      let x = e.clientX;
      let y = e.clientY;
      mainContent.style.backgroundPositionX = x + "px";
      mainContent.style.backgroundPositionY = y + "px";
      console.log();
    };
  },
};
</script>

<style lang="scss" scoped>
.page-not-found {
  .main-content {
    background: url("../../assets/images/404-error-page-not-found.webp")
      #1517298c;
    background-size: cover;
    color: $white;
    min-height: 50vh;
    padding: 30px 10px;
    box-shadow: $box-shadow;
    text-shadow: $text-shadow;
    border-radius: $radius;
    position: relative;
    &::before {
      position: absolute;
      content: "";
      inset: 0;
      width: 100%;
      height: 100%;
      background-color: rgba($black, 0.3);
    }
  }
  .error-number {
    font-weight: bold;
    font-size: 18vw;
    position: relative;
    z-index: 5;
  }
  .error-words {
    background-color: $white;
    width: fit-content;
    padding: 10px 20px;
    font-weight: bold;
    border-radius: 5px;
    color: $maincolor;
    margin: 20px auto;
    word-spacing: 3px;
    position: relative;
    z-index: 5;
  }
  .error-message {
    line-height: 2;
    word-spacing: 3px;
    margin: 30px 0;
    position: relative;
    z-index: 5;
  }
  .go-to-home-page {
    margin: 30px auto;
    text-decoration: none;
    background-color: $maincolor;
    text-align: center;
    position: relative;
    z-index: 5;
    &:hover {
      background-color: $secondcolor;
    }
  }
}
</style>
