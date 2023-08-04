// Fetch API
const listContainer = document.getElementById("productList");
const cartShow = document.getElementById("shop-cart");
const closeCart = document.querySelector(".close-cart");
let productsStatement = [];
let cartStatement = [];

fetch("https://voodoo-sandbox.myshopify.com/products.json?limit=24")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    productsStatement = [...data.products];

    // CardList render

    productsStatement.forEach((product) => {
      const listItem = document.createElement("li");
      listItem.classList.add(
        "flex",
        "flex-col",
        "justify-between",
        "w-card",
        "z-10",
        "gap-y-3",
        "product-card",
        "relative",
        "before:absolute",
        "before:block",
        "before:h-smicons",
        "before:content-['USED']",
        "before:text-beforetag",
        "before:px-2",
        "before:py-1.5",
        "before:text-bglight",
        "before:bg-primary",
        "before:border",
        "before:border-transparent",
        "before:rounded",
        "before:text-center",
        "before:left-3.5",
        "before:top-3.5"
      );
      listItem.dataset.id = product.id;

      const cardPic = document.createElement("img");
      if (product.images && product.images[0] && product.images[0].src) {
        cardPic.src = product.images[0].src;
        cardPic.alt = product.title;
        cardPic.classList.add(
          "border",
          "border-primary",
          "rounded",
          "w-full",
          "h-card",
          "p-3",
          "m-0"
        );
      } else {
        cardPic.src = "https://placekitten.com/300/300"; // placeholder image URL for absent in {} pics
        cardPic.alt = "Product Image";
        cardPic.classList.add(
          "border",
          "border-primary",
          "rounded",
          "w-full",
          "h-card",
          "p-3",
          "m-0"
        );
      }

      const infoDiv = document.createElement("div");
      infoDiv.classList.add("flex", "flex-row", "justify-between");

      const cardInfoCont = document.createElement("div");
      cardInfoCont.classList.add("font-bold", "text-sm");

      const cardName = document.createElement("p");
      cardName.textContent = product.title;

      const cardPrice = document.createElement("p");
      cardPrice.textContent = `${product.variants[0].price} KR.`;
      cardPrice.classList.add("uppercase");

      const conditionDiv = document.createElement("div");
      conditionDiv.classList.add("font-normal", "text-sm", "text-end");

      const conditionCapture = document.createElement("p");
      conditionCapture.textContent = "Condition";
      conditionCapture.classList.add("font-medium");

      const conditionStatus = document.createElement("p");
      conditionStatus.textContent = "Slightly used";

      const add2CartBtn = document.createElement("a");
      add2CartBtn.href = "#";
      add2CartBtn.textContent = "ADD TO CART";
      add2CartBtn.classList.add(
        "a2c",
        "p-4",
        "bg-primary",
        "rounded",
        "text-center",
        "text-hover",
        "font-bold",
        "text-add2cart"
      );

      // shop-cart Card render

      function renderCartList() {
        const cartList = cartShow.querySelector(".shop-cart__list");
        cartList.innerHTML = "";
        let total = 0;
        cartStatement.forEach((el) => {
          const li = document.createElement("li");
          li.className =
            "shopcard__item flex flex-row justify-between items-start last:mb-8 gab-x-[18px]";
          li.dataset.id = el.itemId;

          const itemPic = document.createElement("img");
          itemPic.className = "h-smcard w-smcard border border-bglight rounded";
          if (el.product.images.length > 0) {
            itemPic.src = el.product.images[0].src;
          } else {
            itemPic.src = "https://placekitten.com/74/74";
          }
          itemPic.alt = "card picture";

          const cartWrapper = document.createElement("div");
          cartWrapper.className =
            "flex flex-col justify-start items-start gap-y-3 text-basic text-bglight font-bold min-w-[231px] h-[70px]";

          const cartName = document.createElement("p");
          cartName.textContent = `${el.product.title}`;

          const cartPrice = document.createElement("p");
          cartPrice.textContent = `${
            el.product.variants[0].price * el.quantity
          } KR.`;

          const minusItem = document.createElement("button");
          minusItem.className = "w-5 h-5";
          minusItem.textContent = `-`;

          const quantityItem = document.createElement("span");
          quantityItem.textContent = `${el.quantity}`;

          const plusItem = document.createElement("button");
          plusItem.className = "w-5 h-5";
          plusItem.textContent = `+`;

          const miniQuantWrap = document.createElement("div");

          const removeItem = document.createElement("a");
          removeItem.href = "#";
          removeItem.className = "remove__link";
          const binIcon = document.createElement("img");
          binIcon.src = "./img/delete-bin.svg";
          binIcon.alt = "remove item icon";

          cartList.append(li);
          li.append(itemPic, cartWrapper, removeItem);
          removeItem.append(binIcon);
          cartWrapper.append(cartName, cartPrice, miniQuantWrap);
          miniQuantWrap.append(minusItem, quantityItem, plusItem);

          // Item remove (BIN ICON)
          removeItem.addEventListener("click", (e) => {
            if (e.target.closest(".remove__link")) {
              e.preventDefault();

              const idToDelete =
                +e.target.closest(".shopcard__item").dataset.id; // нашли айди товара, который будем удалять
              cartStatement = cartStatement.filter(
                (e) => e.itemId !== idToDelete
              ); // удалили товар из корзины по айди
              renderCartList(); // запустили ререрндер корзины с новым списком
            }
          });

          // manual minus
          minusItem.addEventListener("click", (e) => {
            const idToDecrease =
              +e.target.closest(".shopcard__item").dataset.id;
            cartStatement = cartStatement.map((e) => {
              if (e.itemId === idToDecrease && e.quantity > 1) {
                --e.quantity;
              }
              return e;
            });
            renderCartList();
          });

          // plus
          plusItem.addEventListener("click", (e) => {
            const idToIncrease =
              +e.target.closest(".shopcard__item").dataset.id;
            cartStatement = cartStatement.map((e) => {
              if (e.itemId === idToIncrease) {
                ++e.quantity;
              }
              return e;
            });
            renderCartList();
          });

          total += el.product.variants[0].price * el.quantity; // calculating total
        });
        // Total Price render
        const totalWrap = document.getElementById("totalWrap");
        totalWrap.innerHTML = "";

        const totalText = document.createElement("p");
        totalText.textContent = `TOTAL`;
        const fullPrice = document.createElement("p");
        fullPrice.className = "fullprice__total";
        fullPrice.textContent = `${total} KR.`;

        totalWrap.append(totalText, fullPrice);

        // Total Price render END
      }

      // Shopping Cart listener

      add2CartBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        cartShow.classList.remove("hidden");

        // Состояние. Удаление айди карточки для дальнейшего удаления товара в корзине
        let itemId = e.target.closest(".product-card").dataset.id; // берём айди товара, который надо добавить в корзину
        let itemToAdd = productsStatement.find((elem) => elem.id === +itemId); // находим по айди весь объект товара
        if (itemToAdd) {
          //проверка что мы нашли этот товар
          const cartIndex = cartStatement.findIndex(
            // ищем, есть ли этот товар уже в корзине
            (el) => el.itemId === +itemId
          );
          if (cartIndex < 0) {
            // если товара в корзине нет
            cartStatement.push({
              // создаём для него новую запись в списке товаров в корзине
              product: itemToAdd,
              quantity: 1,
              itemId: +itemId,
            });
          } else {
            // если товар есть
            cartStatement[cartIndex].quantity++; // увеличиваем количество
          }

          renderCartList(); // запускаем ререндер корзины с новым списком товаров
        }
      });

      cardInfoCont.appendChild(cardName);
      cardInfoCont.appendChild(cardPrice);

      conditionDiv.appendChild(conditionCapture);
      conditionDiv.appendChild(conditionStatus);

      infoDiv.appendChild(cardInfoCont);
      infoDiv.appendChild(conditionDiv);

      listItem.appendChild(cardPic);
      listItem.appendChild(infoDiv);
      listItem.appendChild(add2CartBtn);

      listContainer.appendChild(listItem);
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

// Close the cart if Misclicked

// document.addEventListener("click", (e) => {
//   e.stopPropagation();
//   if (
//     !e.target.closest("#shop-cart") ||
//     !e.target.closest(".remove__link") ||
//     !e.target.closest(".a2c")
//   ) {
//     e.target.closest("#shop-cart").remove();
//   }
// });

// SHOPiCON CLICKED

const shopIcon = document.getElementById("shop-icon");
shopIcon.addEventListener("click", (e) => {
  e.stopPropagation();
  cartShow.classList.toggle("hidden");
  cartShow.classList.add(".cardHere");
});

//  Close Icon Clicked
closeCart.addEventListener("click", (e) => {
  e.stopPropagation();
  cartShow.classList.toggle("hidden");
});
