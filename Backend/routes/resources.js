import express from "express";
import pool from "../config/db.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// ==========================================
// GET ALL RESOURCES
// Public
// ==========================================

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM resources ORDER BY id DESC");

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch resources",
    });
  }
});

// ==========================================
// ADD RESOURCE
// Logged-in members only
// ==========================================

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { title, note, link, category } = req.body;

    const created_by = req.user.username;

    const result = await pool.query(
      `INSERT INTO resources
                (title, note, link, category, created_by)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
      [title, note, link, category, created_by],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add resource",
    });
  }
});

// ==========================================
// UPDATE RESOURCE
// Logged-in member + owner only
// ==========================================

router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const resourceId = req.params.id;

    const { title, note, link, category } = req.body;

    const username = req.user.username;

    const result = await pool.query(
      `UPDATE resources
             SET
                title = $1,
                note = $2,
                link = $3,
                category = $4
             WHERE id = $5
             AND created_by = $6
             RETURNING *`,
      [title, note, link, category, resourceId, username],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Resource not found or you are not allowed to edit it",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update resource",
    });
  }
});

// ==========================================
// DELETE RESOURCE
// Logged-in member + owner only
// ==========================================

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const resourceId = req.params.id;

    const username = req.user.username;

    const result = await pool.query(
      `DELETE FROM resources
             WHERE id = $1
             AND created_by = $2
             RETURNING *`,
      [resourceId, username],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Resource not found or you are not allowed to delete it",
      });
    }

    res.json({
      message: "Resource deleted successfully",
      resource: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete resource",
    });
  }
});

export default router;
