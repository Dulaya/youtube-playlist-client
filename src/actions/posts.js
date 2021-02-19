import * as api from '../api/index.js';

export const getPosts = async () => {
  try {
    await api.fetchPosts();
  } catch (error) {
    console.log(error.message);
  }
};

export const createUser = async (user) => {
  try {
    await api.createUser(user);
  } catch (error) {
    console.log(error.message);
  }
};

export const userLogin = async (post) => {
  try {
    await api.userLogin(post);

  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = async (post) => {
  try {
    await api.createPost(post);
  } catch (error) {
    console.log(error.message);
  }
};