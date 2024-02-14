const buyButton = document.getElementById("buy-btn");

async function makeOrder(amount) {
  try {
    const response = await axios({
      method: "post",
      url: "/order",
      data: { amount },
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });
    console.log(response);
    const { order } = response.data;

    const options = {
      key: "rzp_test_tr0VDfvmHfMiQK",
      amount: order.amount,
      currency: "INR",
      name: "E-Commerce",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id,
      callback_url: "http://localhost:5000/payment-verify",
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
  } catch (e) {
    window.location.replace("/login");
  }
}

buyButton.addEventListener("click", (e) => {
  const amount = document
    .querySelector("#product-price")
    .innerText.split(" ")
    .pop();
  console.log(amount);
  makeOrder(amount);
});
