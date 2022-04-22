<template>
  <div class="friends-page view-padding">
    <Loading :loading="loading"></Loading>
    <div class="container">
      <div class="all-friends">
        <EmptySection v-if="myRequests.length < 1">
          <template #message>
            <span>{{ $t("social.you did not send any requests") }}</span>
          </template>
        </EmptySection>
        <transition name="fade">
          <ConfirmModal v-if="showConfirm" :showModal="showConfirm">
            <template #message>
              <p class="paragraph">
                {{ $t("social.are you sure you want delete it") }}
              </p>
            </template>
            <template #sure>
              <div class="d-flex confirm-container-buttons">
                <button
                  @click="deleteMyRequest(requestFreindId)"
                  class="
                    details-button
                    confirm-btn-ok confirm-btn-cancel
                    text-capitalize
                    d-block
                  "
                >
                  {{ $t("social.delete") }}
                </button>
                <button
                  @click="showConfirmModal"
                  class="details-button confirm-btn-ok text-capitalize d-block"
                >
                  {{ $t("social.cancel") }}
                </button>
              </div>
            </template>
          </ConfirmModal>
        </transition>
        <div class="row">
          <div
            class="friend-card col-md-4 col-lg-3 col-sm-6"
            v-for="user in myRequests"
            :key="user.id"
          >
            <div class="card-container overflow-hidden">
              <div class="photo">
                <img
                  v-if="user.friends.image"
                  class="img w-100 h-100"
                  :src="user.friends.image"
                  :alt="user.friends.name"
                />
                <img
                  v-else
                  class="img w-100 h-100"
                  src="../../assets/images/default.png"
                  alt="freind"
                />
              </div>
              <div class="content">
                <h6 class="name text-capitalize">{{ user.friends.name }}</h6>
                <button
                  @click="getFreindId(user.id)"
                  class="add-friend d-block delete text-capitalize"
                >
                  {{ $t("social.delete") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MyRequests",
  data() {
    return {
      loading: false,
      showConfirm: false,
      freind_id: null,
      deleteRequest: {
        status: "rejected",
        _method: "PUT",
      },
    };
  },
  computed: {
    ...mapState({
      myRequests: (state) => state.SocialModule.myRequests,
    }),
    requestFreindId() {
      return this.freind_id;
    },
  },
  mounted() {
    this.getAllMyRequests();
  },
  methods: {
    getAllMyRequests() {
      this.loading = true;
      this.$store.dispatch("SocialModule/myRequests").finally(() => {
        this.loading = false;
      });
    },
    deleteMyRequest(id) {
      this.loading = true;
      this.$store
        .dispatch("SocialModule/deleteMyRequest", id)
        .then(() => {
          this.showConfirm = false;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    showConfirmModal() {
      this.showConfirm = !this.showConfirm;
      this.freind_id = null;
    },
    getFreindId(id) {
      this.freind_id = id;
      this.showConfirm = !this.showConfirm;
    },
  },
};
</script>

<style lang="scss" scoped>
.friends-page {
  .all-friends {
    .card-container {
      transition: $transition;
      border: 1px solid $bordercolor;
      border-radius: $radius;
      margin-bottom: 30px;
      &:hover {
        .img {
          transform: scale(1.1);
          filter: contrast(1);
        }
      }
      .photo {
        height: 200px;
        overflow: hidden;
        .img {
          transition: $transition;
          filter: contrast(0.7);
        }
      }
      .content {
        .name {
          color: $textcolor;
          padding: 10px 5px;
        }
        .add-friend {
          border: none;
          background-color: $bgcard;
          color: $textcolor;
          width: 70%;
          padding: 8px;
          border-radius: $radius - 2px;
          margin: 0 auto 13px;
          transition: $transition;
          &:hover {
            color: $white;
            background-color: $maincolor;
          }
          &.delete {
            &:hover {
              color: $white;
              background-color: $cancel;
            }
          }
        }
      }
    }
  }
}
</style>
