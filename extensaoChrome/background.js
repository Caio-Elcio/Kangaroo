chrome.history.onVisited.addListener(result => {
    // Criando objeto de parâmetros necessários
    const {
        id,
        title,
        url,
        visitCount
    } = result;

    fetch("http://127.0.0.1:5000/retorno-id", {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json"
            },
        })
        .then(response => response.text())
        .then(result => {
            console.log(JSON.parse(result).id)
            fetch("http://localhost:3000/monitoramentos/navegacao", {
                    "method": "POST",
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "body": `{\"fkDependente\":\"${JSON.parse(result).id}\",\"title\":\"${title}\",\"url\":\"${url}\",\"visitCount\":${visitCount}}`
                })
                .then(response => {
                    console.log(response);
                })
                .catch(err => {
                    console.error(err);
                });
        })
        .catch(error => console.log('error', error));


});