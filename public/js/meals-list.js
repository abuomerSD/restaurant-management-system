async function updateMeal(id) {
    const name = prompt('Please Enter the new Meal Name');
    const price = prompt('Please Enter the new Meal Price');

    console.log(`${name} ${price}`)
    await fetch(`/meals/${id}`, {
        method: "PUT",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                "Content-Type": "application/json",
                },
                body:{
                    name:name,
                    price: Number(price)
                }
    })
}

async function deleteMeal(id) {
    const isOk = confirm('Do you want to delete this meal ?')
    if(isOk) {
        await fetch(`/meals/${id}`, {
            method: "DELETE",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    "Content-Type": "application/json",
                    },
        })
    }
    
}

console.log('test')