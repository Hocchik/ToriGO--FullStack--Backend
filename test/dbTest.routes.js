import express from 'express';
//controllers
import { getRows } from './dbTest.controller.js';


const router = express.Router();

router.get("/dbtest", getRows);


export default router;