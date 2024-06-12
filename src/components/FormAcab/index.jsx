/* eslint-disable react/prop-types */
import Input from '../Input';
import { useState } from 'react';
import axios from 'axios';

const FormularioAcabamentos = () => {
    const initialValues = {
        nome: "Acabamento Teste",
    };

    // Inicializar os estados com os valores padrão
    const [nome, setNome] = useState(initialValues.nome);
    const [isPending, setIsPending] = useState(false)

    const saveForm = async (event) => {
        event.preventDefault();
        setIsPending(true);
        try {
            const response = await axios.post('https://api.drd.app.br/api/acabamentos/new', {
                nome: "Acabamento"
            });
          

            if (response.status !== 200) {
                // Lança um erro se a resposta não for bem-sucedida               
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }

            setIsPending(false);
            console.log(response.data);

        } catch (error) {
            setIsPending(false);
            console.error('Erro ao cadastrar o produto:', error);
        }
    };




    return (
        <section className='formulario'>
            <form onSubmit={saveForm}>
                <Input obrigatorio={true} label="Nome" placeholder="Digite o nome" valor={nome} evento_input={setNome} />
                {!isPending && <button type="submit">Ok</button>}
                {isPending && <button type="submit">. . .</button>}
            </form>
        </section>
    );
};

export default FormularioAcabamentos;
