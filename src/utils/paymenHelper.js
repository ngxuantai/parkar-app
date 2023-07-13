// Hàm tạo transactionRef
function createTransactionRef(userId) {
  // Lấy timestamp hiện tại
  const timestamp = new Date().getTime();

  // Tạo transactionRef bằng cách kết hợp userId, transactionType và timestamp
  const transactionRef = `TXN${userId}-${timestamp}`;

  return transactionRef;
}

// Hàm tạo orderInfo
function createOrderInfo(cost) {
  const orderInfo = `Tổng tiền: ${cost} VND`;

  return orderInfo;
}

export { createTransactionRef, createOrderInfo };
