import { Context } from 'koa';
import {
  getAllItems,
  getAllCustomers,
  getCustomersByFamilyName,
  createCustomer,
  deleteCustomerById,
} from '../database/queries';
import { logger } from '../middleware/logger';

const getCustomersByFamilyNameHandler = async (ctx: Context) => {
  try {
    const customer = await getCustomersByFamilyName(
      ctx.params.customerFamilyName,
    );
    if (customer.length) {
      ctx.body = customer;
    } else {
      logger.warn({ message: 'Customer not found in Database' });
      ctx.body = [];
    }
  } catch (e) {
    ctx.throw(500);
  }
};

const getCustomersHandler = async (ctx: Context) => {
  try {
    const customers = await getAllCustomers();
    ctx.body = customers;
  } catch (e) {
    ctx.throw(500);
  }
};

const createCustomerHandler = async (ctx: Context) => {
  const { email, given_name, family_name } = ctx.request.body;

  // Validate queries
  if (!email || !given_name || !family_name) {
    const errorMessage = `${
      (!email && 'email') ||
      (!given_name && 'given_name') ||
      (!family_name && 'family_name')
    } is missing`;

    ctx.throw(400, errorMessage);
  } 
  // Else hack, real behaviour ctx.throw would throw exception, but we are mocking it, see README
  else {
    try {
      const created = await createCustomer({ email, given_name, family_name });
      if (!created) {
        logger.error({ message: 'Error creating customer' });
        ctx.throw(500);
      }
      ctx.status = 201;
    } catch (e) {
      logger.error({ e, message: 'Error creating customer' });
      ctx.throw(500);
    }
  }
};

const deleteCustomerByIdHandler = async (ctx: Context) => {
  const customerId = ctx.params.customerId;

  try {
    await deleteCustomerById(customerId);
    ctx.status = 200;
  } catch (e) {
    logger.error({ e, message: 'Error deleting customer' });
    ctx.throw(500);
  }
};

const getItemsHandler = async (ctx: Context) => {
  try {
    const customers = await getAllItems();
    ctx.body = customers;
  } catch (e) {
    ctx.throw(500);
  }
};

export {
    getCustomersByFamilyNameHandler,
    getCustomersHandler,
    createCustomerHandler,
    deleteCustomerByIdHandler,
    getItemsHandler,
};
