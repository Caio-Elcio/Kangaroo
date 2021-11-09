/* A função transicao troca uma config de personalização quando acionada, 
ou seja quando o usuário clica para abrir o menu, 
essa função troca a classe de CSS que está sendo usada. */

function transicao() {
    document.getElementById("menuRoxo").classList.toggle("menuRoxoGrande")

    // querySelectorAll é uma união do getElementBy** (alguma coisa)
    /* querySelector pega o primeiro que ele encontra e o querySelectorAll faz uma lista de todos
    que ele encontrar */
    var elementos = document.querySelectorAll(".textMenu")

    // Usando o FOR

    // for (let index = 0; index < elementos.length; index++) {
    //     const element = elementos[index];
    //     element.classList.toggle("textMenuBlock")
    // }

    /* Os textos são uma lista, logo pra trocar as configurações é necessário usar um FOR, 
    mas não vamos usar ele, vamos usar um melhor, o FOR OF */

    for (const element of elementos) {
        element.classList.toggle("textMenuBlock")
    }
}

function transicaoRelatorios() {
    document.getElementById("menuRoxo").classList.toggle("menuRoxoGrande")
}