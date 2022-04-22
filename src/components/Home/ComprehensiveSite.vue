<template>
  <div class="comprehensive-site">
    <div class="container">
      <div class="main-decription">
        <h2 class="main-section-title text-capitalize text-center">
          {{ $t("home.Comprehensive Site") }}
        </h2>
        <p class="text-center paragraph text-capitalize">
          {{ $t("home.Egyptian Medical") }}
        </p>
      </div>
      <div class="services text-center flex-wrap">
        <div class="row">
          <router-link
            :to="{ name: 'Jobs' }"
            class="router-link col-md-4 col-sm-6 col-lg"
          >
            <div class="content">
              <div class="box-container">
                <div class="photo-title m-auto">
                  <img
                    class="d-block m-auto"
                    src="@/assets/images/homee/icons/01.png"
                  />
                </div>
                <div class="decription-content text-center">
                  <h6 class="title text-capitalize">{{ $t("home.Jobs") }}</h6>
                  <p class="paragraph text-capitalize">
                    {{ $t("home.discription1") }}
                  </p>
                </div>
              </div>
            </div>
          </router-link>
          <router-link
            :to="{ name: 'Courses' }"
            class="router-link col-md-4 col-sm-6 col-lg"
          >
            <div class="content">
              <div class="box-container">
                <div class="photo-title m-auto">
                  <img
                    class="d-block m-auto"
                    src="@/assets/images/homee/icons/02.png"
                  />
                </div>
                <div class="decription-content text-center">
                  <h6 class="title text-capitalize">
                    {{ $t("home.courses") }}
                  </h6>
                  <p class="paragraph text-capitalize">
                    {{ $t("home.discription2") }}
                  </p>
                </div>
              </div>
            </div>
          </router-link>
          <router-link
            :to="{ name: 'Guide' }"
            class="router-link col-md-4 col-sm-6 col-lg"
          >
            <div class="content">
              <div class="box-container">
                <div class="photo-title m-auto">
                  <img
                    class="d-block m-auto"
                    src="@/assets/images/homee/icons/03.png"
                  />
                </div>
                <div class="decription-content text-center">
                  <h6 class="title text-capitalize">{{ $t("home.Guide") }}</h6>
                  <p class="paragraph text-capitalize">
                    {{ $t("home.discription3") }}
                  </p>
                </div>
              </div>
            </div>
          </router-link>
          <router-link
            :to="{ name: 'EventsAndNews' }"
            class="router-link col-md-4 col-sm-6 col-lg"
          >
            <div class="content">
              <div class="box-container">
                <div class="photo-title m-auto">
                  <img
                    class="d-block m-auto"
                    src="@/assets/images/homee/icons/04.png"
                  />
                </div>
                <div class="decription-content text-center">
                  <h6 class="title text-capitalize">{{ $t("home.event") }}</h6>
                  <p class="paragraph text-capitalize">
                    {{ $t("home.discription4") }}
                  </p>
                </div>
              </div>
            </div>
          </router-link>
          <router-link
            :to="{ name: 'EventsAndNews' }"
            class="router-link col-md-4 col-sm-6 col-lg"
          >
            <div class="content">
              <div class="box-container">
                <div class="photo-title m-auto">
                  <img
                    class="d-block m-auto"
                    src="@/assets/images/homee/icons/05.png"
                  />
                </div>
                <div class="decription-content text-center">
                  <h6 class="title text-capitalize">{{ $t("home.news") }}</h6>
                  <p class="paragraph text-capitalize">
                    {{ $t("home.discription5") }}
                  </p>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComprehensiveSite",
};
</script>

<style lang="scss" scoped>
.comprehensive-site {
  padding: 70px 0;
  .services {
    margin-top: 30px;

    .router-link {
      color: $textcolor;
      text-decoration: none;
      @media (min-width: 480px) and (max-width: 767px) {
        width: 50%;
      }
      @media (min-width: 320px) and (max-width: 480px) {
        width: 100%;
      }
    }
    .content {
      .box-container {
        cursor: pointer;
        box-shadow: $box-shadow;
        min-height: 220px;
        margin-bottom: 25px;
        border-radius: $radius;
        display: flex;
        flex-wrap: wrap;
        transition: $transition;
        &:hover {
          background-color: $bgcard;
        }
      }
    }
    .photo-title {
      width: 100px;
      padding: 10px;
      border-radius: 10px;
      img {
        width: 50px;
        height: 50px;
      }
      .title {
        margin: 10px 0 0;
        color: $secondcolor !important;
      }
    }
    .decription-content {
      width: 100%;
      .description {
        padding: 5px;
        color: $textcolor !important;
        margin: 0;
        font-size: 13px;
        line-height: 1.7;
      }
    }
  }
}
</style>
