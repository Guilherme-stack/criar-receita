import React, { useState } from 'react';

const Receita = () => {
    const [nomeReceita, setNomeReceita] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [medida, setMedida] = useState('');
    const [ingrediente, setIngrediente] = useState('');

    const [receita, setReceita] = useState([]);
    const [i, setI] = useState([]);
    const [abrir, setAbrir] = useState([]);
    const [apagar, setApagar] = useState([]);
    function criarReceita(params) {

        var objeto = { nome: nomeReceita }
        if (nomeReceita !== '') {
            setReceita([...receita, objeto])
            setI([...i, 0])
            setAbrir([...abrir, false])
            setApagar([...apagar, true])
            setNomeReceita('')
        } else {
        }
    }


    function buttonAberto(key) {
        buttonFechado()
        setAbrir(abrir.map((item, indice) => indice === key ? item = true : item))

    }

    function buttonFechado(key) {
        setAbrir(abrir.map((item, indice) => indice === key ? item = false : item))

    }
    function adicionarInfo(key) {
        var a
        if (receita[key].passo) {
            a = receita[key].passo
            a.push(`${quantidade} ${medida} de ${ingrediente}`)
            setReceita(receita.map((item, index) => index === key ? { ...item, passo: a } : item))
            setI(i.map((item, indice) => indice === key ? item = item + 1 : item))

        } else {
            setReceita(receita.map((item, index) => index === key ? { ...item, passo: [`${quantidade} ${medida} de ${ingrediente}`] } : item))
            setI(i.map((item, indice) => indice === key ? item = item + 1 : item))

        }
        limparInputs()
    }

    function limparInputs(params) {
        setQuantidade('')
        setMedida('')
        setIngrediente('')
    }

    function excluirInf(ind, index) {
        var p = receita[index].passo
        p.splice(ind, 1)
        setReceita(receita.map((item, i) => index === i ? { ...item, passo: p } : item))
        setApagar(apagar.map((item, indice) => index === ind ? item = false : item))

    }

    console.log(receita[0])
    return (
        <div className="receita">
            <h1>
                Crie sua receita:
            </h1>
            <div className="nome-receita">
                <input type="text" value={nomeReceita} onChange={(e) => setNomeReceita(e.target.value)} placeholder="Nome da Receita" />
                <div className="adicionar">
                    <button onClick={() => criarReceita()}>Adicionar</button>
                </div>
            </div>
            {
                receita.map((item, index) => <div key={index}>{<h3 className="inf">{item.nome ? item.nome : ''}  </h3>} <ul style={{ padding: "0px " }}>{item.passo ? item.passo.map((el, ind) => <li key={ind} className='inf'>{el} <button className="apagar" onClick={() => excluirInf(ind, index)} key={ind}>X</button> </li>) : ''}</ul>

                    <div className={abrir[index] === true ? "medidas" : "none"}>
                        <input type="text" value={quantidade} onChange={e => setQuantidade(e.target.value)} placeholder="Qtd." />
                        <input type="text" value={medida} onChange={e => setMedida(e.target.value)} placeholder="Medida" />
                        <input type="text" value={ingrediente} onChange={e => setIngrediente(e.target.value)} placeholder="Ingrediente" />
                        <button className="add-ingrediente" onClick={() => adicionarInfo(index, i[index])}>Adicionar</button>
                        <button className="fechar" onClick={() => buttonFechado(index)}>Fechar</button>
                    </div>
                    <button className={abrir[index] === false ? "mostrar add-ingrediente" : "sumir add-ingrediente"} onClick={() => buttonAberto(index)}>Adicionar Ingredientes</button>
                </div>
                )
            }

        </div>
    );
}

export default Receita;
