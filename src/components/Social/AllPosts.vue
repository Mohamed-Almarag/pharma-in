<template>
  <div>
    <!-- Start posts container  -->
    <Loading :loading="loading"></Loading>
    <transition name="fade">
      <ConfirmModal v-if="showConfirm" :showModal="showConfirm">
        <template #message>
          <p class="paragraph">are you sure you want delete post?</p>
        </template>
        <template #sure>
          <div class="d-flex confirm-container-buttons">
            <button
              @click="deletePost(postIdToDelete)"
              class="
                details-button
                confirm-btn-ok
                review-button
                text-capitalize
                d-block
              "
            >
              delete
            </button>
            <button
              @click="showConfirmModal"
              class="
                details-button
                confirm-btn-cancel confirm-btn-ok
                text-capitalize
                d-block
              "
            >
              cancel
            </button>
          </div>
        </template>
      </ConfirmModal>
    </transition>
    <div class="posts-container">
      <div class="create-post-conatiner">
        <button
          class="add-post-btn text-capitalize d-block rounded-pill"
          @click="showModal"
        >
          {{ $t("social.add post") }}
        </button>
      </div>
      <Post ref="posts" @close="showModal" :showPostModal="showPost"></Post>

      <div class="for-all-posts">
        <!-- start post  -->
        <div class="post shadow-sm" v-for="(post, index) in posts" :key="index">
          <div class="main">
            <div
              class="
                post-header
                d-flex
                align-items-center
                justify-content-between
              "
            >
              <!-- part one post image and who is create the post? -->
              <div class="active-information d-flex align-items-center">
                <div class="photo-container rounded-circle shadow-sm">
                  <img
                    v-if="post.user.image"
                    class="img w-100 h-100 rounded-circle"
                    :src="post.user.image"
                    alt="user"
                    draggable="false"
                  />
                  <img
                    v-else
                    class="img w-100 h-100 rounded-circle"
                    src="@/assets/images/default.png"
                    alt="user"
                    draggable="false"
                  />
                </div>

                <div class="part-two">
                  <span class="name d-block text-capitalize">{{
                    post.user.name
                  }}</span>
                  <span class="d-block last-time">{{
                    post.create_dates.created_at_human
                  }}</span>
                </div>
              </div>
              <!-- Start Dropdown For Delete Post And Edit Post  -->
              <div class="edit-box-container">
                <div class="dropdown">
                  <button
                    v-if="post.user.id == user_id"
                    class="btn dropdown-toggle rounded-circle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    ...
                  </button>
                  <ul
                    class="dropdown-menu text-center text-capitalize"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li class="li-item">
                      <a
                        @click="gtePostDataForEdit(post.id)"
                        class="dropdown-item"
                        href="javascript:void(0)"
                        >edit post</a
                      >
                    </li>

                    <li class="li-item">
                      <a
                        @click="showPostConfirmModal(post.id)"
                        class="dropdown-item"
                        href="javascript:void(0)"
                        >delete post</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <!-- End Dropdown For Delete Post And Edit Post  -->
            </div>
            <div class="post-body">
              <!-- start the post text  -->
              <div class="description-content">
                <div class="post-more-p">
                  <p
                    v-if="post.text"
                    v-html="$options.filters.justSpecificWords(post.text)"
                    class="paragraph p-social"
                    :class="{
                      hide:
                        showMorePostWords == true &&
                        post.id == showMorePostWords_id,
                    }"
                  ></p>
                  <span
                    class="read-more-post text-capitalize"
                    :class="{
                      hide:
                        showMorePostWords == true &&
                        post.id == showMorePostWords_id,
                    }"
                    v-if="post.text.length > 90"
                    @click="togglePostWords(post.id)"
                    >... raed more</span
                  >
                </div>
                <p
                  v-if="showMorePostWords && post.id == showMorePostWords_id"
                  v-html="post.text"
                  class="paragraph p-social"
                ></p>
              </div>
              <!-- end the post text  -->
              <div class="post-photo">
                <img
                  v-if="post.photo"
                  class="img w-100 h-100"
                  :src="post.photo"
                  alt="post-photo"
                  draggable="false"
                />
              </div>
            </div>
            <!-- start the post comments Number -->
            <div
              class="
                comments-liks-number
                d-flex
                justify-content-between
                align-items-center
                text-capitalize
              "
            >
              <span class="icons d-block">
                <fa class="icon" icon="thumbs-up" />
                <span class="text-icon number" v-if="post.postlike"
                  >{{ post.postlike.length }}
                </span>
              </span>
              <div class="d-flex comment-container align-items-center">
                <div class="icons d-block">
                  <span v-if="post.comments">{{ post.comments.length }}</span>
                  <span class="text-icon number">comment</span>
                </div>
                <div class="icons d-block">
                  <span
                    ><span v-if="post.postshare">{{
                      post.postshare.length
                    }}</span></span
                  >
                  <span class="text-icon number">share</span>
                </div>
              </div>
            </div>
            <!-- End the post comments Number -->
          </div>
          <div
            class="
              comments-liks
              d-flex
              justify-content-around
              align-items-center
              text-capitalize
            "
          >
            <!-- like & dislike -->
            <!--  -->
            <span
              class="icons d-block"
              :class="{
                like: like_id == post.id,
              }"
              v-if="!like"
              @click="addLikeOnPost(post.id, like_id)"
            >
              <fa class="icon" icon="thumbs-up" />
              <span class="text-icon">like</span>
            </span>
            <!-- dislike  -->
            <span
              v-if="like"
              class="icons d-block"
              @click="deletePostLike(post.id, like_id)"
            >
              <fa class="icon" icon="thumbs-up" />
              <span class="text-icon">dislike</span>
            </span>

            <!-- <button @click="toggleLlikeEffect(post.id, $event)">
              <span class="action like" @click="addLikeOnPost(post.id)"
                >like</span
              >
            </button> -->
            <!-- v-if="!isPostLiked"
              v-if="isPostLiked" -->

            <!-- <button @click="toggleLlikeEffect(post.id, $event)">
              <span class="action dislike" @click="deletePostLike(post.id)">
                disssLike</span
              >
            </button> -->
            <!-- like & dislike -->
            <div @click="toggleCommentBox(post.id)" class="icons">
              <fa class="icon" icon="comment" />
              <span class="text-icon">comment</span>
            </div>
            <div @click="sharePost(post.id)" class="icons d-block">
              <fa class="icon" icon="share" />
              <span class="text-icon">share</span>
            </div>
          </div>

          <!-- start comments  -->
          <div
            class="all-users-comments"
            v-if="comment && post.id == comment_id"
          >
            <!-- <span class="d-block show-all text-capitalize"
                  >show all comments</span
                > -->
            <div class="every-user-comment">
              <div
                class="main-user-comment"
                v-for="(comment, index) in post.comments"
                :key="index"
              >
                <div class="comment-container d-flex">
                  <img
                    v-if="comment.user.image"
                    :src="comment.user.image"
                    :alt="comment.user.name"
                    class="user-photo-comment d-block rounded-circle shdow-sm"
                  />
                  <img
                    v-else
                    src="@/assets/images/default.png"
                    alt="user.name"
                    class="user-photo-comment d-block rounded-circle shdow-sm"
                  />
                  <div class="comment-text-container">
                    <div class="comment-words">
                      <div class="for-edit">
                        <span class="author-comment d-block text-capitalize"
                          >{{ comment.user.name }}
                        </span>
                        <div class="dropdown">
                          <button
                            v-if="comment.user.id == user_id"
                            class="
                              btn
                              dropdown-toggle
                              update-comment
                              rounded-circle
                            "
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            ...
                          </button>
                          <ul
                            class="dropdown-menu text-center text-capitalize"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li class="li-item">
                              <a
                                @click="
                                  getcommentToEdit(comment.id),
                                    toggleUpdateCommentBox(comment.id)
                                "
                                class="dropdown-item"
                                href="javascript:void(0)"
                                >edit comment</a
                              >
                            </li>
                            <li class="li-item">
                              <a
                                @click="showCommentConfirmModal"
                                class="dropdown-item"
                                href="javascript:void(0)"
                                >delete comment</a
                              >
                            </li>
                          </ul>
                          <transition name="fade">
                            <ConfirmModal
                              v-if="showConfirmComment"
                              :showModal="showConfirmComment"
                            >
                              <template #message>
                                <p class="paragraph">
                                  are you sure you want delete comment?
                                </p>
                              </template>
                              <template #sure>
                                <div class="d-flex confirm-container-buttons">
                                  <button
                                    @click="deleteComment(comment.id)"
                                    class="
                                      details-button
                                      confirm-btn-ok
                                      review-button
                                      text-capitalize
                                      d-block
                                    "
                                  >
                                    delete
                                  </button>
                                  <button
                                    @click="showCommentConfirmModal"
                                    class="
                                      details-button
                                      confirm-btn-cancel confirm-btn-ok
                                      text-capitalize
                                      d-block
                                    "
                                  >
                                    cancel
                                  </button>
                                </div>
                              </template>
                            </ConfirmModal>
                          </transition>
                        </div>
                      </div>
                      <p class="author-texts">
                        {{ comment.comment }}
                      </p>
                      <!-- start update comment  -->
                      <div
                        class="add-comment"
                        v-if="
                          update_for_comment && update_comment_id == comment.id
                        "
                      >
                        <div class="comment-container d-flex">
                          <img
                            v-if="userLoggedInPhoto"
                            :src="userLoggedInPhoto"
                            alt="comment"
                            class="
                              user-photo-comment
                              d-block
                              rounded-circle
                              shdow-sm
                            "
                          />
                          <img
                            v-else
                            src="@/assets/images/default.png"
                            alt="comment"
                            class="
                              user-photo-comment
                              d-block
                              rounded-circle
                              shdow-sm
                            "
                          />
                          <div class="replaies-container">
                            <input
                              @keypress.enter="
                                updateComents(post.id, comment.id)
                              "
                              v-focus
                              class="d-block comment-words comment-input"
                              type="text"
                              v-model="updateComent"
                            />
                            <fa
                              @click="updateComents(post.id)"
                              class="d-block small-icon"
                              icon="paper-plane"
                            />
                          </div>
                        </div>
                      </div>
                      <!-- end update comment  -->
                    </div>

                    <span
                      @click="showReplay(comment.id)"
                      class="d-block replay-btn text-capitalize"
                      >replay</span
                    >
                    <!-- start replies  -->
                    <div
                      class="replies"
                      v-for="replayItem in comment.replay"
                      :key="replayItem.id"
                    >
                      <div class="comment-container d-flex">
                        <img
                          v-if="replayItem.user.image"
                          :src="replayItem.user.image"
                          :alt="replayItem.user.name"
                          class="
                            user-photo-comment
                            d-block
                            rounded-circle
                            shdow-sm
                          "
                        />
                        <img
                          v-else
                          src="@/assets/images/default.png"
                          alt="replay"
                          class="
                            user-photo-comment
                            d-block
                            rounded-circle
                            shdow-sm
                          "
                        />
                        <div class="comment-words">
                          <div class="for-edit">
                            <span
                              class="author-comment d-block text-capitalize"
                              >{{ replayItem.user.name }}</span
                            >
                            <div class="dropdown">
                              <button
                                v-if="replayItem.user.id == user_id"
                                class="
                                  btn
                                  dropdown-toggle
                                  update-comment
                                  rounded-circle
                                "
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                ...
                              </button>
                              <ul
                                class="
                                  dropdown-menu
                                  text-center text-capitalize
                                "
                                aria-labelledby="dropdownMenuButton1"
                              >
                                <li class="li-item">
                                  <a
                                    @click="
                                      getReplayToEdit(replayItem.id),
                                        toggleUpdateReplayBox(replayItem.id)
                                    "
                                    class="dropdown-item text-capitalize"
                                    href="javascript:void(0)"
                                    >edit replay</a
                                  >
                                </li>
                                <li class="li-item">
                                  <a
                                    @click="showReplayConfirmModal"
                                    class="dropdown-item text-capitalize"
                                    href="javascript:void(0)"
                                    >delete replay</a
                                  >
                                </li>
                              </ul>
                              <transition name="fade">
                                <ConfirmModal
                                  v-if="showConfirmReplay"
                                  :showModal="showConfirmReplay"
                                >
                                  <template #message>
                                    <p class="paragraph">
                                      are you sure you want delete replay?
                                    </p>
                                  </template>
                                  <template #sure>
                                    <div
                                      class="d-flex confirm-container-buttons"
                                    >
                                      <button
                                        @click="deleteReplay(replayItem.id)"
                                        class="
                                          details-button
                                          confirm-btn-ok
                                          review-button
                                          text-capitalize
                                          d-block
                                        "
                                      >
                                        delete
                                      </button>
                                      <button
                                        @click="showReplayConfirmModal"
                                        class="
                                          details-button
                                          confirm-btn-cancel confirm-btn-ok
                                          text-capitalize
                                          d-block
                                        "
                                      >
                                        cancel
                                      </button>
                                    </div>
                                  </template>
                                </ConfirmModal>
                              </transition>
                            </div>
                          </div>
                          <p class="author-texts">
                            <span>{{ replayItem.comment }}</span>
                          </p>
                          <!-- start update replay  -->
                          <div
                            class="add-replay"
                            v-if="
                              update_for_replay &&
                              replayItem.id == update_replay_id
                            "
                          >
                            <div class="comment-container d-flex">
                              <img
                                v-if="userLoggedInPhoto"
                                :src="userLoggedInPhoto"
                                alt="comment"
                                class="
                                  user-photo-comment
                                  d-block
                                  rounded-circle
                                  shdow-sm
                                "
                              />
                              <img
                                v-else
                                src="@/assets/images/default.png"
                                alt="comment"
                                class="
                                  user-photo-comment
                                  d-block
                                  rounded-circle
                                  shdow-sm
                                "
                              />

                              <div class="replaies-container">
                                <input
                                  @keypress.enter="
                                    updateReplayOnPost(post.id, replayItem.id)
                                  "
                                  v-focus
                                  class="d-block comment-words comment-input"
                                  type="text"
                                  v-model="updateReplay"
                                />
                                <fa
                                  @click="
                                    updateReplayOnPost(post.id, replayItem.id)
                                  "
                                  class="d-block small-icon"
                                  icon="paper-plane"
                                />
                              </div>
                            </div>
                          </div>
                          <!-- end update replay  -->
                        </div>
                      </div>
                    </div>
                    <div
                      class="add-replay"
                      v-if="showReplayBox && comment.id == replay_id"
                    >
                      <div class="comment-container d-flex">
                        <img
                          v-if="userLoggedInPhoto"
                          :src="userLoggedInPhoto"
                          alt="comment"
                          class="
                            user-photo-comment
                            d-block
                            rounded-circle
                            shdow-sm
                          "
                        />
                        <img
                          v-else
                          src="@/assets/images/default.png"
                          alt="comment"
                          class="
                            user-photo-comment
                            d-block
                            rounded-circle
                            shdow-sm
                          "
                        />

                        <div class="replaies-container">
                          <input
                            @keypress.enter="
                              addReplayOnPost(post.id, comment.id)
                            "
                            v-focus
                            class="d-block comment-words comment-input"
                            type="text"
                            v-model="addReplayData.comment"
                          />
                          <fa
                            @click="addReplayOnPost(post.id, comment.id)"
                            class="d-block small-icon"
                            icon="paper-plane"
                          />
                        </div>
                      </div>
                    </div>
                    <!-- End replies  -->
                  </div>
                </div>
              </div>
              <!-- start add comment  -->
              <div class="add-comment">
                <div class="comment-container d-flex">
                  <img
                    v-if="userLoggedInPhoto"
                    :src="userLoggedInPhoto"
                    alt="comment"
                    class="user-photo-comment d-block rounded-circle shdow-sm"
                  />
                  <img
                    v-else
                    src="@/assets/images/default.png"
                    alt="comment"
                    class="user-photo-comment d-block rounded-circle shdow-sm"
                  />
                  <div class="replaies-container">
                    <input
                      @keypress.enter="addCommentOnPost(post.id)"
                      v-focus
                      class="d-block comment-words comment-input"
                      type="text"
                      v-model="addCommentData.comment"
                    />
                    <fa
                      @click="addCommentOnPost(post.id)"
                      class="d-block small-icon"
                      icon="paper-plane"
                    />
                  </div>
                </div>
              </div>
              <!-- End add comment  -->
            </div>
          </div>
          <!-- End comments  -->
        </div>
        <!-- End post  -->
      </div>
    </div>
  </div>
</template>

<script>
import Post from "@/components/Social/Post.vue";
import { mapState } from "vuex";
export default {
  name: "AllPosts",
  data() {
    return {
      showPost: false,
      userLoggedInPhoto: null,
      loading: false,
      showConfirm: false,
      thePostId: null,
      like: false,
      showReplayBox: false,
      comment: false,
      commentText: null,
      comment_id: null,
      replay_id: null,
      like_id: null,
      user_id: "",
      isPostLiked: false,
      updateComent: "",
      update_comment_id: null,
      update_for_comment: false,
      id_comment_for_update: null,
      showConfirmComment: false,
      updateReplay: "",
      update_replay_id: null,
      update_for_replay: false,
      id_replay_for_update: null,
      showConfirmReplay: false,
      showMorePostWords: false,
      showMorePostWords_id: null,
      addLikeData: {
        post_id: "",
        type: "like",
      },
      addCommentData: {
        post_id: null,
        comment: null,
      },
      addReplayData: {
        post_id: null,
        replay_id: null,
        comment: null,
      },
    };
  },
  props: {
    // posts: {
    //   type: Array,
    // },
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      },
    },
  },
  mounted() {
    this.getAllPosts();
    // this.getLikesNumber();
    this.allPostsComments(14, 13);
    // console.log(this.userLoggedInPhoto);
    let userData = JSON.parse(localStorage.getItem("user-data"));
    this.user_id = userData.id;
    this.userLoggedInPhoto = userData.image;
  },
  computed: {
    ...mapState({
      // addPostLike
      posts: (state) => state.SocialModule.allPosts,
      likesNumber: (state) => state.SocialModule.getLikesNumber,
    }),
    likedPostId() {
      return this.$store.state.SocialModule.addPostLike;
    },
    postIdToDelete() {
      return this.thePostId;
    },
  },
  methods: {
    getAllPosts() {
      this.loading = true;
      this.$store.dispatch("SocialModule/getAllPosts").finally(() => {
        this.loading = false;
      });
    },
    // will delete
    getSinglePost(id) {
      // this.loading = true;
      this.$store
        .dispatch("SocialModule/getSinglePost", id)
        .then((response) => {
          // this.loading = false;
          console.log(response);
        });
    },
    // will delete
    allPostsComments(...id) {
      this.loading = true;
      this.$store.dispatch("SocialModule/allPostComment", ...id).finally(() => {
        this.loading = false;
      });
    },
    togglePostWords(id) {
      this.showMorePostWords_id = id;
      this.showMorePostWords = !this.showMorePostWords;
    },
    showConfirmModal() {
      this.showConfirm = !this.showConfirm;
      this.thePostId = null;
    },
    showPostConfirmModal(id) {
      this.showConfirm = !this.showConfirm;
      this.thePostId = id;
    },
    showCommentConfirmModal() {
      this.showConfirmComment = !this.showConfirmComment;
    },
    // will delete
    gtePostDataForEdit(id) {
      this.showPost = true;
      this.$nextTick(function () {
        // console.log(this.$refs.posts.gtePostForEdit(id));
        this.$refs.posts.gtePostForEdit(id);
      });
    },
    deletePost(postId) {
      this.loading = true;
      this.$store
        .dispatch("SocialModule/deletePost", postId)
        .then(() => {
          this.getAllPosts();
        })
        .finally(() => {
          this.showConfirm = false;

          this.loading = false;
        });
    },
    addLikeOnPost(id) {
      let likeData = new FormData();
      likeData.append("post_id", id);
      likeData.append("type", this.addLikeData.type);
      this.$store.dispatch("SocialModule/addPostLike", likeData).then(() => {
        this.like = !this.like;
        // this.isPostLiked = true;
      });
    },
    deletePostLike(id) {
      if ((this.like_id = id)) {
        this.$store.dispatch("SocialModule/deletePostLike", id).then(() => {
          this.like = !this.like;
          this.isPostLiked = false;
        });
      }
    },
    toggleLike(id) {
      if (this.isPostLiked) {
        // this.deletePostLike();

        console.log(`liked ${id}`);
      } else {
        console.log(`liked ${id}`);
        // this.addLikeOnPost();
      }
    },
    toggleCommentBox(id) {
      this.comment_id = id;
      this.comment = !this.comment;
    },
    toggleUpdateCommentBox(id) {
      this.update_comment_id = id;
      this.update_for_comment = !this.update_for_comment;
    },
    addCommentOnPost(id) {
      let commentData = new FormData();
      commentData.append("post_id", id);
      commentData.append("comment", this.addCommentData.comment);
      this.$store
        .dispatch("SocialModule/addPostcomment", commentData)
        .then(() => {
          this.addCommentData.comment = "";
          this.getAllPosts();
        });
    },
    getcommentToEdit(id) {
      this.$store.dispatch("SocialModule/getcommentToEdit", id).then((res) => {
        let comment = res.data.data.data;
        this.updateComent = comment.comment;
      });
    },
    updateComents(postId, commentId) {
      let commentData = new FormData();
      commentData.append("post_id", postId);
      commentData.append("_method", "PUT");
      commentData.append("comment", this.updateComent);
      let payload = { id: commentId, data: commentData };
      this.$store
        .dispatch("SocialModule/updatePostcomment", payload)
        .then(() => {
          this.updateComent = "";
          this.getAllPosts();
        })
        .finally(() => {
          this.update_for_comment = !this.update_for_comment;
        });
    },
    deleteComment(id) {
      this.$store
        .dispatch("SocialModule/deletePostComment", id)
        .then(() => {
          this.getAllPosts();
        })
        .finally(() => {
          this.showConfirmComment = false;
        });
    },
    toggleLlikeEffect(id, e) {
      this.posts.filter((item) => {
        if (item.id == id) {
          console.log(item);
          let actionsBtn = document.querySelectorAll(".action");
          console.log(actionsBtn);
          actionsBtn.forEach((el) => {
            console.log(el.target);
          });
          // console.log(item.id);
          // console.log(id);
          // console.log(e.target);
          e.target.classList.add("yes");
          let likeBtn = document.querySelector(".like");
          let dislikeBtn = document.querySelector(".dislike");

          if (likeBtn.classList.contains("yes")) {
            likeBtn.classList.add("hide");
            dislikeBtn.classList.add("show");
            console.log(dislikeBtn);
          }
          if (dislikeBtn.classList.contains("yes")) {
            likeBtn.classList.remove("hide");
            dislikeBtn.classList.remove("show");
            console.log(dislikeBtn);
          }
          // if (dislikeBtn.classList.contains("yes")) {
          //   dislikeBtn.classList.add("hide");
          //   likeBtn.classList.remove("yes");
          //   // likeBtn.classList.remove("yes");
          //   // dislikeBtn.classList.remove("blabla");
          //   console.log(likeBtn);
          // }
          return (this.isPostLiked = !this.isPostLiked);
        }
      });
    },
    test() {
      console.log("test like");
    },
    testtwo() {
      console.log("test two dislike");
    },
    addReplayOnPost(postId, commentId) {
      let replayData = new FormData();
      replayData.append("post_id", postId);
      replayData.append("replay_id", commentId);
      replayData.append("comment", this.addReplayData.comment);
      this.$store
        .dispatch("SocialModule/addPostReplay", replayData)
        .then(() => {
          this.addReplayData.comment = "";
          this.getAllPosts();
        });
    },
    getReplayToEdit(id) {
      this.$store.dispatch("SocialModule/getcommentToEdit", id).then((res) => {
        let replay = res.data.data.data;
        this.updateReplay = replay.comment;
      });
    },
    toggleUpdateReplayBox(id) {
      this.update_replay_id = id;
      this.update_for_replay = !this.update_for_replay;
    },
    updateReplayOnPost(postId, replayId) {
      let replayData = new FormData();
      replayData.append("post_id", postId);
      replayData.append("_method", "PUT");
      replayData.append("comment", this.updateReplay);
      let payload = { id: replayId, data: replayData };
      this.$store
        .dispatch("SocialModule/updatePostcomment", payload)
        .then(() => {
          this.updateReplay = "";
          this.getAllPosts();
        })
        .finally(() => {
          this.update_for_replay = !this.update_for_replay;
        });
    },
    deleteReplay(id) {
      this.$store.dispatch("SocialModule/deletePostComment", id).then(() => {
        this.getAllPosts();
        this.showConfirmReplay = false;
        console.log(id);
      });
    },
    showReplayConfirmModal() {
      this.showConfirmReplay = !this.showConfirmReplay;
      console.log(this.showConfirmReplay);
    },
    showReplay(id) {
      this.replay_id = id;
      this.showReplayBox = !this.showReplayBox;
      console.log(this.showReplayBox, id, this.replay_id);
    },
    showModal() {
      this.showPost = !this.showPost;
    },
    sharePost(id) {
      let data = new FormData();
      data.append("post_id", id);
      this.$store.dispatch("SocialModule/sharePost", data);
    },
    getLikesNumber() {
      this.$store.dispatch("SocialModule/getLikesNumber");
    },
  },
  components: {
    Post,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/pages/allPosts.scss";
.btn-unlike {
}
.btn-like {
  // color: #707077;
}
.action {
  &.like {
    &.hide {
      display: none;
    }
  }
  &.dislike {
    display: none;
    // &.yes {
    // }
    &.show {
      display: block;
    }
    // display: none;
    // &.hide {
    //   color: yellowgreen;
    //   display: block;
    // }
  }
}
</style>
