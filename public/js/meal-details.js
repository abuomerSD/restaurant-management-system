const txtName = document.getElementById('name');
const txtPrice = document.getElementById('price');

console.log(txtName.value);


// const data1 = {
    //     name: txtName.value,
    //     price: txtPrice.value
    // }
    
async function update(id) {
        console.log(txtPrice.value);
        const data = JSON.stringify({
            name: txtName.value,
            price: Number(txtPrice.value),
        })
    // console.log(data);
    // console.log(data1);
    await fetch(`/meals/${id}`, {
        method: "PUT",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                "Content-Type": "application/json",
                },
                body: data,
    })
}