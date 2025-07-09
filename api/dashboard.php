<?php
// Fetch real-time sales and orders data from the database
$sales = getSalesData();
$orders = getOrdersData();

// Return the data as a JSON response
http_response_code(200);
echo json_encode(['sales' => $sales, 'orders' => $orders]);

function getSalesData() {
  // Implement the logic to fetch sales data from the database
  return [
    'total_sales' => 12345.67,
    'daily_sales' => 1234.56,
    'weekly_sales' => 7890.12
  ];
}

function getOrdersData() {
  // Implement the logic to fetch orders data from the database
  return [
    'total_orders' => 100,
    'pending_orders' => 20,
    'completed_orders' => 80
  ];
}