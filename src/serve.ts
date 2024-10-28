import cors from 'cors';
import express from 'express';
import { charRoute } from './routes/charRoute';
import { powerRoutes } from './routes/powerRoutes';
import { domainExpansionsRoutes } from './routes/domainExpansions';
import { mangaRoute } from './routes/mangaRoute';
import path from 'path';

const app = express();
app.use('/images', express.static(path.join(__dirname, '../public/images')));
app.use(cors());
app.use(express.json());
app.use(charRoute);
app.use(powerRoutes);
app.use(domainExpansionsRoutes);
app.use(mangaRoute);

export default app;
