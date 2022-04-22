<template>
  <div
    v-if="error"
    class="
      errors-alerts
      clip-path
      alert
      text-capitalize
      alert-danger alert-dismissible
      fade
      show
    "
    role="alert"
  >
    <slot name="errors"></slot>
  </div>
</template>

<script>
export default {
  name: "Errors",
  props: ["error"],
};
</script>

<style lang="scss" scoped></style>
