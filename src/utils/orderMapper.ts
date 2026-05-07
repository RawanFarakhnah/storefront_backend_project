import { Order } from '../models/order';

type OrderRow = {
  order_id: number;
  status: 'active' | 'complete';
  user_id: number;
  full_name: string;
  product_id: number;
  name: string;
  price: number;
  quantity: number;
};

export function mapOrderRows(rows: OrderRow[]): Order[] {
  const orderList: Order[] = [];
  for (const row of rows) {
    let matchedOrder = orderList.find((o) => o.id === row.order_id);

    // create new order if not found
    if (!matchedOrder) {
      matchedOrder = {
        id: row.order_id,
        status: row.status,
        user_id: row.user_id,
        full_name: row.full_name,
        products: [],
      };

      orderList.push(matchedOrder);
    }

    // push product
    matchedOrder.products.push({
      id: row.product_id,
      name: row.name,
      price: row.price,
      quantity: row.quantity,
    });
  }

  return orderList;
}
