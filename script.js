let cart = [];

function goTo(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}

function addToCart(name, price) {
    cart.push({
        name: name,
        price: price
    });

    updateCart();

    const msg = document.getElementById("message");
    msg.style.color = "#267342";
    msg.textContent = name + " added to your cart!";
}

function updateCart() {
    document.getElementById("count").textContent = cart.length;

    const list = document.getElementById("cartItems");
    list.replaceChildren();

    if (cart.length === 0) {
        const li = document.createElement("li");
        li.textContent = "Your cart is empty.";
        list.appendChild(li);
    } else {
        cart.forEach(function(item, index) {
            const li = document.createElement("li");

            li.appendChild(
                document.createTextNode(
                    item.name + " - ₹" + item.price + " "
                )
            );

            const btn = document.createElement("button");
            btn.textContent = "Remove";
            btn.className = "remove";

            btn.onclick = function() {
                cart.splice(index, 1);
                updateCart();

                const msg = document.getElementById("message");
                msg.style.color = "#302016";
                msg.textContent = "Item removed from your cart.";
            };

            li.appendChild(btn);
            list.appendChild(li);
        });
    }

    const total = cart.reduce(function(sum, item) {
        return sum + item.price;
    }, 0);

    document.getElementById("total").textContent =
        "Total: ₹" + total;
}

function clearCart() {
    cart = [];
    updateCart();

    const msg = document.getElementById("message");
    msg.style.color = "#302016";
    msg.textContent = "Your cart has been cleared.";
}

function checkout() {
    const msg = document.getElementById("message");

    if (cart.length === 0) {
        msg.style.color = "#b3261e";
        msg.textContent =
            "Please add coffee to your cart before placing an order.";
        return;
    }

    const total = cart.reduce(function(sum, item) {
        return sum + item.price;
    }, 0);

    const orderNumber = Math.floor(
        100000 + Math.random() * 900000
    );

    msg.style.color = "#267342";
    msg.textContent =
        "Order placed successfully! Demo Order No: #" +
        orderNumber +
        ". Total: ₹" + total +
        ". Thank you for choosing CoffeeHouse!";

    cart = [];
    updateCart();
}