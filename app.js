const productList = document.querySelector('#products');
const addProductForm = document.querySelector('#add-product-form');
const updateProductForm = document.querySelector('#update-product-form');
const updateProductId = document.querySelector('#update-id');
const updateProductName = document.querySelector('#update-name');
const updateProductPrice = document.querySelector('#update-price');

// Função para buscar todos os produtos
async function fetchProducts() {
  const response = await fetch('http://3.145.32.108:3000/products');
  const products = await response.json();

  productList.innerHTML = '';
  products.forEach(renderProduct);
}

// Função para renderizar um produto
function renderProduct(product) {
  const li = document.createElement('li');
  li.innerHTML = `
    ${product.name} - $${product.price.toFixed(2)}
    <button onclick="deleteProduct(${product.id})">Delete</button>
    <button onclick="populateUpdateForm(${JSON.stringify(product)})">Edit</button>
  `;
  productList.appendChild(li);
}

// Função para adicionar um produto
addProductForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = addProductForm.name.value;
  const price = parseFloat(addProductForm.price.value);

  const response = await fetch('http://3.145.32.108:3000/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, price }),
  });

  if (response.ok) {
    addProductForm.reset();
    fetchProducts();
  } else {
    alert('Failed to add product');
  }
});

// Função para popular o formulário de atualização
function populateUpdateForm(product) {
  updateProductId.value = product.id;
  updateProductName.value = product.name;
  updateProductPrice.value = product.price;
}

// Função para atualizar um produto
updateProductForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const id = updateProductId.value;
  const name = updateProductName.value;
  const price = parseFloat(updateProductPrice.value);

  const response = await fetch(`http://3.145.32.108:3000/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, price }),
  });

  if (response.ok) {
    updateProductForm.reset();
    fetchProducts();
  } else {
    alert('Failed to update product');
  }
});

// Função para deletar um produto
async function deleteProduct(id) {
  const response = await fetch(`http://3.145.32.108:3000/products/${id}`, { method: 'DELETE' });

  if (response.ok) {
    fetchProducts();
  } else {
    alert('Failed to delete product');
  }
}

// Buscar produtos ao carregar a página
fetchProducts();
