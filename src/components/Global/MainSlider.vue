<template>
  <div class="main-slider" v-if="sliders">
    <div
      id="carouselExampleCaptions"
      class="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="false"
    >
      <div class="carousel-inner">
        <div
          class="carousel-item"
          :class="{ active: index === 0 }"
          v-for="(img, index) in sliders"
          :key="img.id"
          :style="{ backgroundImage: `url(${img.cover_photo})` }"
        >
          <div class="carousel-caption d-block">
            <h6 class="titles text-uppercase">{{ img.address }}</h6>
            <!-- <p class="description text-capitalize">
              {{ img.description | justSpecificWords }}
            </p> -->
            <ul
              class="auother d-flex list-unstyled text-capitalize"
              v-if="img.name && img.date"
            >
              <li class="one" v-if="img.name">
                <span
                  >by / <span class="name">{{ img.name }}</span></span
                >
              </li>
              <li class="two" v-if="img.date">
                <span><fa class="icon" icon="circle" /> {{ img.date }}</span>
              </li>
            </ul>
            <p class="description text-capitalize">
              {{ img.description | justSpecificWords }}
            </p>
            <router-link
              class="details text-capitalize"
              :to="`/${details}/${img.id}`"
              >details</router-link
            >
          </div>

          <div class="buttons">
            <button
              @click="getDescrition(img.description)"
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <fa class="carousel-control-prev-icon" icon="chevron-left" />
            </button>
            <button
              @click="getDescrition(img.description)"
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <fa class="carousel-control-next-icon" icon="chevron-right" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- <div>{{ sliders[].description }}</div> -->
    <div class="test-text">{{ descripetionText }}</div>
  </div>
</template>

<script>
export default {
  name: "MainSlider",
  data() {
    return {
      descripetionText: "",
    };
  },

  props: {
    sliders: {
      type: Array,
    },
    details: {
      type: String,
    },
  },

  methods: {
    getDescrition(val) {
      this.descripetionText = val;
      // console.log(val);
    },
  },
};
</script>

<style lang="scss" scoped>
.test-text {
  padding: 30px 0;
  line-height: 2;
  color: $textcolor;
}
.main-slider {
  .carousel {
    .carousel-inner {
      // overflow: auto;
      box-shadow: $box-shadow;
      border-radius: 10px;
      padding: 10px;
      .carousel-item {
        height: 50vh;
        // object-fit: cover;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
        background-size: cover;
        background-position: center center;
        transition: 0.5s;
        transform: rotateX(90deg) scale(0);
        &.active {
          animation: reversRotate 0.5s linear forwards;
        }
        &::before {
          position: absolute;
          content: "";
          background-color: rgba($black, 0.4);
          width: 100%;
          height: 100%;
          inset: 0;
          z-index: 1;
        }
        .carousel-caption {
          text-align: unset !important;
          z-index: 4;
          left: 5% !important;
          right: 5% !important;
          .titles {
            color: $white;
            margin-bottom: 20px;
            font-weight: bold;
          }
          .description {
            font-weight: bold;
            font-size: 0.9rem;
            line-height: 2;
          }
          .details {
            color: $white;
            // border: 1px solid $maincolor;
            text-decoration: none;
            width: 140px;
            display: block;
            text-align: center;
            padding: 6px;
            border-radius: 5px;
            transition: $transition;
            background-color: $maincolor;
          }
        }
        .auother {
          gap: 30px;
          .icon {
            color: $maincolor;
          }
        }
      }
    }
    .buttons {
      .carousel-control-prev,
      .carousel-control-next {
        color: $maincolor !important;
        background-color: $white;
        width: 40px;
        height: 40px;
        bottom: 0;
        z-index: 2;
        opacity: 1;
        transition: 0.5s;
        &:hover,
        &:focus {
          color: $white !important;
          background-color: $maincolor;
        }
      }
      .carousel-control-next {
        top: calc(100% - 80px);
      }
      .carousel-control-prev {
        left: auto !important;
        right: 0;
        top: calc(100% - 40px);
      }
    }
  }
  .description-texts {
    padding: 30px 0;
    .text {
      color: $textcolor;
      line-height: 2;
    }
  }
}
@keyframes reversRotate {
  0% {
    transform: rotateX(90deg) scale(0);
  }
  50% {
    transform: rotateX(45deg) scale(0.5);
  }
  100% {
    transform: rotateX(0) scale(1);
  }
}
</style>
