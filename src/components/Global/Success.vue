<template>
  <div
    v-if="success"
    class="
      success-alerts
      clip-path
      alert
      text-capitalize
      alert-success alert-dismissible
      fade
      show
    "
    role="alert"
  >
    <slot name="success"></slot>
  </div>
</template>

<script>
export default {
  name: "Success",
  props: ["success"],
};
</script>

<style lang="scss" scoped></style>
