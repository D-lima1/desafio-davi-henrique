import { CaixaDaLanchonete } from "./caixa-da-lanchonete.js";

describe('CaixaDaLanchonete', () => {

    const validaTeste = (formaDePagamento, resultadoEsperado, itens) => {
        const resultado = new CaixaDaLanchonete()
            .calcularValorDaCompra(formaDePagamento, itens);

        expect(resultado.replace("\xa0", " ")).toEqual(resultadoEsperado);
    };

    test.each([
        ['com carrinho vazio', 'dinheiro', 'Não há itens no carrinho de compra!', []],
        ['com carrinho vazio', 'credito', 'Não há itens no carrinho de compra!', []],
        ['com carrinho vazio', 'debito', 'Não há itens no carrinho de compra!', []],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ['dinheiro', 'R$ 2,85', ['cafe,1']],
        ['credito', 'R$ 3,09', ['cafe,1']],
        ['debito', 'R$ 3,00', ['cafe,1']],
    ])('compra simples em %p deve resultar em %p', validaTeste);

    test.each([
        ['credito', 'R$ 11,85', ['cafe,1', 'sanduiche,1', 'queijo,1']],
        ['debito', 'R$ 11,50', ['cafe,1', 'sanduiche,1', 'queijo,1']],
    ])('compra de 3 itens em %p deve resultar em %p', validaTeste);

    test.each([
        ['dinheiro', 'R$ 33,73', ['cafe,4', 'sanduiche,3', 'queijo,2']],
        ['credito', 'R$ 36,56', ['cafe,4', 'sanduiche,3', 'queijo,2']],
        ['debito', 'R$ 35,50', ['cafe,4', 'sanduiche,3', 'queijo,2']],
    ])('compra de múltiplas quantidades em %p deve resultar em %p', validaTeste);

    test.each([
        ['com quantidade zero', 'dinheiro', 'Quantidade inválida!', ['cafe,0']],
        ['com um valor', 'credito', 'Item inválido!', ['1']],
        ['com código inexistente', 'debito', 'Item inválido!', ['pizza, 1']],
        ['com forma de pagamento inválida', 'especie', 'Forma de pagamento inválida!', ['cafe, 1']],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ['chantily', 'dinheiro', 'Item extra não pode ser pedido sem o principal', ['chantily,1']],
        ['queijo', 'credito', 'Item extra não pode ser pedido sem o principal', ['queijo,1']],
        ['chantily com outro item', 'credito', 'Item extra não pode ser pedido sem o principal', ['chantily,1', 'sanduiche,1']],
        ['queijo com outro item', 'debito', 'Item extra não pode ser pedido sem o principal', ['cafe,1', 'queijo,1']],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    // meus testes

    test.each([
        ["chantily com café", "dinheiro", "R$ 8,55", ["chantily,4", "cafe,1"]],
        ["chantily com café", "debito", "R$ 9,00", ["chantily,4", "cafe,1"]],
        ["chantily com café", "credito", "R$ 9,27", ["chantily,4", "cafe,1"]],
        ["chantily com café", "debito", "R$ 1.887,00", ["chantily,98", "cafe,580"]],
    ])("compra de múltiplas quantidades de %p em %p deve resultar em %p", (_, formaDePagamento, resultadoEsperado, itens) => validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ["um item inválido entre eles", "dinheiro", "Item inválido!", ["chantily,4", "cafe,1", 'combo1,2', 'pizza,2', 'sanduiche,2']],
        ["item apenas com a quantidade entre eles", "credito", "Item inválido!", ["chantily,4", "cafe,1", 'combo1,2', '2', 'sanduiche,2']],
        ["item de quantidade 0 entre eles", "debito", "Quantidade inválida!", ["chantily,4", "cafe,1", 'combo1,2', 'queijo,0', 'sanduiche,2']],
        ["item sem a quantidade entre eles", "debito", "Quantidade inválida!", ["chantily,4", "cafe,1", 'combo1,2', 'queijo', 'sanduiche,2']],
        ["item com letra maiúscula entre eles", "debito", "R$ 43,00", ["chantily,4", "cafe,1", 'Combo1,2', 'queijo,1', 'sanduiche,2']],
    ])("compra de múltiplos itens com %p em %p deve resultar em %p", (_, formaDePagamento, resultadoEsperado, itens) => validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ["item fora de um array", "dinheiro", "Entre com os itens em um array!", "cafe,1"],
    ])("compra de %p em %p deve resultar em %p", (_, formaDePagamento, resultadoEsperado, itens) => validaTeste(formaDePagamento, resultadoEsperado, itens));
});
