import { Router } from 'express';
import domainsExpansionController from '../controllers/domainExpansionsController';

export const domainExpansionsRoutes = Router();

domainExpansionsRoutes.get('/domainExpansions', domainsExpansionController.listAllDomainsExpansion);
domainExpansionsRoutes.post('/domainExpansion', domainsExpansionController.createDomainExpansion);