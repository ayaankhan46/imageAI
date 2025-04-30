import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from DALL.E!',
  });
});

// const startServer = async () => {
//   try {
//     connectDB(process.env.MONGODB_URL);
//     app.listen(8082, () => console.log('Server started on port 8081'));
//   } catch (error) {
//     console.log(error);
//   }
// };

// startServer();

const PORT = process.env.PORT || 8082;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);

    const server = app.listen(PORT, () =>
      console.log(`✅ Server started on port ${PORT}`)
    );

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use. Try another one.`);
        process.exit(1);
      } else {
        throw err;
      }
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
  }
};

startServer();

