function generateOrderId() {
    const orderId = 'ORD-' + Math.floor(Math.random() * 1000000);
    document.getElementById('orderId').value = orderId;
}

// Auto-fill Order Date with the current date
function fillOrderDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('orderDate').value = today;
}

// Call the functions when the page loads
window.onload = function() {
    generateOrderId();
    fillOrderDate();
};

$(document).ready(function() {
    // Load customers and populate the dropdown
    function loadCustomers() {
        $.ajax({
            url: "http://localhost:8080/Flowers_war_exploded/customer",
            type: "GET",
            contentType: "application/json",
            success: function (response) {
                var customerDropdown = $('#orderCustomerId');
                customerDropdown.empty();
                customerDropdown.append('<option selected>Select Customer ID</option>');
                response.forEach(function(customer) {
                    customerDropdown.append(`<option value="${customer.id}">${customer.id}</option>`);
                });

                // When customer is selected, fill in the name
                customerDropdown.change(function() {
                    var selectedCustomerId = $(this).val();
                    var selectedCustomer = response.find(c => c.id === selectedCustomerId);
                    $('#orderCustomerName').val(selectedCustomer ? selectedCustomer.name : '');
                });
            },
            error: function (xhr, status, error) {
                console.error("Error:", status, error);
            }
        });
    }

    // Load items and populate the dropdown
    function loadItems() {
        $.ajax({
            url: "http://localhost:8080/Flowers_war_exploded/item",
            type: "GET",
            contentType: "application/json",
            success: function (response) {
                var itemDropdown = $('#selectItemCode');
                itemDropdown.empty();
                itemDropdown.append('<option selected>Select Item Code</option>');
                response.forEach(function(item) {
                    itemDropdown.append(`<option value="${item.code}">${item.code}</option>`);
                });

                // When item is selected, fill in the name and price
                itemDropdown.change(function() {
                    var selectedItemCode = $(this).val();
                    var selectedItem = response.find(i => i.code === selectedItemCode);
                    $('#selectItemName').val(selectedItem ? selectedItem.description : '');
                    $('#selectItemPrice').val(selectedItem ? selectedItem.price : '');
                });
            },
            error: function (xhr, status, error) {
                console.error("Error:", status, error);
            }
        });
    }

    loadCustomers();
    loadItems();
});

