import React, { useState } from 'react';
import { buscarPresencasPorRegistro, atualizarPresenca } from '../utils/api';

function PresencasRegistradas() {
    const [presencas, setPresencas] = useState([]);
    const [registroPesquisa, setRegistroPesquisa] = useState('');
    const [dataPesquisa, setDataPesquisa] = useState('');
    const [carregando, setCarregando] = useState(false);

    const buscarPresencas = async () => {
        setCarregando(true);
        const presencasData = await buscarPresencasPorRegistro(registroPesquisa, dataPesquisa);
        setPresencas(presencasData);
        setCarregando(false);
    };

    const handleAtualizarPresenca = async (presenca) => {
        await atualizarPresenca(presenca.id, presenca.novaDataHora);
        const presencasAtualizadas = await buscarPresencasPorRegistro(registroPesquisa, dataPesquisa);
        setPresencas(presencasAtualizadas.map(p => ({ ...p, editavel: false, novaDataHora: p.data_hora })));
    };
    

    return (
        <div>
            <h1>Presenças Registradas</h1>
            <input
                type="text"
                value={registroPesquisa}
                onChange={(e) => setRegistroPesquisa(e.target.value)}
                placeholder="Digite o número do registro"
            />
            <input
                type="date"
                value={dataPesquisa}
                onChange={(e) => setDataPesquisa(e.target.value)}
                placeholder="Digite a data (YYYY-MM-DD)"
            />
            <button onClick={buscarPresencas} disabled={carregando}>Buscar</button>
            <ul>
                {presencas.map((presenca, index) => (
                    <li key={presenca.id}>
                    {presenca.nome} ({presenca.registro}) - 
                    {presenca.editavel ? (
                        <>
                            <input
                                type="datetime-local"
                                value={presenca.novaDataHora}
                                onChange={e => {
                                    const novasPresencas = [...presencas];
                                    novasPresencas.find(p => p.id === presenca.id).novaDataHora = e.target.value;
                                    setPresencas(novasPresencas);
                                }}
                            />
                            <button
                                className="btn-salvar"
                                onClick={() => handleAtualizarPresenca(presenca)}
                            >
                                Salvar
                            </button>
                        </>
                    ) : (
                        <>
                            <span>{presenca.data_hora}</span>
                            <button
                                className="btn-editar"
                                onClick={() => {
                                    const novasPresencas = [...presencas];
                                    novasPresencas[index].editavel = true;
                                    setPresencas(novasPresencas);
                                }}
                            >
                                Editar
                            </button>
                        </>
                    )}
                    </li>
                ))}
            </ul>
        </div>
    );
    
}

export default PresencasRegistradas;
