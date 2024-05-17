// scripts.js

// 初始化购物车，如果本地存储中有购物车数据则加载，否则创建一个空购物车
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// 添加商品到购物车
function addToCart(productName, price) {
  alert('加入成功');
  let found = false;
  // 遍历购物车检查是否已经存在同名商品
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === productName) {
      cart[i].quantity++; // 增加数量
      found = true;
      break;
    }
  }
  if (!found) {
    // 如果购物车中没有同名商品，则添加新商品到购物车
    cart.push({ name: productName, price: price, quantity: 1 });
  }
  saveCart();
}

// 从购物车中删除商品
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
}

// 保存购物车数据到本地存储
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}
