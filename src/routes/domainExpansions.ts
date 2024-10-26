import { Router } from 'express';
import domainsExpansionController from '../controllers/domainExpansionsController';

export const domainExpansionsRoutes = Router();

domainExpansionsRoutes.get('/domainExpansions', domainsExpansionController.listAllDomainsExpansion);
domainExpansionsRoutes.get('/domainExpansions/:id', domainsExpansionController.listAllDomainsExpansion);
domainExpansionsRoutes.post('/domainExpansion', domainsExpansionController.createDomainExpansion);
domainExpansionsRoutes.get('/', (req: Request, res: Response) => {
    return res.send("ok")
});