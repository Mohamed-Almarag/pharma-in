<template>
  <transition name="fade">
    <div class="chatt clip-path">
      <h3>hello Chat</h3>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Chat",
  props: {
    showChatt: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped></style>
