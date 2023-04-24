let tabela = $("#tabela");


function listarCategorias()
{
    fetch('https://6439dfea90cd4ba563ef55e2.mockapi.io/api/v1/categorias')
    .then(res => res.json())
    .then(lista => {
        lista.forEach(cat => {
            categoria.innerHTML += `<option>${cat.categoria}</option>`;
        });           
     })
} listarCategorias();

function listarProdutos()
{
    fetch('https://6439dfea90cd4ba563ef55e2.mockapi.io/api/v1/produtos')
    .then(res => res.json())
    .then(lista => {
        tabela.DataTable({
            data: lista,
            columns: [
                { data: 'id', width: '40px' },
                { data: 'produto' },
                { data: 'preco', width: '100px' },
                { data: 'categoria', width: '150px' },
                { data: 'status',
                    width: '100px',
                    ClassName: 'dt-head-center dt-body-center',
                    render: function(data, type, row){
                        return data == 1 ? 'Ativo' : 'Inativo';
                    } 
                },
                { data: '',
                    width: '100px',
                    ClassName: 'dt-head-center dt-body-center',
                    render: function(data, type, row){
                        return `<ion-icon class="btn" onclick="editarCategoria(${row.id})" name="create"></ion-icon>
                                <ion-icon class="btn" onclick="deletarCategoria(${row.id})" name="trash"></ion-icon>`;
                    }
                }
                ],
                responsive: true
            })
        })
} listarProdutos();

function addProdutos()
{
    event.preventDefault();
    let dados = {
        produto:produto.value, 
        descricao: descricao.value,
        imagem: imagem.value,
        categoria: produto.value, 
        status: 1
    }

    fetch('https://6439dfea90cd4ba563ef55e2.mockapi.io/api/v1/produtos',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(res => res.json())
    .then(() => {
        window.location.reload();
    })
}


function deletarProdutos(idProdutos)
{
    fetch(`https://6439dfea90cd4ba563ef55e2.mockapi.io/api/v1/produtos/${idProdutos}`,{
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => {
        // window.prompt("TESTE: Função OK")
        window.location.reload();        
})
}

function editarProdutos(idProdutos)

{
    fetch(`https://6439dfea90cd4ba563ef55e2.mockapi.io/api/v1/produtos/${idProdutos}`,{
        method: 'PUT'        
    })
    .then(res => res.json())
    .then(() => {
        // window.prompt("TESTE: Função OK")
        window.location.reload();        
})
}