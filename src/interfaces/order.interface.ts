interface Order {
  id: number;
  userId: number;
  productsIds: number[];
}

interface OrderWithourProductsIds {
  id: number;
  userId: number;
}

export {
  Order,
  OrderWithourProductsIds,
};