import express from "express";
import cors from "cors";
import { getDbPool } from "./db.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const pool = getDbPool();

//CREATE
app.post("/auth/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password, confirm_password } =
      req.body;
    const newUser = await pool.query(
      "INSERT INTO auth (f_name, l_name, email, password, confirm_password) VALUES($1, $2, $3, $4, $5) RETURNING f_name, l_name, email",
      [first_name, last_name, email, password, confirm_password]
    );
    res.json(newUser.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/auth/users", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM auth");
    res.json(allUsers.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(port, () => {
  console.log(` App is listening on port ${port}`);
});
