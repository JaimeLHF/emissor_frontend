import { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import styles from './Clientes.module.css';
import InputSearch from '../InputSearch';
import ButtonAdd from '../ButtonAdd';
import Loading from '../Loading';

export function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://api.drd.app.br/api/clientes`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setClientes(data);
                console.log(data)
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const handleDetalhesClick = (produto) => {
        setSelectedCliente(produto);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedCliente(null);
    };

    return (
        <div className={styles.container}>
            <div className={styles.actions}>
                <ButtonAdd to='new' text={'New Product'} />
                <p>Clientes</p>
                <InputSearch placeholder={"Search..."} />
            </div>


            <ul className={styles.responsive_table}>

                <li className={styles.table_header}>
                    <div className={`${styles.col} ${styles.col_1}`}>ID</div>
                    <div className={`${styles.col} ${styles.col_2}`}>Nome</div>
                    <div className={`${styles.col} ${styles.col_3}`}>Razão Social</div>
                    <div className={`${styles.col} ${styles.col_4}`}>CNPJ / CPF</div>
                    <div className={`${styles.col} ${styles.col_4}`}></div>
                </li>

                {loading ? (
                    <Loading />
                ) : (
                    <div>
                        {clientes.map((e) => (
                            <li key={e.id} className={styles.table_row}>
                                <div className={`${styles.col} ${styles.col_1}`} >{e.id}</div>
                                <div className={`${styles.col} ${styles.col_2}`}>{e.nome}</div>
                                <div className={`${styles.col} ${styles.col_3}`}>{e.razao_social ? e.razao_social : '- - -'}</div>
                                <div className={`${styles.col} ${styles.col_4}`}>{e.cpf_cnpj}</div>
                                <div className={`${styles.col} ${styles.col_4}`}><Button onClick={() => handleDetalhesClick(e)}>Detalhes</Button></div>
                            </li>
                        ))}
                    </div>
                )}
            </ul>

            <Modal
                className={styles.modal}
                title="Detalhes do Produto"
                open={modalVisible}
                onCancel={closeModal}
                footer={[
                    <Button key="close" onClick={closeModal}>
                        Fechar
                    </Button>
                ]}
            >
                {selectedCliente && (
                    <div className={styles.modal_content}>
                        <div>
                            <h2>Informações do Cliente</h2>
                            <p>ID: <span className="content_modal"> {selectedCliente.id}</span></p>
                            <p>Nome: <span className="content_modal">{selectedCliente.nome}</span></p>
                            <p>Razão Social: <span className="content_modal">{selectedCliente.razao_social || '- - -'}</span></p>
                            <p>CPF/CNPJ: <span className="content_modal">{selectedCliente.cpf_cnpj}</span></p>
                            <p>IE/RG: <span className="content_modal">{selectedCliente.ie_rg}</span></p>
                            <p>IM: <span className="content_modal">{selectedCliente.im || '- - -'}</span></p>
                            <p>Contribuinte: <span className="content_modal">{selectedCliente.contribuinte ? 'Sim' : 'Não'}</span></p>
                        </div>
                        <div>
                            <h2>Endereço</h2>
                            <p>CEP: <span className="content_modal">{selectedCliente.cep}</span></p>
                            <p>Rua: <span className="content_modal">{selectedCliente.rua}</span></p>
                            <p>Número: <span className="content_modal">{selectedCliente.numero}</span></p>
                            <p>Bairro: <span className="content_modal">{selectedCliente.bairro}</span></p>
                            <p>Município: <span className="content_modal">{selectedCliente.municipio}</span></p>
                            <p>UF: <span className="content_modal">{selectedCliente.uf}</span></p>
                            <p>Complemento: <span className="content_modal">{selectedCliente.complemento || '- - -'}</span></p>
                        </div>
                        <div>
                            <h2>Contato</h2>
                            <p>Telefone: <span className="content_modal">{selectedCliente.telefone}</span></p>
                            <p>Email: <span className="content_modal">{selectedCliente.email}</span></p>
                        </div>
                        <p>Criado em: <span className="content_modal">{new Date(selectedCliente.created_at).toLocaleString()}</span></p>
                        <p>Atualizado em: <span className="content_modal"> {new Date(selectedCliente.updated_at).toLocaleString()}</span></p>
                    </div>
                )}
            </Modal>
        </div>
    );
}
