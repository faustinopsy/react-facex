import React, { useState, useEffect } from 'react';
import { buscarUsuariosRelatorio, excluirUsuario } from '../utils/api';

function UsuariosCadastrados() {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioParaExcluir, setUsuarioParaExcluir] = useState(null);

    useEffect(() => {
        const fetchUsuarios = async () => {
            const usuariosRecuperados = await buscarUsuariosRelatorio();
            setUsuarios(usuariosRecuperados);
        };

        fetchUsuarios();
    }, []);

    const confirmarExclusao = (usuario) => {
        setUsuarioParaExcluir(usuario);
    };

    const handleExcluirUsuario = async () => {
        if (usuarioParaExcluir) {
            await excluirUsuario(usuarioParaExcluir.id);
            setUsuarios(usuarios.filter(u => u.id !== usuarioParaExcluir.id));
            setUsuarioParaExcluir(null); 
        }
    };

    const fecharModal = () => {
        setUsuarioParaExcluir(null);
    };

    return (
        <div className="camera-container container">
            <h1>Usuários Cadastrados</h1>
            <ul>
                {usuarios.map(usuario => (
                    <li key={usuario.id}>
                        {usuario.nome} (Registro: {usuario.registro})
                        <button onClick={() => confirmarExclusao(usuario)}>Excluir</button>
                    </li>
                ))}
            </ul>
            {usuarioParaExcluir && (
                <div className="modal">
                    <p>Tem certeza que deseja excluir o usuário {usuarioParaExcluir.nome}?</p>
                    <button onClick={handleExcluirUsuario}>Confirmar</button>
                    <button onClick={fecharModal}>Cancelar</button>
                </div>
            )}
        </div>
    );
}

export default UsuariosCadastrados;
