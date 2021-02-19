

export const url = process.env.REACT_APP_BASE_URL //|| 'http://localhost:5000/api/' ;//'http://localhost:5000/api/'; /*5000 for local development only*/

export const registerURL = url + 'user/register';
export const loginURL = url + 'user/login';
export const getPostsURL = url + 'posts';
export const createPostURL = url + 'posts/newpost';
export const deleteAccountURL = url + 'deleteaccount';
export const deletePostURL = url + 'posts/deletepost';