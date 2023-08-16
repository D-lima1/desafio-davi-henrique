class CaixaDaLanchonete {
  constructor() {
    this.pagamentoAceito = {
      dinheiro: 0.95,
      debito: 1,
      credito: 1.03,
    };
    this.cardapio = {
      cafe: 3.0,
      suco: 6.2,
      sanduiche: 6.5,
      salgado: 7.25,
      combo1: 9.5,
      combo2: 7.5,
      chantily: 1.5,
      queijo: 2.0,
    };
    this.formatador = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    this.produtos;
    this.quantidade;
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    const statusDoPedido = this.validarPedido(metodoDePagamento, itens);

    if (statusDoPedido === true) {
      let total = 0;
      for (let i = 0; i < this.produtos.length; i++) {
        total += this.cardapio[this.produtos[i]] * this.quantidade[i];
      }

      total *= this.pagamentoAceito[metodoDePagamento];

      return this.formatador.format(total.toFixed(2));
    } else {
      return statusDoPedido;
    }
  }

  validarPedido(metodoDePagamento, itens) {
    if (!(metodoDePagamento in this.pagamentoAceito)) {
      return "Forma de pagamento inválida!";
    } else if (!Array.isArray(itens)) {
      return "Entre com os itens em um array!";
    } else if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    this.produtos = [];
    this.quantidade = [];

    itens = itens.map((x) => x.split(",")).flat();

    for (let i of itens) {
      if (i.match(/[a-zA-Z]+/g)) {
        this.produtos.push(i.toLowerCase());
      } else {
        this.quantidade.push(i);
      }
    }

    const validaProdutos = this.produtos.length < this.quantidade.length;

    const validaQuantidade =
      this.quantidade.includes("0") ||
      this.quantidade.length < this.produtos.length;

    const validaEspecial =
      (this.produtos.includes("chantily") && !this.produtos.includes("cafe")) ||
      (this.produtos.includes("queijo") && !this.produtos.includes("sanduiche"));

    if (validaProdutos) {
      return "Item inválido!";
    } else if (validaEspecial) {
      return "Item extra não pode ser pedido sem o principal";
    } else if (validaQuantidade) {
      return "Quantidade inválida!";
    }

    for (let produto of this.produtos) {
      if (!this.cardapio[produto]) {
        return "Item inválido!";
      }
    }

    return true;
  }
}

export { CaixaDaLanchonete };
