/* eslint-disable react/prop-types */
import Input from '../Input';
import { useState } from 'react';
import axios from 'axios';

const Formulariorodutos = () => {
    const initialValues = {
        nome: "Produtos Teste",
        tipo: "PRODUTO ACABADO",
        acabamento_id: "5",
        valor: "10000",
        cfop_interno: "5101",
        cfop_externo: "6101",
        ncm: "94033000",
        orig: "0",
        codigo_barras: "7898678304222",
        und_venda: "UN",
        cst_csosn: "00",
        cst_pis: "01",
        cst_cofins: "01",
        cst_ipi: "50",
        perc_icms: 12,
        perc_pis: 1.65,
        perc_cofins: 7.6,
        perc_ipi: 3.25
    };

    // Inicializar os estados com os valores padrão
    const [nome, setNome] = useState(initialValues.nome);
    const [tipo, setTipo] = useState(initialValues.tipo);
    const [acabamento_id, setAcabamentoId] = useState(initialValues.acabamento_id);
    const [valor, setValor] = useState(initialValues.valor);
    const [cfop_interno, setCfopInterno] = useState(initialValues.cfop_interno);
    const [cfop_externo, setCfopExterno] = useState(initialValues.cfop_externo);
    const [ncm, setNcm] = useState(initialValues.ncm);
    const [orig, setOrig] = useState(initialValues.orig);
    const [codigo_barras, setCodigoBarras] = useState(initialValues.codigo_barras);
    const [und_venda, setUndVenda] = useState(initialValues.und_venda);
    const [cst_csosn, setCstCsosn] = useState(initialValues.cst_csosn);
    const [cst_pis, setCstPis] = useState(initialValues.cst_pis);
    const [cst_cofins, setCstCofins] = useState(initialValues.cst_cofins);
    const [cst_ipi, setCstIpi] = useState(initialValues.cst_ipi);
    const [perc_icms, setPercIcms] = useState(initialValues.perc_icms);
    const [perc_pis, setPercPis] = useState(initialValues.perc_pis);
    const [perc_cofins, setPercCofins] = useState(initialValues.perc_cofins);
    const [perc_ipi, setPercIpi] = useState(initialValues.perc_ipi);
    const [isPending, setIsPending] = useState(false)

    const produtos = {
        nome,
        tipo,
        acabamento_id: parseInt(acabamento_id, 10),
        valor: parseFloat(valor),
        cfop_interno,
        cfop_externo,
        ncm,
        orig: parseInt(orig, 10),
        codigo_barras,
        und_venda,
        cst_csosn,
        cst_pis,
        cst_cofins,
        cst_ipi,
        perc_icms: parseFloat(perc_icms),
        perc_pis: parseFloat(perc_pis),
        perc_cofins: parseFloat(perc_cofins),
        perc_ipi: parseFloat(perc_ipi)
    };

    const saveForm = async (event) => {
        event.preventDefault();
        setIsPending(true);
        try {
            const response = await axios.post('http://localhost/api/produtos/new', {
                produtos: [produtos]
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
                <Input obrigatorio={true} label="Tipo" placeholder="Digite o tipo" valor={tipo} evento_input={setTipo} />
                <Input obrigatorio={true} label="Acabamento ID" placeholder="Digite o ID do acabamento" valor={acabamento_id} evento_input={setAcabamentoId} />
                <Input obrigatorio={true} label="Valor" placeholder="Digite o valor" valor={valor} evento_input={setValor} />
                <Input obrigatorio={true} label="CFOP Interno" placeholder="Digite o CFOP interno" valor={cfop_interno} evento_input={setCfopInterno} />
                <Input obrigatorio={true} label="CFOP Externo" placeholder="Digite o CFOP externo" valor={cfop_externo} evento_input={setCfopExterno} />
                <Input obrigatorio={true} label="NCM" placeholder="Digite o NCM" valor={ncm} evento_input={setNcm} />
                <Input obrigatorio={true} label="Orig" placeholder="Digite o código de origem" valor={orig} evento_input={setOrig} />
                <Input obrigatorio={true} label="Código de Barras" placeholder="Digite o código de barras" valor={codigo_barras} evento_input={setCodigoBarras} />
                <Input obrigatorio={true} label="Unidade de Venda" placeholder="Digite a unidade de venda" valor={und_venda} evento_input={setUndVenda} />
                <Input obrigatorio={true} label="CST CSOSN" placeholder="Digite o CST CSOSN" valor={cst_csosn} evento_input={setCstCsosn} />
                <Input obrigatorio={true} label="CST PIS" placeholder="Digite o CST PIS" valor={cst_pis} evento_input={setCstPis} />
                <Input obrigatorio={true} label="CST COFINS" placeholder="Digite o CST COFINS" valor={cst_cofins} evento_input={setCstCofins} />
                <Input obrigatorio={true} label="CST IPI" placeholder="Digite o CST IPI" valor={cst_ipi} evento_input={setCstIpi} />
                <Input obrigatorio={true} label="Perc ICMS" placeholder="Digite o percentual ICMS" valor={perc_icms} evento_input={setPercIcms} />
                <Input obrigatorio={true} label="Perc PIS" placeholder="Digite o percentual PIS" valor={perc_pis} evento_input={setPercPis} />
                <Input obrigatorio={true} label="Perc COFINS" placeholder="Digite o percentual COFINS" valor={perc_cofins} evento_input={setPercCofins} />
                <Input obrigatorio={true} label="Perc IPI" placeholder="Digite o percentual IPI" valor={perc_ipi} evento_input={setPercIpi} />
                {!isPending && <button type="submit">Ok</button>}
                {isPending && <button type="submit">. . .</button>}
            </form>
        </section>
    );
};

export default Formulariorodutos;
