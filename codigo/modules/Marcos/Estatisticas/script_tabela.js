// Função para carregar o JSON
d3.json("data.json").then(function (data) {
    console.log(data);
    // Selecione a tabela
    var table = d3.select("#tabela");

    // Classifique os dados com base na data (em ordem crescente)
    data.atividades.sort(function (a, b) {
        return new Date(a.data) - new Date(b.data);
    });

    // Vincule os dados aos elementos da tabela
    var rows = table.select("tbody").selectAll("tr").data(data.atividades);

    // Crie novas linhas se necessário
    var rowsEnter = rows.enter().append("tr");

    // Preencha as células da tabela com os dados
    rowsEnter.append("td").text(function (d) { return d.atividade; });
    rowsEnter.append("td").text(function (d) { return d.tempo_gasto; });
    rowsEnter.append("td").text(function (d) { return d.data; });

    // Atualize as linhas existentes, se necessário
    rows.select("td").text(function (d) { return d; });

    // Remova as linhas que não têm dados correspondentes
    rows.exit().remove();
});
