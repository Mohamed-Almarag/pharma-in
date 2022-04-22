<template>
  <transition name="fade">
    <div
      v-if="showModal"
      class="
        confim-modal
        text-center
        d-flex
        justify-content-center
        align-items-center
      "
    >
      <div class="content">
        <div class="text text-capitalize">
          <slot name="message"></slot>
        </div>

        <div class="confimation-buttons">
          <slot name="sure"></slot>
          <slot name="cancel"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ConfirmModal",
  props: {
    showModal: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
.confim-modal {
  position: fixed;
  z-index: 9999 * 9999;
  inset: 0;
  background-color: rgba($black, 0.3);
  clip-path: circle(100%);

  .content {
    background-color: $white;
    min-width: 40%;
    height: 150px;
    border-radius: 10px;
    @media (min-width: 320px) and (max-width: 567px) {
      width: 300px;
      padding: 0 10px;
    }
    @media (min-width: 567px) and (max-width: 991px) {
      width: 400px;
      padding: 0 10px;
    }
    .text {
      margin: 20px 0;
    }
  }
}
.fade-enter,
.fade-leave-to {
  clip-path: circle(0);
}
.fade-enter-active,
.fade-leave-active {
  transition: clip-path 0.5s ease-in-out;
}
</style>
