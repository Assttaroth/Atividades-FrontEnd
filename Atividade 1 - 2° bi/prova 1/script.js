function mostrarImagem() {
    let div = document.getElementById("resultado");

    if (div.innerHTML === "") {
        let img = document.createElement("img");
        img.src = "img/Tabela_Jogos.png";
        img.alt = "Tabela de Jogos";

        div.appendChild(img);
    }
}