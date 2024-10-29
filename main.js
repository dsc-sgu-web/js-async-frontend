import "./style.css";

const statusElement = document.getElementById("status");
const listElement = document.getElementById("products");

function productToTag(p) {
  return `<li>${p.name} | ${p.price} рублей | ${p.description} | ${p.price}</li>`;
}

async function loadProducts() {
  statusElement.innerText = "Загрузка...";

  const res = await fetch("http://localhost:8000/products").then((r) =>
    r.json(),
  );
  const products = res.map(productToTag).join("\n");

  statusElement.innerText = "Загружено!";
  listElement.innerHTML = products;
}

loadProducts();

const addButton = document.getElementById("addbtn");
addButton.addEventListener("click", async () => {
  const name = prompt("Введите название");
  const price = parseInt(prompt("Введите цену"));
  const description = prompt("Введите описание");
  const article = prompt("Введите артикул");

  statusElement.innerText = "Отправляем товар...";

  await fetch("http://localhost:8000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ name, price, description, article }),
  });

  statusElement.innerText = "Товар отправлен!";
  setTimeout(loadProducts, 1000);
});
