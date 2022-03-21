export interface Customer {
  id: string;
  email: string;
  given_name: string;
  family_name: string;
}

export interface Item {
  id: string;
  name: string;
  cost: number;
  supplier: string;
}

export interface Order {
  id: string;
  customer_id: string;
  date: string;
}

export interface OrderItem {
  order_id: string;
  item_id: string;
}
