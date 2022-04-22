<template>
  <div class="logo-container">
    <img
      draggable="false"
      class="d-block logo"
      src="@/assets/images/logo/logo.png"
      alt="logo"
    />
  </div>
</template>

<script>
export default {
  name: "PhramaPreviewLogo",
};
</script>

<style lang="scss" scoped>
.logo-container {
  margin-bottom: 50px;
  box-shadow: 0 2px 6px -4px;
  padding: 0 0 20px;
  .logo {
    margin: 0 auto 40px;
    width: 120px;
    height: 120px;
    border-radius: 10px;
    box-shadow: $chat-shadow;
  }
}
</style>
