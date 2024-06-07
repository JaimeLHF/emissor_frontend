import { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import styles from './Vendas.module.css';
import InputSearch from '../InputSearch';
import ButtonAdd from '../ButtonAdd';
import Loading from '../Loading';

export default function Vendas() {
    const [vendas, setVendas] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedVenda, setSelectedVenda] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://api.drd.app.br/api/venda`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setVendas(data);
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            });
    }, []);

    const handleDetalhesClick = (produto) => {
        setSelectedVenda(produto);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedVenda(null);
    };

    return (
        <div className={styles.container}>
            <div className={styles.actions}>
                <ButtonAdd to='new' text={'New Sale'} />
                <p>Vendas</p>
                <InputSearch placeholder={"Search..."} />
            </div>

            {loading ? <Loading /> : <ul className={styles.responsive_table}>
                <li className={styles.table_header}>
                    <div className={`${styles.col} ${styles.col_1}`}>ID</div>
                    <div className={`${styles.col} ${styles.col_2}`}>Cliente</div>
                    <div className={`${styles.col} ${styles.col_3}`}>Valor</div>
                    <div className={`${styles.col} ${styles.col_4}`}>Nº NF</div>
                    <div className={`${styles.col} ${styles.col_4}`}>Status</div>
                    <div className={`${styles.col} ${styles.col_4}`}></div>
                    <div className={`${styles.col} ${styles.col_4}`}></div>
                </li>
                {vendas.map((e) => (
                    <li key={e.id} className={styles.table_row}>
                        <div className={`${styles.col} ${styles.col_1}`} >{e.id}</div>
                        <div className={`${styles.col} ${styles.col_2}`}>{e.cliente.nome}</div>
                        <div className={`${styles.col} ${styles.col_3}`}>{e.valorTotal}</div>
                        <div className={`${styles.col} ${styles.col_4}`}>{e.numero_nfe}</div>
                        <div className={`${styles.col} ${styles.col_4} ${styles[e.status.toLowerCase()]}`}>{e.status}</div>
                        <div className={`${styles.col} ${styles.col_4}`}><Button onClick={() => handleDetalhesClick(e)}>Detalhes</Button></div>
                        <div className={`${styles.col} ${styles.col_4}`}><Button><a href={`https://api.drd.app.br/api/nfe/imprimir/${e.id}`}>Download</a></Button></div>
                    </li>
                ))}

            </ul>}
            <Modal
                className={styles.modal}
                title="Detalhes da Venda"
                open={modalVisible}
                onCancel={closeModal}
                footer={[
                    <Button key="close" onClick={closeModal}>
                        Fechar
                    </Button>
                ]}

            >
                {selectedVenda && (
                    <div className={styles.modal_content}>
                        <div>
                            <h2>Informações Venda</h2>
                            <p>ID: {selectedVenda.id}</p>
                            <p>Cliente: {selectedVenda.cliente.nome}</p>
                            <p>CPF/CNPJ: {selectedVenda.cliente.cpf_cnpj}</p>
                            <p>Valor Total: {selectedVenda.valorTotal}</p>
                            <p>Número da NF-e: {selectedVenda.numero_nfe}</p>
                            <p>Status: {selectedVenda.status}</p>

                        </div>

                        <div>
                            <h2>Informações Transporte</h2>
                            <p>Modalidade do Frete: {selectedVenda.modFrete}</p>
                            <p>Valor do Frete: {selectedVenda.vFrete}</p>
                            <p>Endereço: {selectedVenda.cliente.rua}, {selectedVenda.cliente.numero}, {selectedVenda.cliente.bairro}, {selectedVenda.cliente.municipio} - {selectedVenda.cliente.uf}</p>
                            <p>CEP: {selectedVenda.cliente.cep}</p>
                            <p>Transportadora: {selectedVenda.transportadora ? selectedVenda.transportadora.nome : "Não especificada"}</p>

                        </div>
                        <div>
                            <h2>Informações Fiscais</h2>

                            <p>Finalidade da NF-e: {selectedVenda.finNFe}</p>
                            <p>Sequência do Evento: {selectedVenda.sequencia_evento}</p>
                            <p>Natureza da Operação: {selectedVenda.natOp}</p>

                        </div>

                        <p>Criado em: {new Date(selectedVenda.created_at).toLocaleString()}</p>
                        <p>Atualizado em: {new Date(selectedVenda.updated_at).toLocaleString()}</p>
                    </div>
                )}
            </Modal>

        </div>
    );
}
