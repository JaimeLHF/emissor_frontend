/* eslint-disable react/prop-types */
import Input from '../Input';
import { useState } from 'react';
import axios from 'axios';

const FormularioAcabamentos = () => {

    const [nome, setNome] = useState('');
    const [isPending, setIsPending] = useState(false);

    const saveForm = async (event) => {
        event.preventDefault();
        setIsPending(true);

        try {
            const response = await axios.post('https://api.drd.app.br/api/acabamentos/new', {
                nome: nome
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response.data);

            if (response.data.errors) {
                console.log("Erro: ", response.data.errors);
            }

            setIsPending(false);

        } catch (error) {
            console.log(error);
            setIsPending(false);
        }
    };

    return (
        <section className='formulario'>
            <form onSubmit={saveForm}>
                <Input obrigatorio={true} label="Nome" placeholder="Digite o nome" evento_input={setNome} />
                {!isPending && <button type="submit">Ok</button>}
                {isPending && <button type="submit">. . .</button>}
            </form>
        </section>
    );
};

export default FormularioAcabamentos;