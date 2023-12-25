import React, { useState } from 'react';
import { registrarUsuario, fazerLogin } from './utils/api'; 
import ErrorModal from './ErrorModal'; 

function RegistroLogin() {
    const [registroData, setRegistroData] = useState({ nome: '', registro: '', email: '', senha: '' });
    const [loginData, setLoginData] = useState({ email: '', senha: '' });
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [activeTab, setActiveTab] = useState('register');
    
    const handleRegistroChange = (e) => {
        setRegistroData({ ...registroData, [e.target.name]: e.target.value });
    };

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmitRegistro = async (e) => {
        e.preventDefault();
        const resultado = await registrarUsuario(registroData); 
        if (resultado) {
            handleShowModal(resultado.message);
        }
        setRegistroData({ nome: '', registro: '', email: '', senha: '' });
    };

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        const resultado = await fazerLogin(loginData);
        if (resultado.status) {
            handleShowModal(resultado.message);
        }
    };

    const handleShowModal = (message) => {
        setErrorMessage(message);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="container">
            <ErrorModal showModal={showModal} closeModal={handleCloseModal} errorMessage={errorMessage} />
    
            <div className="tabs">
                <div
                    className={`tab ${activeTab === 'register' ? 'active' : ''}`}
                    onClick={() => setActiveTab('register')}
                >
                    Registro
                </div>
                <div
                    className={`tab ${activeTab === 'login' ? 'active' : ''}`}
                    onClick={() => setActiveTab('login')}
                >
                    Login
                </div>
            </div>
    
            {activeTab === 'register' && (
                <div>
                    <h2>Registro</h2>
                    <form onSubmit={handleSubmitRegistro}>
                        <input type="text" name="nome" value={registroData.nome} onChange={handleRegistroChange} placeholder=" " />
                        <label htmlFor="nome">Nome</label>
                        <input type="text" name="registro" value={registroData.registro} onChange={handleRegistroChange} placeholder=" " />
                        <label htmlFor="registro">Registro</label>
                        <input type="email" name="email" value={registroData.email} onChange={handleRegistroChange} placeholder=" " />
                        <label htmlFor="email">Email</label>
                        <input type="password" name="senha" value={registroData.senha} onChange={handleRegistroChange} placeholder=" " />
                        <label htmlFor="senha">Senha</label>
                        <button type="submit">Registrar</button>
                    </form>
                </div>
            )}
    
            {activeTab === 'login' && (
                <div>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmitLogin}>
                    
                        <input type="email" name="email" value={loginData.email} onChange={handleLoginChange} placeholder=" " />
                        <label htmlFor="email">Email</label>
                        <input type="password" name="senha" value={loginData.senha} onChange={handleLoginChange} placeholder=" " />
                        <label htmlFor="senha">Senha</label>
                        <button type="submit">Login</button>
                    </form>
                </div>
            )}
        </div>
    );
    
}

export default RegistroLogin;
