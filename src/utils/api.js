
export const  cadastrarUsuario = async (usuario) => {
    try {
        const response = await fetch('http://localhost/app/Usuarios.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario),
        });

        const data = await response.json();
        if(data.status){
            console.log('Usuário cadastrado:', data);
        }
       
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
    }
};

export const registrarPresenca = async (idUsuario, tipo) => {
    try {
        const response = await fetch('http://localhost/app/Presenca.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_usuario: idUsuario, tipo: tipo }),
        });

        const data = await response.json();
        if (data.status) {
            console.log('Presença registrada:', data);
        } else {
            console.log('Erro ao registrar presença:', data.message);
        }
    } catch (error) {
        console.error('Erro ao registrar presença:', error);
    }
};

export const  buscarUsuarios = async () => {
    try {
        const response = await fetch('http://localhost/app/Usuarios.php');
        const data = await response.json();
        console.log('Usuários recuperados:', data.usuarios);
        return data.usuarios;
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        return [];
    }
};

export const  excluirUsuario = async (id) => {
    try {
        const response = await fetch(`http://localhost/app/Usuarios.php?id=${id}`, {
            method: 'DELETE',
        });

        const data = await response.json();
        console.log('Usuário excluído:', data);
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
    }
};
