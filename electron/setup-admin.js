const readline = require('readline');
const path = require('path');
const fs = require('fs');
const os = require('os');
const sqlite3 = require('sqlite3').verbose();


const dbDir = path.join(os.homedir(), '.churchapp');
const dbPath = path.join(dbDir, 'church_app.db');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


let db;

function initializeDatabase() {
 
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
    console.log(' Created database directory');
  }

  
  db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error(' Database connection error:', err);
      process.exit(1);
    } else {
      console.log('Database connected');
      createAdminsTable();
    }
  });
}

function createAdminsTable() {
  db.run(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      email TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error(' Error creating table:', err);
      process.exit(1);
    } else {
      console.log('Admins table ready');
      askForAdminDetails();
    }
  });
}

function askForAdminDetails() {
  rl.question('\nEnter admin username: ', (username) => {
    rl.question('Enter admin password: ', (password) => {
      rl.question('Enter admin email (optional): ', (email) => {
        createAdmin(username, password, email || 'admin@church.com');
      });
    });
  });
}

function createAdmin(username, password, email) {
  
  if (!username || !password) {
    console.error('Username and password are required');
    rl.close();
    process.exit(1);
  }

  if (username.length < 3) {
    console.error(' Username must be at least 3 characters');
    rl.close();
    process.exit(1);
  }

  if (password.length < 4) {
    console.error('Password must be at least 4 characters');
    rl.close();
    process.exit(1);
  }

 
  db.run(
    'INSERT INTO admins (username, password, email) VALUES (?, ?, ?)',
    [username, password, email],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          console.error('Username already exists!');
        } else {
          console.error('Error creating admin:', err.message);
        }
        rl.close();
        process.exit(1);
      } else {
        console.log('\n Admin account created successfully!');
        console.log('\n=== LOGIN CREDENTIALS ===');
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);
        console.log(`Email: ${email}`);
        
        
        db.close();
        rl.close();
        process.exit(0);
      }
    }
  );
}

// Start the process
initializeDatabase();