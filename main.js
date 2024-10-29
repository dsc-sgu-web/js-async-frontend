import "./style.css";

const statusElement = document.getElementById("status");
const listElement = document.getElementById("products");

function productToTag(p) {
  return `<li>${p.name} | ${p.price} рублей | ${p.description} | ${p.price}</li>`;
}

function loadProducts() {
  statusElement.innerText = "Загрузка...";

  fetch("http://localhost:8000/products")
    .then((r) => r.json())
    .then((j) => j.map(productToTag).join("\n"))
    .then((p) => {
      statusElement.innerText = "Загружено!";
      listElement.innerHTML = p;
    });
}

loadProducts();

const addButton = document.getElementById("addbtn");
addButton.addEventListener("click", () => {
  const name = prompt("Введите название");
  const price = parseInt(prompt("Введите цену"));
  const description = prompt("Введите описание");
  const article = prompt("Введите артикул");

  statusElement.innerText = "Отправляем товар...";
  fetch("http://localhost:8000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ name, price, description, article }),
  }).then(() => {
    statusElement.innerText = "Товар отправлен!";
    setTimeout(loadProducts, 1000);
  });
});
