import { Router } from "express";
import pool from "../db/pool.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (_req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

const router = Router();

router.post("/", upload.single("imageFile"), async (req, res) => {
    const petName = String(req.body?.name || "").trim();
    const species = String(req.body?.type || "").trim().toLowerCase();
    const breed = String(req.body?.breed || "").trim();
    const gender = String(req.body?.gender || "").trim();
    const location = String(req.body?.location || "").trim();
    const image = req.file
        ? `/uploads/${req.file.filename}`
        : String(req.body?.image || "").trim();
    const purpose = String(req.body?.purpose || "").trim().toLowerCase();
    const description = String(req.body?.description || "").trim();
    const parsedAge = Number(req.body?.age);
    const age = Number.isFinite(parsedAge) && parsedAge >= 0 ? Math.floor(parsedAge) : null;

    if (!petName || !species) {
        return res.status(400).json({
            message: "Pet name and species are required.",
        });
    }

    try {
        const [result] = await pool.query(
            `INSERT INTO Pet (
                petName, species, breed, age, arrivalDate, status,
                gender, location, image, purpose, description
             ) VALUES (?, ?, ?, ?, CURDATE(), 'Sheltered', ?, ?, ?, ?, ?)`,
            [
                petName,
                species,
                breed || "Mixed Breed",
                age,
                gender || "Unknown",
                location || "Shelter",
                image || "",
                purpose || "adoption",
                description || "",
            ]
        );

        return res.status(201).json({
            message: "Pet created successfully.",
            petId: result.insertId,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Unable to create pet.",
            details: error.message,
        });
    }
});

router.delete("/:petId", async (req, res) => {
    const petId = Number(req.params?.petId);

    if (!Number.isInteger(petId)) {
        return res.status(400).json({
            message: "Valid petId is required.",
        });
    }

    try {
        const [result] = await pool.query("DELETE FROM Pet WHERE petID = ?", [petId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Pet not found.",
            });
        }

        return res.status(200).json({
            message: "Pet deleted successfully.",
        });
    } catch (error) {
        if (error?.code === "ER_ROW_IS_REFERENCED_2") {
            return res.status(409).json({
                message: "Cannot delete this pet because it has related applications.",
            });
        }

        return res.status(500).json({
            message: "Unable to delete pet.",
            details: error.message,
        });
    }
});

router.patch("/:petId", async (req, res) => {
    const petId = Number(req.params?.petId);
    const petName = String(req.body?.name || "").trim();
    const species = String(req.body?.type || "").trim().toLowerCase();
    const breed = String(req.body?.breed || "").trim();
    const gender = String(req.body?.gender || "").trim();
    const location = String(req.body?.location || "").trim();
    const image = String(req.body?.image || "").trim();
    const purpose = String(req.body?.purpose || "").trim().toLowerCase();
    const description = String(req.body?.description || "").trim();
    const parsedAge = Number(req.body?.age);
    const age = Number.isFinite(parsedAge) && parsedAge >= 0 ? Math.floor(parsedAge) : null;

    if (!Number.isInteger(petId)) {
        return res.status(400).json({
            message: "Valid petId is required.",
        });
    }

    if (!petName || !species) {
        return res.status(400).json({
            message: "Pet name and species are required.",
        });
    }

    try {
        const [result] = await pool.query(
            `UPDATE Pet
             SET petName = ?, species = ?, breed = ?, age = ?,
                 gender = ?, location = ?, image = ?, purpose = ?, description = ?
             WHERE petID = ?`,
            [
                petName,
                species,
                breed || "Mixed Breed",
                age,
                gender || "Unknown",
                location || "Shelter",
                image || "",
                purpose || "adoption",
                description || "",
                petId,
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Pet not found.",
            });
        }

        return res.status(200).json({
            message: "Pet updated successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Unable to update pet.",
            details: error.message,
        });
    }
});

router.get("/", async (_req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT
                petID,
                petName,
                species,
                breed,
                age,
                arrivalDate,
                status,
                gender,
                location,
                image,
                purpose,
                description
             FROM pet
             WHERE status != 'Adopted'
             ORDER BY petID ASC`
        );

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            message: "Unable to load pets from database.",
            details: error.message,
        });
    }
});

export default router;
