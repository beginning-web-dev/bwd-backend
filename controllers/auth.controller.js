//require any User model file here.
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_SECRET, JWT_EXPIRES_IN } = require("../config/constants");

//create dummy users for testing.
// https://bcrypt-generator.com/ for manually generating password hashes. 10 rounds.
const users = [
  {
    email: "user1@gmail.com",
    password: "password1",
    passwordHash:
      "$2a$10$4EmyEfKcXtlcCcN1ICnKtu4VA7nQr1v9aBG7JHg07hLH0vkph8zqy",
    role: "admin",
  },
  {
    email: "user2@gmail.com",
    password: "password2",
    passwordHash:
      "$2a$10$pplQ1ISSMZ9osSr0P0uFjeslWY/KqcAEWATnXObK6KDJsvycHC.DK",
    role: "user",
  },
];

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please enter all fields" });
  }
  // add in any other validation here. Such as password length, correct email format.

  try {
    //if the flow has made it this far, let's check if the email exists in the db, then we can compare the password to the hashed password in the db.

    //Until DB, check if the email is in the dummy users array.
    const user = users.find((user) => user.email === email);

    //If there is a user, and the password matches the hashed password, then we can login the user, and sign a json web token to send to the client.
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      //remove the password before sending back user to client.
      delete user.passwordHash;
      delete user.password;

      return res
        .status(200)
        .json({ message: "Login successful", user, token });
    }
    return res
      .status(401)
      .json({ error: "Invalid email or password." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { login };
