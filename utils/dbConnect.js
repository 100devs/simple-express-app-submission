import mongoose from 'mongoose';

const DB_URL = process.env.DB_URL;

if (!DB_URL) {
  throw new Error(
    "Please define the DB_URL environment variabl inside .env"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };

    cached.promise = mongoose.connect(DB_URL, options).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  // cached.conn?.once('open', () => {
  //   console.log('Database connected!');
  // });
  
  cached.conn.on('error', (err) => {
    console.error('connection error:', err);
  });
  return cached.conn;
}

export default dbConnect;