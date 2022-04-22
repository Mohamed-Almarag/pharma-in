<template>
  <div class="description-page">
    <div class="container">
      <slot name="title"></slot>
    </div>
    <div :class="['decription', `decription-${bgImage}`]"></div>
  </div>
</template>

<script>
export default {
  name: "DescriptionPages",
  props: {
    bgImage: {
      type: String,
      required: false,
      default: "defaultImage",
      validator: function (value) {
        return (
          [
            "defaultImage",
            "coursesImage",
            "guideImage",
            "jobsImage",
            "eventImage",
            "newsImage",
            "about",
          ].indexOf(value) !== -1
        );
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.description-page {
  overflow: hidden;
  height: 70vh;
  position: relative;
  display: flex;
  align-items: center;
  &::before {
    position: absolute;
    content: "";
    background-color: rgba($black, 0.4);
    width: 100%;
    height: 100%;
    inset: 0;
    z-index: 1;
  }
  .title-page {
    position: relative;
    z-index: 2;
    color: $maincolor;
    margin-left: 30px;
    font: {
      size: 4rem;
      weight: bold;
    }
  }
  .decription {
    background-image: url("../../assets/images/DescriptionPages/event-news.png");
    background-size: cover;
    background-position: center center;
    width: 100%;
    height: 100%;
    inset: 0;
    position: absolute;
    transition: 1s;
    transform: scale(1);
    animation: zoom-in-out 7s linear infinite;
    &-coursesImage {
      background-image: url("../../assets/images/DescriptionPages/courses.png");
    }
    &-guideImage {
      background-image: url("../../assets/images/DescriptionPages/guide.png");
    }
    &-jobsImage {
      background-image: url("../../assets/images/DescriptionPages/jobs.png");
    }
    &-eventImage {
      background-image: url("../../assets/images/DescriptionPages/events.png");
    }
    &-newsImage {
      background-image: url("../../assets/images/DescriptionPages/news.png");
    }
    &-about {
      background-image: url("../../assets/images/DescriptionPages/about.png");
    }
  }
}
@keyframes zoom-in-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
