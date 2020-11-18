import {
  GET_ALL_POSTS,
  PUBLISH,
  GET_POST_BY_ID,
  DELETE_POST_BY_ID,
  EDIT_POST_BY_ID,
  GET_POSTS_BY_USER_ID,
  GET_VOLUNTEERED_POSTS,
  SELECT_POST,
} from "../actions/types";

const initialState = {
  post: [],
  posts: [],
  userPosts: [],
  volunteeredPosts: [],
  selectedPost: null,
  deletedPost: null,
};

const updateList = (oldList, doc) => {
  let newList = [];
  oldList.forEach((post) => {
    if (post._id === doc._id) {
      post = doc;
    }
    newList.push(post);
  });
  return newList;
};

const addPost = (oldList, doc) => {
  let newList = [];
  let newPost = doc;
  newPost.PostVolunteers = [];
  newPost.user = { username: "" };

  console.log("newPost is ", newPost);
  console.log("oldList is ", newList);

  newList.push(newPost);
  oldList.forEach((post) => {
    newList.push(post);
  });
  console.log("newList is ", newList);
  return newList;
};

const updatePost = (oldList, doc) => {
  oldList.forEach((post) => {
    if (post._id === doc._id) {
      post.title = doc.title;
      post.text = doc.text;
      post.lat = doc.lat;
      post.long = doc.long;
      post.postSkills = doc.postSkills;
    }
  });
  return oldList;
};

const deletePost = (oldList, doc) => {
  return oldList.filter((x) => x._id !== doc._id);
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return { ...state, posts: action.payload, selectedPost: null };
    case DELETE_POST_BY_ID:
      return {
        ...state,
        selectedPost: null,
        posts: deletePost(state.posts, action.payload),
      };
    // case PUBLISH:
    //   return { ...state, posts: state.posts.push(action.payload) };
    case PUBLISH:
      return { ...state, posts: addPost(state.posts, action.payload) };
    // case ADD_COMMENT:
    //   return { ...state, selectedPost: action.payload, posts: updateList(state.posts, action.payload) }
    // case ADD_VOLUNTEER:
    //   return { ...state, selectedPost: action.payload }
    case SELECT_POST:
      return { ...state, selectedPost: action.payload };
    case GET_POST_BY_ID:
      return { ...state, post: action.payload };
    case GET_POSTS_BY_USER_ID:
      return { ...state, selectedPost: null, userPosts: action.payload };
    case GET_VOLUNTEERED_POSTS:
      return { ...state, selectedPost: null, volunteeredPosts: action.payload };
    case EDIT_POST_BY_ID:
      return { ...state, posts: updatePost(state.posts, action.payload) };
    default:
      return state;
  }
}
