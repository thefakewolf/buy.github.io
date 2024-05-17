// 从本地存储中获取购物车数据，如果不存在则初始化为空数组
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// 添加到购物车
function addToCart(productName, price) {
  let existingProductIndex = cart.findIndex(product => product.name === productName);

  if (existingProductIndex !== -1) {
    // 如果购物车中已经存在相同商品，则增加数量
    cart[existingProductIndex].quantity++;
  } else {
    // 否则，将新商品添加到购物车
    cart.push({ name: productName, price: price, quantity: 1 });
  }
  
  saveCart(); // 更新购物车数据到本地存储
  updateCartDisplay(); // 更新购物车显示
  animateCartItem(existingProductIndex !== -1 ? existingProductIndex : cart.length - 1); // 动画提示
  alert('已成功加入購物車');
}

// 更新购物车显示
function updateCartDisplay() {
  // 获取总金额显示元素
  let totalElement = document.getElementById('total');
  if (!totalElement) return; // 如果找不到元素，则返回

  // 获取商品列表容器
  let productList = document.getElementById('productList');
  if (!productList) return; // 如果找不到元素，则返回
  
  // 清空商品列表和总金额显示
  productList.innerHTML = '';
  totalElement.textContent = '0';

  let total = 0; // 初始化总额
  // 遍历购物车数据，将每个商品添加到商品列表中，并累加总额
  cart.forEach((product, index) => {
    let listItem = document.createElement('li');
    listItem.classList.add('product-item');
  
    let productInfo = document.createElement('div');
    productInfo.classList.add('product-info');
    productInfo.textContent = product.name + ' - $' + (product.price * product.quantity) + ' x ' + product.quantity;
  
    let productActions = document.createElement('div');
    productActions.classList.add('product-actions');

    let quantityInput = document.createElement('input');
    quantityInput.classList.add('quantity');
    quantityInput.type = 'number';
    quantityInput.value = product.quantity;
    quantityInput.min = 1;
    quantityInput.addEventListener('change', function() {
      changeQuantity(index, parseInt(this.value));
    });

    let deleteButton = document.createElement('button');
    deleteButton.textContent = '删除';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function() {
      removeFromCart(index);
      updateCartDisplay(); // 更新购物车显示
    });

    productActions.appendChild(quantityInput);
    productActions.appendChild(deleteButton);

    listItem.appendChild(productInfo);
    listItem.appendChild(productActions);
  
    productList.appendChild(listItem);
    total += product.price * product.quantity; // 累加总额
  });

  // 更新总额显示
  totalElement.textContent = total;
}

// 商品数量改变
function changeQuantity(index, newQuantity) {
  if (newQuantity < 1) {
    removeFromCart(index);
  } else {
    cart[index].quantity = newQuantity;
    saveCart(); // 更新购物车数据到本地存储
    updateCartDisplay(); // 更新购物车显示
  }
}

// 动画提示
function animateCartItem(index) {
  let productItems = document.querySelectorAll('.product-item');
  if (productItems.length === 0) return; // 如果商品列表为空，则返回
  let item = index !== -1 ? productItems[index] : productItems[productItems.length - 1];
  item.classList.add('animate');
  setTimeout(function() {
    item.classList.remove('animate');
  }, 1000); // 1秒后移除动画类
}

// 从购物车中移除商品
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart(); // 更新购物车数据到本地存储
}

// 更新购物车数据到本地存储
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// 页面加载时更新购物车显示
updateCartDisplay();
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("back-to-top").style.display = "block";
    } else {
        document.getElementById("back-to-top").style.display = "none";
    }
}

function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}