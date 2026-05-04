function proximo() {

    document.getElementById("grupo1-titulo").textContent = "Grupo D";

    document.getElementById("grupo1-lista").innerHTML = `
        <li>Estados Unidos</li>
        <li>Paraguai</li>
        <li>Austrália</li>
        <li>Turquia</li>
    `;

    document.getElementById("grupo1-fatos").textContent =
        "Os EUA jogam em casa, vantagem histórica em Copas. Austrália enfrenta frequentemente seleções sul-americanas em torneios.";
    document.getElementById("grupo2-titulo").textContent = "Grupo E";
    document.getElementById("grupo2-lista").innerHTML = `
        <li>Alemanha</li>
        <li>Equador</li>
        <li>Costa do Marfim</li>
        <li>Curaçao</li>
    `;

    document.getElementById("grupo2-fatos").textContent =
        "Alemanha costuma dominar fases de grupos. Equador e Costa do Marfim têm estilos físicos semelhantes.";
    document.getElementById("grupo3-titulo").textContent = "Grupo F";

    document.getElementById("grupo3-lista").innerHTML = `
        <li>Holanda</li>
        <li>Japão</li>
        <li>Tunísia</li>
        <li>Suécia</li>
    `;

    document.getElementById("grupo3-fatos").textContent =
        "Holanda e Japão já protagonizaram confrontos marcantes. Suécia tem tradição defensiva forte.";
}