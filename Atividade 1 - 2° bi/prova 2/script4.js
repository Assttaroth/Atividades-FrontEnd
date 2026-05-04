function add() {

   
    let container = document.getElementById("Cards");
    let novoCard = document.createElement("div");
    novoCard.className = "card";
    novoCard.style.width = "22rem";
    novoCard.style.marginLeft = "15px";
    novoCard.innerHTML = `
        <img src="img/Lucas_Paqueta.webp" class="card-img-top" alt="Lucas Paquetá">

        <div class="card-body">
            <h5 class="card-title">
                <span class="card-title">Lucas Paquetá</span>
                <span class="badge text-bg-secondary">8,8</span>
            </h5>
            <p class="card-text">
                <span><strong>Nascimento:</strong> 27/08/1997 (28 anos)</span><br>
                <span><strong>Altura:</strong> 1,80 m</span><br>
                <span><strong>Posição:</strong> Meio-campista</span><br>
            </p>
        </div>
    `;

    container.appendChild(novoCard);
}