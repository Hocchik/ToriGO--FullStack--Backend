import pool from "../config/dbConfig.js";

export const getRows = async (req, res) => {
    try {
       const results = await pool.query('Select * from test');
       console.log(results);
       res.json("DBConnection successfully!!!!!!")
    }
    catch(error){
        console.error("-ERROR-, " , error);
    }
}