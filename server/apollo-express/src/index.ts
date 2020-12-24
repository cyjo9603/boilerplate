import app from '@/app';
import dbConnect from '@config/mongoose';

const PORT = process.env.PORT || 4000;

dbConnect().then(() => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});
