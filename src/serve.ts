import express from 'express';
import { charRoute } from './routes/charRoute';
import { powerRoutes } from './routes/powerRoutes';
import cors from 'cors';
import { domainExpansionsRoutes } from './routes/domainExpansions';

const app = express();

app.use(express.json());  // Permite que o express entenda requisições com o corpo em JSON
app.use(charRoute);  // Adiciona as rotas de characters ao servidor
app.use(powerRoutes); // Adiciona as rotas de powers ao servidor
app.use(domainExpansionsRoutes); // Adiciona as rotas de domainExpansions ao servido
app.use(cors({
	credentials: true,
	origin: '*'
}));

const port = 3333;  // Porta que o servidor vai ouvir

app.listen(port, () => console.log(`Server is running on port ${port}`));  // Inicia o servidor na porta 3333