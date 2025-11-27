import pool from '../config/dbConfig.js';
import bcrypt from 'bcrypt';

// This script finds users with non-bcrypt passwords and replaces them with bcrypt hashes.
// Usage: node scripts/hash-seeds.js
// Make sure your environment variables (DB_HOST, DB_USER, DB_PASS, DB_NAME) are set as used by config/dbConfig.js

(async () => {
  try {
    console.log('Connecting to database...');
    // Find users whose password does not look like a bcrypt hash
    const selectRes = await pool.query("SELECT id, password, email, dni FROM users WHERE password IS NOT NULL AND password NOT LIKE '$2b$%' AND password NOT LIKE '$2a$%' AND password NOT LIKE '$2y$%'");
    if (selectRes.rowCount === 0) {
      console.log('No plaintext passwords found. Nothing to do.');
      process.exit(0);
    }

    console.log(`Found ${selectRes.rowCount} users with plaintext passwords. Hashing with bcrypt...`);
    for (const row of selectRes.rows) {
      const { id, password: plain, email, dni } = row;
      try {
        const hash = await bcrypt.hash(plain, 10);
        await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hash, id]);
        console.log(`Updated user ${email || dni} (${id})`);
      } catch (err) {
        console.error('Failed hashing/updating user', id, err.message || err);
      }
    }

    console.log('All done.');
    process.exit(0);
  } catch (err) {
    console.error('Error running hash-seeds script:', err);
    process.exit(1);
  }
})();
