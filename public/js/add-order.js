        const txtCustomerName = document.getElementById('customer-name');
        const txtMealName = document.getElementById("meal-name");
        const txtMealPrice = document.getElementById("meal-price")
        const txtMealQty = document.getElementById("meal-qty");
        const addMealButton = document.getElementById("btn-add-meal");
        const txtInvoiceTotal = document.getElementById("invoice-total");
        const invoiceBody = document.getElementById("invoice-body");
        const btnSaveInvoice = document.getElementById("btn-save-invoice");
        const btnPrint = document.getElementById("btn-print");
        const btnNewInvoice = document.getElementById("btn-new");
        const btnClearMealName = document.getElementById("btn-clear-name");
        const chkIsPaid = document.getElementById('is-paid')

        txtMealName.addEventListener("change", getMealPrice);
        addMealButton.addEventListener("click", addToInvoice)
        btnSaveInvoice.addEventListener("click", saveInvoice);
        btnPrint.addEventListener("click", printInvoice);
        btnNewInvoice.addEventListener("click", newInvoice);
        btnClearMealName.addEventListener("click", clearMealName);
        // txtMealQty.addEventListener("submit", addToInvoice)

        const url = '/meals/get-single-meal'
        let response;
        let meal_json;
        
        async function getMealPrice() {
            const meal_name = txtMealName.value ;
            const data = {"name": meal_name}
              response = await fetch(url,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                body: JSON.stringify(data),
                
            })

            .then(response => response.json())
            .then( (response)=> {
                meal_price = response.price;
                txtMealPrice.value = meal_price;
            } )
            .catch(err => console.log(err))
        }


        let invoiceTotal = 0;
        let counter = 1;
        let invoiceItems = [];
        // execute when click on add button
        function addToInvoice(){
            const name = txtMealName.value;
            const price = parseFloat(txtMealPrice.value);
            const qty = parseInt(txtMealQty.value);
            const total = parseFloat(price * qty);

            // console.log(`type of price ${typeof price}`)
            // console.log(`type of qty ${typeof qty}`)
            // console.log(`type of total ${typeof total}`)
            const item = {
                name,
                price,
                qty,
                total
            }

            invoiceItems.push(item);
            // console.log(invoiceItems);

            if (!name) {
                // console.log('Please Fill all Text Fields')
                alert('Please choose A Meal');
                return;
            }

            if(!qty) {
                alert('Please Enter The Quantity');
                return;
            }

            if(qty < 1 ) {
                alert('Error: The Quantity is less than 1');
                return;
            }

            const card = `<div id="div-${counter}" class="invoice-body__card" style="display:flex">

            <div id="first">
                                
                                <p  style="display: inline;">${name}</p>
                                <p  style="display: inline;">${qty}</p>
                                <p  style="display: inline;">${price}$</p>
                                <p  style="display: inline;">${total}</p>
</first>
                              <div id="second" > 
                               
                                    <button id="btn-${counter}" onClick="deleteItem('div-${counter}',${total})" class="btn btn__green" style="margin:.5rem auto">Delete</button>

                                    <br>
                          </second>



                               
                           </div>     `;

            invoiceBody.innerHTML += card;

            txtMealName.value = '';
            txtMealPrice.value = '';
            txtMealQty.value = '';

            invoiceTotal += total;
            txtInvoiceTotal.innerText= "Invoice Total: " + invoiceTotal ;
            counter += 1;
        }

        function deleteItem(divID, total){
            invoiceTotal -= total; 
            txtInvoiceTotal.innerText= "Invoice Total: " + invoiceTotal ;
            const itemDiv = document.getElementById(divID)

            const mealName = document.querySelector(`#${divID}`).firstElementChild.innerHTML;
            
            itemDiv.remove();
            
            const itemsToRemove = invoiceItems.filter(meal => meal.name === mealName);

            itemsToRemove.forEach(x => invoiceItems.splice(invoiceItems.findIndex(n => n.name === x.name),1));

            // console.log(invoiceItems);
            
        }

        async function saveInvoice(){

            if (txtCustomerName.value === "") {
                alert('Please Enter The Customer Name');
                return;
            }

            if (invoiceItems.length < 1 ){
                alert('Please Insert Some Meals to The Invoice');
                return;
            }

            const isOk = confirm('Do you want to Save The Invoice ?');
            if(isOk){
                try {
                    const url = '/orders';

                    const data = {
                        customer_name :txtCustomerName.value,
                        order_total: invoiceTotal,
                        isPayed: chkIsPaid.checked,
                        Order_Details: invoiceItems
                    }

                    // console.log(data);

                    let response = await fetch(url,{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        "Content-Type": "application/json",
                        },
                    
                    body:JSON.stringify(data),
                    
                }
                )
                // console.log(JSON.stringify(data));    
            } catch (error) {
                console.log(err);
                    return;
                }
            }
            window.location.reload();
        }

        function printInvoice(){
            alert('invoice printed');
        }

        function newInvoice() {
            const isOk = confirm('Do you want to open a new Incoive?')
            if(isOk){
                window.location.reload();
            }
        }

        function clearMealName() {
            txtMealName.value = "";
            txtMealPrice.value = "";
        }