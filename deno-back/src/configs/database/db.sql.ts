export default {
  // ! select
  getUserById:
    "SELECT id, email, name, createdat, updatedat FROM user WHERE id=?",
  getUserPasswordById: "SELECT password FROM user WHERE id=?",
  getUserByEmail: "SELECT email FROM user WHERE email=?",

  // ! update
  updateUserById: "UPDATE user SET email=?, name=? WHERE id=?",
  updateUserPasswordById: "UPDATE user SET password=? WHERE id=?",

  // ! delete
  deleteUserById: "DELETE FROM user WHERE id=?",

  // ! insert
  createUser: "INSERT INTO user(email, name, password) VALUES(?,?,?)",
};
