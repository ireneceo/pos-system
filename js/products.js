// 상품 데이터 저장
let products = [
  { id: 1, name: '상품 A', price: 10000, stock: 50 },
  { id: 2, name: '상품 B', price: 15000, stock: 30 },
  { id: 3, name: '상품 C', price: 20000, stock: 20 },
];

// 상품 목록 출력
function displayProducts() {
  const tableBody = document.querySelector('.product-list tbody');
  tableBody.innerHTML = '';

  products.forEach(product => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.price.toLocaleString()}원</td>
      <td>${product.stock}개</td>
      <td>
        <button class="edit-btn">수정</button>
        <button class="delete-btn">삭제</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// 상품 등록
const productForm = document.querySelector('.product-form form');
productForm.addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('product-name').value;
  const price = parseInt(document.getElementById('product-price').value);
  const stock = parseInt(document.getElementById('product-stock').value);

  const newProduct = { id: products.length + 1, name, price, stock };
  products.push(newProduct);

  displayProducts();

  // 입력 필드 초기화
  productForm.reset();
});

// 초기 상품 목록 출력
displayProducts();