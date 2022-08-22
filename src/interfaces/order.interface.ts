interface Order {
  id: number;
  userId: number;
  productsIds: number[];
}

interface OrderToken {
  id: number;
  username: string;
  classe: string;
  level: string;
  password: string;
}

export {
  Order,
  OrderToken,
};