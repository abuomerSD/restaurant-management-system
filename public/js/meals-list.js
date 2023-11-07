async function updateMeal(id) {
    
    await fetch(`/meals/${id}`, {
        method: "GET",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                "Content-Type": "application/json",
                },
                // body:JSON.parse(JSON.stringify(data))
    })
    // window.location.reload();
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