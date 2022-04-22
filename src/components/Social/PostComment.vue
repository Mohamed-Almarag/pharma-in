<template>
  <div>
    <div v-for="comment in comments" :key="comment.id">
      <span>{{ comment }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostComment",
  props: {
    comments: Array,
  },
};
</script>

<style lang="scss" scoped></style>
