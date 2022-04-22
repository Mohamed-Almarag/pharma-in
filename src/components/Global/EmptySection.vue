<template>
  <div
    class="
      empty
      d-flex
      align-items-center
      justify-content-center
      text-capitalize
    "
  >
    <p class="paragraph">
      <slot name="message"></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: "EmptySection",
};
</script>

<style lang="scss" scoped>
.empty {
  height: 400px;
  p {
    font-size: 2rem;
    font-weight: bold;
  }
}
</style>
