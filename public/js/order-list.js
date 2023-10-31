function editInvoice(id) {
    alert(`Do You Want To Edit the Invoice ${id} ?`)
}

async function deleteInvoice(id) {
    const isOk = confirm(`Do You Want To Delete The Invoice Number ${id} ?`);

    if (isOk) {
        await fetch(`/orders/${id}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                "Content-Type": "application/json",
                },
            
        })
        window.location.reload(true);
    }
}