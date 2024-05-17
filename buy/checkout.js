// 从本地存储中获取购物车数据
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// 页面加载时生成订单摘要和更新总金额显示
updateOrderSummary();
updateTotal();

// 更新总金额显示
function updateTotal() {
    let totalElement = document.getElementById('total');
    if (!totalElement) return;

    let total = 0;
    // 计算总金额
    cart.forEach(product => {
        total += product.price * product.quantity;
    });

    // 更新总金额显示
    totalElement.textContent = total;
}

// 保存购物车数据到本地存储
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// 下订单动作
function placeOrder() {
    // 这里可以添加下订单的逻辑，比如向服务器发送请求等
    alert('已成功送出訂單');
    cart = [];
    saveCart(); // 更新购物车数据到本地存储
    // 更新订单摘要和总金额显示
    updateOrderSummary();
    updateTotal();
}


function updateOrderSummary() {
    let orderSummaryElement = document.getElementById('orderSummary');
    if (!orderSummaryElement) return;

    // 清空订单摘要
    orderSummaryElement.innerHTML = '';

    // 遍历购物车中的商品生成订单摘要
    cart.forEach((product, index) => { // 添加了 index 参数
        let productSummary = document.createElement('div');
        productSummary.classList.add('product-item'); // 添加商品項目的類別
        productSummary.classList.add('product-info'); // 添加商品資訊的類別
        productSummary.classList.add('product-actions'); // 添加商品操作的類別

        let productName = document.createElement('span'); // 產生商品名稱元素
        productName.textContent = product.name; // 設定商品名稱內容
        productSummary.appendChild(productName); // 將商品名稱加入商品項目

        let productQuantity = document.createElement('span'); // 產生商品數量元素
        productQuantity.textContent = ` x ${product.quantity}`; // 設定商品數量內容
        productSummary.appendChild(productQuantity); // 將商品數量加入商品項目

        let deleteButton = document.createElement('button'); // 產生刪除按鈕元素
        deleteButton.textContent = '删除'; // 設定按鈕文字
        deleteButton.classList.add('delete-button'); // 添加刪除按鈕的類別
        deleteButton.addEventListener('click', function() {
            removeFromCart(index); // 传递索引值
            updateOrderSummary(); // 更新订单摘要显示
            updateTotal(); // 更新总金额显示
        });

        productSummary.appendChild(deleteButton); // 將刪除按鈕加入商品項目

        orderSummaryElement.appendChild(productSummary); // 將商品項目加入订单摘要
    });
}

// 从购物车中删除商品
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart(); // 更新购物车数据到本地存储
}
