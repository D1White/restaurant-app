export enum OrderStatusEnum {
  accepted = 'ACCEPTED',
  preparing = 'PREPARING',
  awaitingDelivery = 'AWAITING_DELIVERY',
  enRoute = 'EN_ROUTE',
  delivered = 'DELIVERED',
  cancelled = 'CANCELLED',
  completed = 'COMPLETED',
}

export enum PaymenTypeEnum {
  cash = 'CASH',
  card = 'CARD',
}
