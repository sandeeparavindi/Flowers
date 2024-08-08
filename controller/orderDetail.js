$(document).ready(function() {
    // Function to load order details
    function loadOrderDetails(searchTerm = "") {
        $.ajax({
            url: "http://localhost:8080/Flowers_war_exploded/orders",
            type: "GET",
            contentType: "application/json",
            success: function(response) {
                var orderDetailsTable = $('#orderDetailsTable');
                orderDetailsTable.empty(); 

                // If a search term is provided, filter the results
                if (searchTerm) {
                    var foundOrder = response.find(order => order.orderId === searchTerm);
                    if (foundOrder) {
                        appendOrderToTable(foundOrder, orderDetailsTable);
                    } else {
                        orderDetailsTable.append(`<tr><td colspan="8">No order found with ID ${searchTerm}</td></tr>`);
                    }
                } else {
                    // If no search term, display all orders
                    response.forEach(function(order) {
                        appendOrderToTable(order, orderDetailsTable);
                    });
                }
            },
            error: function(xhr, status, error) {
                console.error("Failed to load order details:", status, error);
            }
        });
    }

    // Helper function to append an order to the table
    function appendOrderToTable(order, tableElement) {
        var newRow = `
            <tr>
                <td>${order.orderId}</td>
                <td>${order.orderDate}</td>
                <td>${order.customerId}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>${order.discount.toFixed(2)}</td>
                <td>${order.subTotal.toFixed(2)}</td>
                <td>${order.cash.toFixed(2)}</td>
                <td>${order.balance.toFixed(2)}</td>
            </tr>
        `;
        tableElement.append(newRow);
    }

    // Load the order details when the page loads
    loadOrderDetails();

    // Event listener for the search input
    $('#searchOrder').on('input', function() {
        var searchTerm = $(this).val();
        loadOrderDetails(searchTerm); 
    });

    // Optional: Automatically refresh the table every 60 seconds
    // setInterval(function() {
    //     var searchTerm = $('#searchOrder').val();
    //     loadOrderDetails(searchTerm);
    // }, 60000); 
});
