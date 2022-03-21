
import { Context } from 'koa';
import koaRouter from 'koa-router';
const router = new koaRouter();

import {
  getCustomersByFamilyNameHandler,
  getCustomersHandler,
  createCustomerHandler,
  deleteCustomerByIdHandler,
  getItemsHandler,
} from '../services/service';

router.get('/healthcheck', (ctx: Context) => {
  ctx.status = 200;
});

/**
 * Customers
 */
router.get('/customers/:customerFamilyName', getCustomersByFamilyNameHandler);

router.get('/customers', getCustomersHandler);

router.post('/customers', createCustomerHandler);

router.delete('/customers/:customerId', deleteCustomerByIdHandler);

/**
 * Items
 */
router.get('/items', getItemsHandler);

export { router };
