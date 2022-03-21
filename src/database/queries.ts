import knex from './client';

import { Item, Customer } from '../types/data';

import { v4 as uuidv4 } from 'uuid';

const getAllItems = async () => {
  const items = await knex<Item>('items').select();
  return items;
};

const getAllCustomers = async () => {
  const customers = await knex<Customer>('customers').select();
  return customers;
};

const getCustomersByFamilyName = async (familyName: string) => {
  const customers = await knex<Customer>('customers').select().where('family_name', familyName);
  return customers;
};

const createCustomer = async ({
  email,
  given_name,
  family_name,
}: {
  email: string;
  given_name: string;
  family_name: string;
}) => {
  const uuid = uuidv4;
  const created = await knex<Customer>('customers').insert({
    id: uuid(),
    email,
    given_name,
    family_name,
  });
  return created;
};

const deleteCustomerById = async (customerId: string) => {
  const deleted = await knex<Customer>('customers').where('id', customerId).delete();
  return deleted;
};

export { getAllItems, getAllCustomers, getCustomersByFamilyName, createCustomer, deleteCustomerById };
