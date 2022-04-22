<template>
  <div class="friends-page view-padding">
    <Loading :loading="loading"></Loading>
    <div class="container">
      <div class="all-friends">
        <EmptySection v-if="freindsRequests.length < 1">
          <template #message>
            <span>you don't have any requests</span>
          </template>
        </EmptySection>
        <div class="row">
          <div
            class="friend-card col-md-3"
            v-for="user in freindsRequests"
            :key="user.id"
          >
            <div class="card-container overflow-hidden">
              <div class="photo">
                <img
                  v-if="user.users.image"
                  class="img w-100 h-100"
                  :src="user.users.image"
                  :alt="user.users.name"
                />
                <img
                  v-else
                  class="img w-100 h-100"
                  src="../../assets/images/default.png"
                  alt="freind"
                />
              </div>
              <div class="content">
                <h6 class="name text-capitalize">{{ user.users.name }}</h6>
                <button
                  @click="acceptFreindRequest(user.id)"
                  class="add-friend d-block text-capitalize"
                >
                  accept
                </button>
                <button
                  @click="showConfirmModal"
                  class="add-friend d-block delete text-capitalize"
                >
                  delete
                </button>
              </div>
            </div>

            <ConfirmModal v-if="showConfirm" :showModal="showConfirm">
              <template #message>
                <p class="paragraph">are you sure you want block it ?</p>
              </template>
              <template #sure>
                <div class="d-flex confirm-container-buttons">
                  <button
                    @click="deleteFreindRequest(user.freinds.id)"
                    class="
                      details-button
                      confirm-btn-ok confirm-btn-cancel
                      text-capitalize
                      d-block
                    "
                  >
                    block
                  </button>
                  <button
                    @click="showConfirmModal"
                    class="
                      details-button
                      confirm-btn-ok
                      text-capitalize
                      d-block
                    "
                  >
                    cancel
                  </button>
                </div>
              </template>
            </ConfirmModal>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MyFreindsRequsts",
  data() {
    return {
      loading: false,
      showConfirm: false,
      acceptFerind: {
        status: "accepted",
        _method: "PUT",
      },
      rejectedFerind: {
        status: "rejected",
        _method: "PUT",
      },
    };
  },
  computed: {
    ...mapState({
      freindsRequests: (state) => state.SocialModule.myFreindsRequests,
    }),
  },
  mounted() {
    this.getAllFreindsRequests();
  },
  methods: {
    getAllFreindsRequests() {
      this.loading = true;
      this.$store.dispatch("SocialModule/myFreindsRequests").finally(() => {
        this.loading = false;
      });
    },
    acceptFreindRequest(freindId) {
      this.loading = true;
      let ferindRequstData = new FormData();
      ferindRequstData.append("status", this.acceptFerind.status);
      ferindRequstData.append("_method", this.acceptFerind._method);
      let payload = { id: freindId, data: ferindRequstData };
      this.$store
        .dispatch("SocialModule/acceptFriendRequest", payload)
        .finally(() => {
          this.loading = false;
        });
    },
    deleteFreindRequest(freindId) {
      this.loading = true;
      let rejectFerindRequst = new FormData();
      rejectFerindRequst.append("status", this.rejectedFerind.status);
      rejectFerindRequst.append("_method", this.rejectedFerind._method);
      let payload = { id: freindId, data: rejectFerindRequst };
      this.$store
        .dispatch("SocialModule/rejectFriendRequest", payload)
        .finally(() => {
          this.loading = false;
          this.showConfirm = false;
        });
    },
    showConfirmModal() {
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
        transform: translatey(-5px);
        .img {
          transform: scale(0.97);
          filter: contrast(1);
          border-radius: $radius;
        }
      }
      .photo {
        height: 200px;
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
