document.addEventListener("DOMContentLoaded", () => {
    
    // Track items currently in the cart
    let cart = [];

    // DOM Elements
    const cartBtn = document.getElementById("cartBtn");
    const cartCountElement = document.getElementById("cartCount");
    const cartModal = document.getElementById("cartModal");
    const closeCartBtn = document.getElementById("closeCartBtn");
    const cartItemsList = document.getElementById("cartItemsList");
    const modalCartCount = document.getElementById("modalCartCount");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    // 1. Add Item to Cart Array
    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Find the item details from the HTML elements nearby
            const productCard = button.parentElement;
            const itemName = productCard.querySelector("h3").textContent;
            const itemPrice = productCard.querySelector(".price").textContent;

            // Save to our cart tracking system
            cart.push({ name: itemName, price: itemPrice });
            
            // Update counts across the site
            updateCartUI();

            // Quick visual button animation
            const originalText = button.textContent;
            button.textContent = "Added!";
            button.style.backgroundColor = "#2ecc71";
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = "";
            }, 1000);
        });
    });

    // 2. Update the Cart UI List inside the Modal (with active deletion rules)
    function updateCartUI() {
        // Update top navigation count
        cartCountElement.textContent = cart.length;
        // Update inside popup count
        modalCartCount.textContent = cart.length;

        // Clear previous list items to avoid duplicates
        cartItemsList.innerHTML = "";

        if(cart.length === 0) {
            cartItemsList.innerHTML = "<li style='color: #aaa; text-align: center; padding: 20px 0;'>Your cart is empty</li>";
            return;
        }

        // Render each item dynamically with a unique index reference
        cart.forEach((item, index) => {
            const li = document.createElement("li");
            
            li.innerHTML = `
                <div>
                    <span>${item.name}</span>
                    <strong style="margin-left: 10px;">${item.price}</strong>
                </div>
                <button class="remove-item-btn" data-index="${index}">✕ Remove</button>
            `;
            
            cartItemsList.appendChild(li);
        });

        // 3. Attach active click listeners to all freshly rendered Remove buttons
        const removeButtons = document.querySelectorAll(".remove-item-btn");
        removeButtons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                // Get the exact item index number from the data attribute
                const itemIndex = parseInt(e.target.getAttribute("data-index"));
                
                // Remove 1 single item at that index array spot
                cart.splice(itemIndex, 1);
                
                // Redraw UI to reflect the removal
                updateCartUI();
            });
        });
    }

    // 4. Open Modal when clicking top-right Cart item
    cartBtn.addEventListener("click", () => {
        cartModal.classList.remove("hidden-modal");
    });

    // 5. Close Modal when clicking 'X'
    closeCartBtn.addEventListener("click", () => {
        cartModal.classList.add("hidden-modal");
    });

    // 6. Close Modal if user clicks outside of the pop-up box window
    window.addEventListener("click", (e) => {
        if (e.target === cartModal) {
            cartModal.classList.add("hidden-modal");
        }
    });

    // Newsletter Code remains intact below
    const newsletterForm = document.getElementById("newsletterForm");
    const emailInput = document.getElementById("emailInput");
    const formMessage = document.getElementById("formMessage");

    newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const emailValue = emailInput.value.trim();
        if(emailValue) {
            formMessage.textContent = `Thank you! ${emailValue} has been subscribed to insider deals.`;
            formMessage.className = "success";
            emailInput.value = "";
        }
    });
});
    // 7. Contact Form Simulation
    const contactForm = document.getElementById("contactForm");
    if(contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thank you for reaching out! A gear expert will contact you shortly.");
            contactForm.reset();
        });
    }
