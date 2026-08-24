import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await pool.query(
      `SELECT *
             FROM members
             WHERE username = $1`,
      [username],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const member = result.rows[0];

    const passwordMatch = await bcrypt.compare(password, member.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      {
        id: member.id,
        username: member.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      },
    );

    res.json({
      message: "Login successful",
      token,
      member: {
        id: member.id,
        username: member.username,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Login failed",
    });
  }
});

export default router;
