import { getMethods, deleteMethods, postMethods } from "@/axios/helpers";

export default {
  // Start posts [ get, add, delete, edit ...]
  async getAllPosts({ commit }) {
    await new Promise((resolve, reject) => {
      getMethods("post", { sort: "desc", limit: 15 })
        .then((response) => {
          commit("GET_ALL_POSTS", response.data.data.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async getSinglePost({ commit }, postId) {
    return await new Promise((resolve, reject) => {
      getMethods(`post/${postId}`)
        .then((response) => {
          console.log(response.data.data.data);
          commit("GET_SINGLE_POSTS", response.data.data.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async addANewPost({ commit }, payload) {
    return await postMethods("post", payload).then((response) => {
      commit("ADD_POST", response.data.data.data);
    });
  },
  getPostToEdit({ state }, postId) {
    const postItem = state.allPosts.find((item) => item.id == postId);
    return postItem ? Promise.resolve(postItem) : getMethods(`post/${postId}`);
  },

  async updatePost({ state, commit }, payload) {
    await postMethods(`post/${payload.id}`, payload.data).then((response) => {
      commit("GET_ALL_POSTS", [...state.allPosts, response.data.data]);
    });
  },
  async deletePost({ state, commit }, postId) {
    return await deleteMethods("post/bulkDelete", {
      ids: [postId],
    }).then(() => {
      commit(
        "GET_ALL_POSTS",
        state.allPosts.filter((item) => item.id != postId)
      );
    });
  },
  async sharePost({ commit }, payload) {
    return await postMethods("PostShare", payload).then((response) => {
      commit("SHARE_POST", response.data.data.data);
    });
  },
  async getLikesNumber({ commit }) {
    let userData = JSON.parse(localStorage.getItem("user-data"));
    let userId = userData.id;
    await getMethods("PostLike", {
      columns: ["user_id"],
      operand: ["="],
      column_values: [userId],
    }).then((response) => {
      console.log(response.data.data.data);
      commit("GET_LIKES_NUMBER", response.data.data.data);
    });
  },
  // End posts

  // all freinds and users in the site
  async getAllUsers({ commit }) {
    await getMethods("other/allotherusers", {
      sort: "desc",
      limit: "1000",
    }).then((response) => {
      commit("GET_ALL_Users", response.data.data.data);
    });
  },
  async addFriend({ commit }, friendId) {
    return await new Promise((resolve, reject) => {
      postMethods("friend", friendId)
        .then((response) => {
          commit("ADD_FRIEND", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  async myRequests({ commit }) {
    let userData = JSON.parse(localStorage.getItem("user-data"));
    let userId = userData.id;
    await getMethods("friend", {
      columns: ["user_id", "status"],
      operand: ["=", "="],
      column_values: [userId, "pending"],
    }).then((response) => {
      commit("MY_REQUESTS", response.data.data.data);
    });
  },

  async myFreindsRequests({ commit }) {
    let userData = JSON.parse(localStorage.getItem("user-data"));
    let userId = userData.id;
    await getMethods("friend", {
      columns: ["friend_id", "status"],
      operand: ["=", "="],
      column_values: [userId, "pending"],
    }).then((response) => {
      commit("MY_FRIENDS_REQUESTS", response.data.data.data);
    });
  },

  async myFreinds({ commit }) {
    await getMethods("myfriend", {
      limit: "1000",
    }).then((response) => {
      console.log(response.data.data.data);
      commit("MY_FRIENDS", response.data.data.data);
    });
  },

  // Mrthods [ delete request .... ETC]
  async deleteMyRequest({ state, commit }, friendId) {
    return await deleteMethods("friend/bulkDelete", {
      ids: [friendId],
    }).then(() => {
      commit(
        "MY_REQUESTS",
        state.myRequests.filter((item) => item.id != friendId)
      );
    });
  },
  async acceptFriendRequest({ commit }, payload) {
    await postMethods(`friend/${payload.id}`, payload.data).then((response) => {
      commit("ACCEPT_FREINDS_REQUEST", response.data);
    });
  },
  async rejectFriendRequest({ commit }, payload) {
    await postMethods(`friend/${payload.id}`, payload.data).then((response) => {
      commit("REJECT_FREINDS_REQUEST", response.data);
    });
  },
  async blockMyFriend({ commit, state }, payload) {
    await postMethods(`friend/${payload.id}`, payload.data).then((response) => {
      commit("BLOCK_MY_FREIND", response.data.data.data);
      commit(
        "MY_FRIENDS",
        state.myFreinds.filter((item) => item.id != payload.id)
      );
    });
  },

  // post [Like -- Share -- Comment -- ETC]
  async addPostLike({ commit }, payload) {
    return await postMethods("PostLike", payload).then((response) => {
      commit("ADD_POST_LIKE", response.data.data);
    });
  },
  // userid == id
  async deletePostLike({ state, commit }, postLikeId) {
    return await deleteMethods("PostLike/bulkDelete", {
      ids: [postLikeId],
    }).then(() => {
      commit(
        "ALL_POST_LIKES",
        state.allPostLikes.filter((item) => item.id != postLikeId)
      );
    });
  },
  //  PostComment
  async allPostComment({ commit }, ...postId) {
    await getMethods("PostComment", {
      columns: ["post_id"],
      operand: ["="],
      column_values: [...postId],
    }).then((response) => {
      console.log(response.data.data.data);
      commit("ALL_POST_COMMENT", response.data.data.data);
    });
  },

  async addPostcomment({ commit, state }, payload) {
    return await postMethods("PostComment", payload).then((response) => {
      commit("GET_ALL_POSTS", [...state.allPosts, response.data.data]);
      // commit("ADD_COMMENT", response.data.data);
      // state.allPosts
    });
  },
  async getcommentToEdit({ commit }, commentId) {
    return await new Promise((resolve, reject) => {
      getMethods(`PostComment/${commentId}`)
        .then((response) => {
          commit("GET_SINGLE_COMMENT", response.data.data.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  async updatePostcomment({ commit }, payload) {
    await postMethods(`PostComment/${payload.id}`, payload.data).then(
      (response) => {
        commit("ALL_POST_COMMENT", response.data.data);
      }
    );
  },
  async deletePostComment({ commit, state }, postId) {
    return await deleteMethods("PostComment/bulkDelete", {
      ids: [postId],
    }).then(() => {
      commit(
        "ALL_POST_COMMENT",
        state.allPostComments.filter((item) => item.id != postId)
      );
    });
  },
  async addPostReplay({ commit }, payload) {
    return await postMethods("PostComment", payload).then((response) => {
      commit("ADD_REPLAY", response.data.data);
    });
  },

  // Start Chatt
  async chooseFreindToChatt({ commit }, payload) {
    return await new Promise((resolve, reject) => {
      postMethods("chat", payload)
        .then((response) => {
          commit("CHOOSE_FREIND", response.data.data.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
