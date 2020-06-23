export default {
  getUserById:
    "SELECT id, email, name, createdat, updatedat FROM user WHERE id=?",
  updateUserById: "UPDATE user SET email=?, name=? WHERE id=?",
  updateUserPasswordByIdPw:
    "UPDATE FROM user SET password=? WHERE id=?, password=?",
  deleteUserById: "",
  createUser: "INSERT INTO user(email, name, password) VALUES(?,?,?)",
};
