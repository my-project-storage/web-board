export default {
  getUserById:
    "SELECT id, email, name, createdat, updatedat FROM user WHERE id=?",
  updateUserById: "UPDATE FROM user SET email=? name=? WHERE id=?",
  updateUserPasswordByIdPw:
    "UPDATE FROM user SET password=? WHERE id=?, password=?",
  deleteUserById: "",
  createUser: "",
};
