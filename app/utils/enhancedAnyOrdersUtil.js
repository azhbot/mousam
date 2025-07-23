export const enhancedAnyOrdersUtil = (anyOrders) => {
  const groupedMap = {};

  anyOrders.forEach((order) => {
    if (!order.groupId) return;
    if (!groupedMap[order.groupId]) groupedMap[order.groupId] = [];
    groupedMap[order.groupId].push(order);
  });

  return anyOrders.map((order) => {
    if (!order.groupId || !groupedMap[order.groupId]) return order;
    const group = groupedMap[order.groupId];
    const index = group.findIndex((o) => o.id === order.id);
    return {
      ...order,
      groupPosition: `(${index + 1}/${group.length})`,
    };
  });
};
