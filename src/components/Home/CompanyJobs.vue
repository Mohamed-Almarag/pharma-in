<template>
  <div class="company-jobs">
    <div class="main-decription">
      <h2 class="main-section-title text-capitalize text-center">
        {{ $t("home.Jobs") }}
      </h2>
      <p class="text-center text-capitalize paragraph description">
        {{ $t("home.Hundreds") }}
      </p>
    </div>
    <div class="container">
      <div class="description">
        <div class="row">
          <div class="part-one col-md-5">
            <div class="details">
              <h5 class="text-capitalize">{{ $t("home.Waiting") }}</h5>
              <p class="text-capitalize">
                {{ $t("home.Through") }}
              </p>
              <ul class="job-lists list-unstyled">
                <li class="job">
                  <fa class="job-icon" icon="check" /><span class="job-text">
                    {{ $t("home.Pharmaceutical Companies") }}
                  </span>
                </li>
                <li class="job">
                  <fa class="job-icon" icon="check" /><span class="job-text">{{
                    $t("home.Public And Private")
                  }}</span>
                </li>
                <li class="job">
                  <fa class="job-icon" icon="check" /><span class="job-text">{{
                    $t("home.Medical Charity")
                  }}</span>
                </li>
                <li class="job">
                  <fa class="job-icon" icon="check" /><span class="job-text">{{
                    $t("home.Clinics Jobs")
                  }}</span>
                </li>
              </ul>
              <div class="get-job">
                <button class="details-button review-button text-capitalize">
                  <router-link
                    class="router-link d-block"
                    :to="{ name: 'Jobs' }"
                    >{{ $t("home.get your job") }}</router-link
                  >
                </button>
              </div>
            </div>
          </div>
          <div class="part-two col-md-7">
            <div class="img-container">
              <img
                draggable="false"
                class="w-100"
                src="@/assets/images/homee/02.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompanyJobs",
};
</script>

<style lang="scss" scoped>
.company-jobs {
  padding-bottom: 70px;
  .main-decription {
    .main-title {
      @extend %mainTitle;
    }
    .description {
      margin-bottom: 30px;
    }
  }
  .description {
    .part-one {
      position: relative;
      display: flex;
      align-items: center;
      .details {
        position: absolute;
        width: 120%;
        height: 90%;
        top: 5%;
        border-radius: 10px;
        background-color: $white;
        padding: 30px;
        box-shadow: $chat-shadow;
        @media (min-width: 320px) and (max-width: 768px) {
          position: relative;
          width: 100%;
          height: 100%;
          top: unset;
          margin-bottom: 30px;
          padding: 0;
          box-shadow: unset;
        }
        h5 {
          font-size: 1.1rem;
          font-weight: bold;
          color: $maincolor;
          text-shadow: $text-shadow;
          span {
            color: $secondcolor;
          }
        }
        p {
          margin: 20px 0;
          color: $textcolor;
        }
        .job-lists {
          .job {
            margin-bottom: 20px;
            .job-text {
              margin: 0 10px;
              color: $textcolor;
            }
          }
          .job-icon {
            color: $secondcolor;
          }
        }
      }
    }
    .part-two {
      .img-container {
        img {
          border-radius: 10px;
          height: 100%;
          object-fit: cover;
          max-height: 550px;
          @media (min-width: 320px) and (max-width: 767px) {
            max-height: 500px;
          }
        }
      }
    }
  }
}
</style>
