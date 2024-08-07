$(document).ready(function() {
    // Navigation bar click event
    $('.nav-link').click(function() {
        var section = $(this).data('section');
        $('.section').removeClass('active');
        $('#' + section).addClass('active');
    });

    document.getElementById('submitCustomer').addEventListener('click', function() {
        // const customerId = document.getElementById('customerId').value;
        const customerName = document.getElementById('customerName').value;
        const customerAddress = document.getElementById('customerAddress').value;
        const customerMobile = document.getElementById('customerMobile').value;

        const customerData = {
            // id: customerId,
            name: customerName,
            address: customerAddress,
            mobile: customerMobile
        };

        const customerJSON = JSON.stringify(customerData);

        $.ajax({
            url: "http://localhost:8080/Flowers_war_exploded/customer",
            type: "POST",
            data: customerJSON,
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                console.log("Customer saved successfully:", response);
            },
            error: function (xhr, status, error) {
                console.error("Error:", status, error);
            }
        });
    });
    
    $(document).ready(function() {
        // Fetch and display customer data
        function loadCustomers() {
            $.ajax({
                url: "http://localhost:8080/Flowers_war_exploded/customer",
                type: "GET",
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    var customerTable = $('#customerTable');
                    customerTable.empty(); // Clear existing data
                    response.forEach(function(customer) {
                        var row = '<tr class="new-row">' +
                            '<td>' + customer.id + '</td>' +
                            '<td>' + customer.name + '</td>' +
                            '<td>' + customer.address + '</td>' +
                            '<td>' + customer.mobile + '</td>' +
                            '</tr>';
                        customerTable.append(row);
                    });
                    // Highlight new rows briefly
                    // $('.new-row').css('background-color', '#d4edda');
                    // setTimeout(function() {
                    //     $('.new-row').css('background-color', '');
                    // }, 1000);
                },
                error: function (xhr, status, error) {
                    console.error("Error:", status, error);
                }
            });
        }
        
    
        // Load customers on page load
        loadCustomers();
    
        // Poll for new data every 5 seconds
        setInterval(loadCustomers, 5000);
    });
});
