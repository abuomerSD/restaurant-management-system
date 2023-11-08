async function updateMeal(id) {
    const name = prompt('Please Enter The new Meal Name');
    const price = prompt('Please Enter The new Meal Price');

    const data = {
        name, price
    }

    await fetch(`/meals/${id}`, {
        method: "PUT",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                "Content-Type": "application/json",
                },
                body:JSON.stringify(data)
    })
    window.location.reload();
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
        window.location.reload();
    }
    
}

console.log('test')