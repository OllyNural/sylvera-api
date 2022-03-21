import { Context } from 'koa';

jest.mock('../database/queries');
import {
    getAllItems,
    getAllCustomers,
    getCustomersByFamilyName,
    createCustomer,
    deleteCustomerById,
  } from "../database/queries";
import { Item } from '../types/data';

import {
    getCustomersByFamilyNameHandler,
    getCustomersHandler,
    createCustomerHandler,
    deleteCustomerByIdHandler,
    getItemsHandler
} from './service';


const getAllItemsMock = getAllItems as jest.MockedFunction<typeof getAllItems>;
const getCustomersByFamilyNameMock = getCustomersByFamilyName as jest.MockedFunction<typeof getCustomersByFamilyName>;
const getAllCustomersMock = getAllCustomers as jest.MockedFunction<typeof getAllCustomers>;
const createCustomerMock = createCustomer as jest.MockedFunction<typeof createCustomer>;
const deleteCustomerByIdMock = deleteCustomerById as jest.MockedFunction<typeof deleteCustomerById>;

describe('Services', () => {
    let ctx = {} as Context;


    beforeEach(() => {
        jest.resetAllMocks();
        ctx = {
          params: {},
          request: {},
          throw: jest.fn(),
        } as unknown as Context;
    })

    describe('getCustomersByFamilyNameHandler', () => {
        it('should return a valid family name list', async () => {
            const customer = {
              id: "12345",
              email: "email@gmail.com",
              given_name: "given_name",
              family_name: "family_name",
            };
            getCustomersByFamilyNameMock.mockResolvedValue([customer])
            ctx.params.customerFamilyName = 'Smith';
            await getCustomersByFamilyNameHandler(ctx);
            expect(getCustomersByFamilyNameMock).toHaveBeenCalledWith('Smith')
            expect(ctx.body).toStrictEqual([customer])
        });
    
        it('should return an empty array if there are no results', async () => {
            getCustomersByFamilyNameMock.mockResolvedValue([])
            ctx.params.customerFamilyName = 'Smith';
            await getCustomersByFamilyNameHandler(ctx);
            expect(getCustomersByFamilyNameMock).toHaveBeenCalledWith('Smith')
            expect(ctx.body).toStrictEqual([])
        });
    });

    describe('getCustomersHandler', () => {
        it('should return all given customers from the DB', async () => {
            const customer = {
                id: "12345",
                email: "email@gmail.com",
                given_name: "given_name",
                family_name: "family_name",
              };
            getAllCustomersMock.mockResolvedValue([customer, customer, customer])
            await getCustomersHandler(ctx);
            expect(ctx.body).toHaveLength(3);
        });
    });

    describe('createCustomerHandler', () => {
        it('should create a customer', async () => {
            const input = {
                email: 'email',
                given_name: 'given_name',
                family_name: 'family_name',
            };
            ctx.request.body = input;
            createCustomerMock.mockResolvedValue([1])
            await createCustomerHandler(ctx);
            expect(ctx.status).toBe(201);
        });

        it('should reject invalid missing input: email', async () => {
            const input = {
                given_name: 'given_name',
                family_name: 'family_name',
            };
            ctx.request.body = input;
            createCustomerMock.mockResolvedValue([1])
            await createCustomerHandler(ctx);
            expect(ctx.throw).toHaveBeenCalled();
        });

        it('should reject invalid missing input: given_name', async () => {
            const input = {
                email: 'email',
                family_name: 'family_name',
            };
            ctx.request.body = input;
            await createCustomerHandler(ctx);
            expect(ctx.throw).toHaveBeenCalled();
        });

        it('should reject invalid missing input: family_name', async () => {
            const input = {
                email: 'email',
                given_name: 'given_name',
            };
            ctx.request.body = input;
            await createCustomerHandler(ctx);
            expect(ctx.throw).toHaveBeenCalled()
        });
    });

    describe('deleteCustomerByIdHandler', () => {
        it('should delete a given Customer by Id', async () => {
            ctx.params.customerId = 'John';
            deleteCustomerByIdMock.mockResolvedValue(1);
            await deleteCustomerByIdHandler(ctx);
            expect(deleteCustomerByIdMock).toHaveBeenCalledWith('John');
            expect(ctx.status).toBe(200);
        });
    });

    describe('getAllItemsHandler', () => {
        it('Should return all items from the DB', async () => {
            const item: Item = {
                id: '12345',
                name: 'table',
                cost: 125,
                supplier: 'Supplier',
            }
            getAllItemsMock.mockResolvedValue([item]);
            await getItemsHandler(ctx);
            expect(ctx.body).toStrictEqual([item]);
        });
    });
});


