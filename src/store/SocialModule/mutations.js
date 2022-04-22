export default {
  ADD_POST(state, post) {
    return (state.addPost = post);
  },
  GET_ALL_POSTS(state, posts) {
    return (state.allPosts = posts);
  },
  GET_SINGLE_POSTS(state, post) {
    return (state.singlePost = post);
  },
  GET_ALL_Users(state, users) {
    return (state.users = users);
  },
  ADD_FRIEND(state, friend) {
    return (state.addFreind = friend);
  },
  MY_REQUESTS(state, request) {
    return (state.myRequests = request);
  },
  MY_FRIENDS_REQUESTS(state, freindRequest) {
    return (state.myFreindsRequests = freindRequest);
  },
  MY_FRIENDS(state, freinds) {
    return (state.myFreinds = freinds);
  },
  DELETE_MY_REQUEST(state, request) {
    return (state.deleteMyRequest = request);
  },
  ACCEPT_FREINDS_REQUEST(state, acceptRequest) {
    return (state.acceptFreindsRequest = acceptRequest);
  },
  REJECT_FREINDS_REQUEST(state, rejectRequest) {
    return (state.rejectFreindsRequest = rejectRequest);
  },
  BLOCK_MY_FREIND(state, blockFreind) {
    return (state.blockMyFreind = blockFreind);
  },
  // Post [Lik -- Share-- Comment -- ETC ]
  ADD_POST_LIKE(state, like) {
    return (state.addPostLike = like);
  },
  ALL_POST_LIKES(state, likes) {
    return (state.allPostLikes = likes);
  },
  ADD_COMMENT(state, comment) {
    return (state.addComment = comment);
  },
  ALL_POST_COMMENT(state, comment) {
    return (state.allPostComments = comment);
  },
  GET_SINGLE_COMMENT(state, comment) {
    return (state.singleComment = comment);
  },
  ADD_REPLAY(state, replay) {
    return (state.addReplay = replay);
  },

  SHARE_POST(state, share) {
    return (state.sharePost = share);
  },
  GET_LIKES_NUMBER(state, like) {
    return (state.getLikesNumber = like);
  },
  // chatt
  CHOOSE_FREIND(state, ferind) {
    return (state.chooseFreind = ferind);
  },
};
