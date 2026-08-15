require('dotenv').config({ path: require('path').join(__dirname, '../.env')});

const {Client} = require('pg');


  const host = process.env.DB_HOST || 'localhost';
  const port = parseInt(process.env.DB_PORT || '5432', 10);
  const user = process.env.DB_USERNAME || 'ataulmohsin';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'student-lms';

  async function createDb(){
    const client = new Client({
        host,
        port,
        user,
        password,
        database: 'postgres'
    })
    try {
        await client.connect();
        const res = await client.query(
            `SELECT 1 FROM pg_database WHERE datname = $1`,
            [database]
        )

        if(res.rows.length === 0){
            await client.query(`CREATE DATABASE "${database}"`);
            console.log(`Database "${database}" created sucessfully.`);
        }else{
            console.log(`Database "${database}" already exists.`);
        }

    }catch (error) {
        console.error('Error creating database:', error.message);
        process.exit(1);
    }finally{
        await client.end();
    }
  }

  createDb();