function revelar() {
    document.querySelector(".card-img-top").src = "img/_vinicius_junior.png";
    document.getElementById("Nome").childNodes[0].textContent = "Vinícius José Paixão de Oliveira Júnior ";
    document.getElementById("Data_Nas").textContent = "12/07/2000 (25 anos)";
    document.getElementById("Alutra").textContent = "1,76 m";
    document.getElementById("Posição ").textContent = "Ponta-esquerda / Atacante";
    document.getElementById("Rank").textContent = "9,5";
    let elementos = ["Data_Nas", "Alutra", "Posição ", "Rank"];
    elementos.forEach(id => {
        let el = document.getElementById(id);
        el.classList.remove("placeholder");
        el.classList.add("card-text");
    });
}