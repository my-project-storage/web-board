export default {
  // ! select
  getUserById: "SELECT * FROM user WHERE id=?",
  getUserPasswordById: "SELECT password FROM user WHERE id=?",
  getUserByEmail: "SELECT * FROM user WHERE email=?",
  getPostById: "SELECT * FROM post WHERE id=?",
  getPostList:
    "SELECT p.id, name, title, p.createdat, p.updatedat FROM post p, user u WHERE u.id = p.user_id",

  // ! update
  updateUserById: "UPDATE user SET email=?, name=? WHERE id=?",
  updateUserPasswordById: "UPDATE user SET password=? WHERE id=?",
  updatePostById: "UPDATE post SET title=?, contents=? WHERE id=?",

  // ! delete
  deleteUserById: "DELETE FROM user WHERE id=?",
  deletePostById: "DELETE FROM post WHERE id=?",

  // ! insert
  createUser: "INSERT INTO user(email, name, password) VALUES(?,?,?)",
  createPost: "INSERT INTO post(user_id, title, contents) VALUES(?,?,?)",
};
