import express from 'express';
//controllers
import { getRows } from '../controllers/dbTest.controller.js';


const router = express.Router();

router.get("/dbtest", getRows);


export default router;