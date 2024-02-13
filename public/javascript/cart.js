// JavaScript code to handle removing items from the cart
// Assuming you have some button with a class 'remove-item' to trigger the removal

document.querySelectorAll(".remove-item").forEach((button) => {
  button.addEventListener("click", async (event) => {
    const productId = button.dataset.productId;

    try {
      const response = await fetch(`/user/cart/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }

      const data = await response.json();
      if (data.success) {
        // Item removed successfully, update UI as needed (e.g., remove the item from the DOM)
        button.closest(".cart-item").remove();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show an error message to the user)
    }
  });
});
