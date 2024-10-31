const produtos = [
    { nome: "Gabinete Gamer Cooler Master Sneaker X Red, Mini-Tower, Fonte SFX850W, Water Cooler Flux 360mm, Cabo Riser PCI-e, 1 Fan MF120 Halo, ABK-SXNN-S38L3-R1",
         preco: 7899.99 , 
         quantidade: 5,
        imagem: "src/img/gabinete.jpg" 
    },
    { nome: "Placa Mae Mancer B450M DA V2, DDR4, Socket AM4, M-ATX, Chipset AMD B450, MCR-B450M-DAV2", 
        preco: 389.99 , 
        quantidade: 3, 
        imagem: "src/img/placa_mae.jpg" 
    },
    { nome: "Teclado Mecanico Logitech G915 TKL Tactile RGB Switch Brown Low Profile Wireless, 920-009495",
         preco: 1219.99 , 
         quantidade: 8, 
         imagem: "src/img/teclado.jpg" },
    { nome: "Monitor Gamer MSI MAG325CQRF, 31.5 Pol, Curvo, Rapid VA, WQHD, 1ms, 170Hz, FreeSync Premium, HDMI/DP, MAG-325CQRF",
         preco: 2999.99 , 
         quantidade: 10, 
         imagem: "src/img/monitor.jpg" 
        },
    { nome: "Pichau Kit upgrade, AMD Ryzen 5 4600G, B450M DDR4, 8GB DDR4", 
        preco: 1279.96 , 
        quantidade: 2, 
        imagem: "src/img/upgrade.jpg" 
    },
];


let carrinho = [];


function adicionarAoCarrinho(produto) {
    const itemNoCarrinho = carrinho.find(item => item.nome === produto.nome);
    if (itemNoCarrinho) {
        itemNoCarrinho.quantidade += 1;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }
    atualizarCarrinhoInfo();
    exibirCarrinho();
    alert(`${produto.nome} adicionado ao carrinho!`);
}


function removerDoCarrinho(produto) {
    const itemIndex = carrinho.findIndex(item => item.nome === produto.nome);
    if (itemIndex > -1) {
        if (carrinho[itemIndex].quantidade > 1) {
            carrinho[itemIndex].quantidade -= 1;
        } else {
            carrinho.splice(itemIndex, 1);
        }
        atualizarCarrinhoInfo();
        exibirCarrinho();
        alert(`${produto.nome} removido do carrinho!`);
    }
}


function atualizarCarrinhoInfo() {
    const carrinhoCount = document.getElementById("carrinhoCount");
    const valorTotalCarrinho = document.getElementById("valorTotalCarrinho");
    const totalItems = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    const totalValue = calcularTotal();
    carrinhoCount.textContent = `Carrinho: ${totalItems} itens`;
    valorTotalCarrinho.textContent = `Total: R$${totalValue.toFixed(2)}`;
}

function calcularTotal() {
    return carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
}


function buscarProduto(nome) {
    return produtos.filter(produto => produto.nome.toLowerCase().includes(nome.toLowerCase()));
}


function exibirCarrinho() {
    const carrinhoContainer = document.getElementById("carrinhoContainer");
    carrinhoContainer.innerHTML = ""; 
    carrinho.forEach(produto => {
        const produtoDiv = document.createElement("div");
        produtoDiv.classList.add("produto", "carrinho-produto");

        const imagem = document.createElement("img");
        imagem.src = produto.imagem;
        produtoDiv.appendChild(imagem);

        const nome = document.createElement("h3");
        nome.textContent = produto.nome;
        produtoDiv.appendChild(nome);

        const preco = document.createElement("p");
        preco.textContent = `R$${produto.preco.toFixed(2)}`;
        produtoDiv.appendChild(preco);

        const quantidade = document.createElement("p");
        quantidade.textContent = `Quantidade: ${produto.quantidade}`;
        produtoDiv.appendChild(quantidade);

        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover do Carrinho";
        botaoRemover.onclick = () => removerDoCarrinho(produto);
        produtoDiv.appendChild(botaoRemover);

        carrinhoContainer.appendChild(produtoDiv);
    });
}


function exibirProdutos() {
    const produtosContainer = document.getElementById("produtosContainer");
    produtos.forEach(produto => {
        const produtoDiv = document.createElement("div");
        produtoDiv.classList.add("produto");

        const imagem = document.createElement("img");
        imagem.src = produto.imagem;
        produtoDiv.appendChild(imagem);

        const nome = document.createElement("h3");
        nome.textContent = produto.nome;
        produtoDiv.appendChild(nome);

        const preco = document.createElement("p");
        preco.textContent = `R$${produto.preco.toFixed(2)}`;
        produtoDiv.appendChild(preco);

        const botaoAdicionar = document.createElement("button");
        botaoAdicionar.textContent = "Adicionar ao Carrinho";
        botaoAdicionar.onclick = () => adicionarAoCarrinho(produto);
        produtoDiv.appendChild(botaoAdicionar);

        produtosContainer.appendChild(produtoDiv);
    });
}


function buscarEExibirProdutos() {
    const buscaInput = document.getElementById("buscaInput").value;
    const produtosEncontrados = buscarProduto(buscaInput);
    const produtosContainer = document.getElementById("produtosContainer");
    produtosContainer.innerHTML = ""; 

    produtosEncontrados.forEach(produto => {
        const produtoDiv = document.createElement("div");
        produtoDiv.classList.add("produto", "busca-produto");

        const imagem = document.createElement("img");
        imagem.src = produto.imagem;
        produtoDiv.appendChild(imagem);

        const nome = document.createElement("h3");
        nome.textContent = produto.nome;
        produtoDiv.appendChild(nome);

        const preco = document.createElement("p");
        preco.textContent = `R$${produto.preco.toFixed(2)}`;
        produtoDiv.appendChild(preco);

        const botaoAdicionar = document.createElement("button");
        botaoAdicionar.textContent = "Adicionar ao Carrinho";
        botaoAdicionar.onclick = () => adicionarAoCarrinho(produto);
        produtoDiv.appendChild(botaoAdicionar);

        produtosContainer.appendChild(produtoDiv);
    });
}

exibirProdutos();
