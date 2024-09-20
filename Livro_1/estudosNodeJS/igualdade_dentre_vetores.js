
//vetor.includes(x) verifica se o vetor possui o termo x
//
// some() testa se pelo menos um elemento em uma lista passa por uma condição.
const positivas_1 = ["bom", "feliz", "ótimo"];
const input_palavras_1 = ["eu", "estou", "muito", "feliz"];

const encontrouPositiva = input_palavras_1.some(palavra => positivas_1.includes(palavra));

console.log(encontrouPositiva); // true, porque "feliz" está na lista positivas
//
// testar caso tenha algumas palavras em comum, n correspondências
const positivas_n = ["bom", "feliz", "ótimo"];
const input_palavras_n = ["que","ótimo","eu", "estou", "muito", "feliz"];

const palavrasEncontradas = input_palavras_n.filter(palavra => positivas_n.includes(palavra));

console.log(palavrasEncontradas); // ["ótimo","feliz"]
//
//modo mais rápido, 
    //parece formar um objeto com o vetor de dados
    const positivas = new Set(["bom", "feliz", "ótimo"]);
    console.log(positivas)
    //entrada
    const input_palavras = ["que","ótimo","eu", "estou", "muito", "feliz"];

const resultado = input_palavras.filter(palavra => positivas.has(palavra));

console.log(resultado); // ["feliz"]

