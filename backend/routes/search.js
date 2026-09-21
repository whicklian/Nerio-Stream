import express from "express";
import { enhanceSearch } from "../controllers/searchController.js";

const router = express.Router();

router.get("/enhance", enhanceSearch);

export default router;