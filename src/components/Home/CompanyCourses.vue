<template>
  <div class="company-courses">
    <div class="main-decription">
      <h2 class="main-section-title text-capitalize text-center">
        {{ $t("home.courses") }}
      </h2>
      <p class="text-center text-capitalize paragraph">
        {{ $t("home.Specialized Doctors") }}
      </p>
    </div>
    <div class="container">
      <div class="courses">
        <div class="photo">
          <img
            draggable="false"
            class="doctors w-100 h-100"
            src="@/assets/images/homee/06.png"
            alt=""
          />
        </div>
        <div
          class="
            part-one
            d-flex
            align-items-center
            justify-content-between
            flex-wrap
          "
        >
          <span class="course-items d-block">{{
            $t("home.Pediatrics Courses")
          }}</span>
          <span class="course-items d-block">{{
            $t("home.Dental Courses")
          }}</span>
          <span class="course-items d-block">{{
            $t("home.Orthopedics Courses")
          }}</span>
          <span class="course-items d-block">{{
            $t("home.Pediatrics Courses")
          }}</span>
          <span class="course-items d-block">{{
            $t("home.Dental Courses")
          }}</span>
          <span class="course-items d-block">{{
            $t("home.Orthopedics Courses")
          }}</span>
        </div>

        <button
          class="
            course-btn
            d-block
            details-button
            review-button
            text-capitalize
          "
        >
          <router-link class="router-link d-block" :to="{ name: 'Courses' }">{{
            $t("home.Get Your Course")
          }}</router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompanyCourses",
};
</script>

<style lang="scss" scoped>
.company-courses {
  padding-bottom: 70px;
  .courses {
    .part-one {
      gap: 25px;
      color: $textcolor;
      margin-bottom: 30px;
    }
    .photo {
      width: 250px;
      height: 250px;
      margin: 30px auto;
      border-radius: 50%;
      padding: 2px;
      box-shadow: $chat-shadow;
      overflow: hidden;
      .doctors {
        object-fit: cover;
        transition: $transition;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>
