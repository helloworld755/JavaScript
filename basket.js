'use strict';

document.querySelector('.cartIconWrap').addEventListener('click', () => {
  document.querySelector('.basket').classList.toggle('hidden');
});

const basket = {};

let basketCount = document.querySelector('.cartIconWrap span');
let basketPrice = document.querySelector('.basketTotalValue');

document.querySelector('.featuredItems').addEventListener('click', e => {
  if (e.target.closest('.addToCart')) {
    let elem = e.target.closest('.featuredItem');
    let elem_id = +elem.dataset.id;
    let elem_name = elem.dataset.name;
    let elem_price = +elem.dataset.price;
    
    if (elem_id in basket) {
      basket[elem_id].count++;

      let allCount = Object.values(basket).reduce((sum, current) => sum + current.count, 0);
      basketCount.textContent = allCount.toString();
      
      let allPrice = Object.values(basket).reduce((sum, current) => sum + current.price * current.count, 0);
      basketPrice.textContent = allPrice.toFixed(2);

      addItem(elem_id);    
    } else {
      basket[elem_id] = {id: elem_id, name: elem_name, price: elem_price, count: 0};
    }
  } else {
    return;
  }  
});

function addItem(id) {
  let itemLine = document.querySelector('.basket').querySelector(`.basketRow[data-id="${id}"]`);
  if (itemLine) {
     const theItem = basket[id];
     itemLine.querySelector('.productCount').textContent = theItem.count;
     itemLine
      .querySelector('.productTotalRow')
      .textContent = (theItem.price * theItem.count).toFixed(2);
  } else {
    newLine(id);
    return;
  }
}

function newLine(id) {
const line = `
    <div class="basketRow" data-id="${id}">
      <div>${basket[id].name}</div>
      <div>
        <span class="productCount">${basket[id].count}</span>
      </div>
      <div>$${basket[id].price}</div>
      <div>
        $<span class="productTotalRow">${(basket[id].price * basket[id].count).toFixed(2)}</span>
      </div>
    </div>
    `;
  let basketTotal = document.querySelector('.basketTotal');
  basketTotal.insertAdjacentHTML("beforebegin", line);
}