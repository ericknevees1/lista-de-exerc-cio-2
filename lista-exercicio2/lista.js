const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
// Exercício 1
app.post('/estoque-medio', (req, res) => {
const { quantidadeMinima, quantidadeMaxima } = req.body;
const estoqueMedio = (quantidadeMinima + quantidadeMaxima) / 2;
res.json({ estoqueMedio });
});
// Exercício 2
app.post('/aumento-salario', (req, res) => {
const { salario } = req.body;
if (salario < 1000) {
const salarioReajustado = salario * 1.3;
res.json({ salarioReajustado });
} else {
res.json({ mensagem: "Funcionário não tem direito ao aumento" });
}
});
// Exercício 3
app.post('/salario-vendedor', (req, res) => {
const { nome, salarioFixo, totalVendas, percentualComissao } = req.body;
const salarioTotal = salarioFixo + (totalVendas * percentualComissao / 100);
res.json({ nome, salarioTotal });
});
// Exercício 4
app.post('/velocidade-media', (req, res) => {
const { nomePiloto, distancia, tempo } = req.body;
const velocidadeMedia = distancia / tempo;
res.json({ nomePiloto, velocidadeMedia });
});
// Exercício 5
app.post('/reajuste-salario', (req, res) => {
const { salario } = req.body;
let salarioReajustado;
if (salario <= 2000) {
salarioReajustado = salario * 1.5;
} else {
salarioReajustado = salario * 1.3;
}
res.json({ salarioReajustado });
});
// Exercício 6
app.post('/peso-ideal', (req, res) => {
const { altura, sexo } = req.body;
let pesoIdeal;
if (sexo === 'homem') {
pesoIdeal = (72.7 * altura) - 58;
} else if (sexo === 'mulher') {
pesoIdeal = (62.1 * altura) - 44.7;
} else {
return res.status(400).json({ mensagem: "Sexo inválido" });
}
res.json({ pesoIdeal });
});
// Exercício 7
app.post('/maior-preco-media', (req, res) => {
const produtos = req.body.produtos;
const precos = produtos.map(produto => produto.preco);
const maiorPreco = Math.max(...precos);
const media = precos.reduce((acc, curr) => acc + curr, 0) / precos.length;
res.json({ maiorPreco, media });
});
// Exercício 8
app.post('/novo-salario', (req, res) => {
const { salario, codigoCargo } = req.body;
let novoSalario;
switch (codigoCargo) {
case 101:
novoSalario = salario * 1.05;
break;
case 102:
novoSalario = salario * 1.075;
break;
case 103:
novoSalario = salario * 1.1;
break;
default:
novoSalario = salario * 1.15;
}
const diferenca = novoSalario - salario;
res.json({ salarioAntigo: salario, novoSalario, diferenca });
});
// Exercício 9
app.post('/calcular-salario', (req, res) => {
const { salarioMinimo, horasTrabalhadas, dependentes, horasExtras } = req.body;
const valorHoraTrabalhada = salarioMinimo / 5;
const salarioMes = horasTrabalhadas * valorHoraTrabalhada;
const acrescimoDependentes = dependentes * 32;
const valorHoraExtra = valorHoraTrabalhada * 1.5;
const salarioHoraExtra = horasExtras * valorHoraExtra;
const salarioBruto = salarioMes + acrescimoDependentes + salarioHoraExtra;
let irrf;
if (salarioBruto <= 2000) {
irrf = 0;
} else if (salarioBruto <= 5000) {
irrf = salarioBruto * 0.1;
} else {
irrf = salarioBruto * 0.2;
}
const salarioLiquido = salarioBruto - irrf;
const gratificacao = salarioLiquido <= 3500 ? 1000 : 500;
const salarioReceber = salarioLiquido + gratificacao;
res.json({ salarioReceber });
});
app.listen(3000, () => {
console.log('Server running on port 3000');
});