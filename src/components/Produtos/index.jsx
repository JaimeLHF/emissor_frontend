import { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import styles from './Produtos.module.css';
import InputSearch from '../InputSearch';
import ButtonAdd from '../ButtonAdd';
import Loading from '../Loading';

export function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://api.drd.app.br/api/produtos`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setProdutos(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const handleDetalhesClick = (produto) => {
        setSelectedProduct(produto);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedProduct(null);
    };

    return (
        <div className={styles.container}>
            <div className={styles.actions}>
                <ButtonAdd to='new' text={'New Product'} />
                <p>Produtos</p>
                <InputSearch placeholder={"Search..."} />
            </div>


            <ul className={styles.responsive_table}>

                <li className={styles.table_header}>
                    <div className={`${styles.col} ${styles.col_1}`}>ID</div>
                    <div className={`${styles.col} ${styles.col_2}`}>Produto</div>
                    <div className={`${styles.col} ${styles.col_3}`}>Acabamento</div>
                    <div className={`${styles.col} ${styles.col_4}`}>Valor</div>
                    <div className={`${styles.col} ${styles.col_4}`}></div>
                </li>

                {loading ? (
                    <Loading />
                ) : (
                    <div>
                        {produtos.map((e) => (
                            <li key={e.id} className={styles.table_row}>
                                <div className={`${styles.col} ${styles.col_1}`} >{e.id}</div>
                                <div className={`${styles.col} ${styles.col_2}`}>{e.nome}</div>
                                <div className={`${styles.col} ${styles.col_3}`}>{e.acabamento_id ? e.acabamento.nome : '- - -'}</div>
                                <div className={`${styles.col} ${styles.col_4}`}>{e.valor}</div>
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
                {selectedProduct && (
                    <div className={styles.modal_content}>
                        <div>
                            <h2>Informações Produto</h2>
                            <p>ID: <span className="content_modal"> {selectedProduct.id}</span></p>
                            <p>Nome: <span className="content_modal">{selectedProduct.nome}</span></p>
                            <p>Acabamento: <span className="content_modal">{selectedProduct.acabamento_id ? selectedProduct.acabamento.nome : '- - -'}</span></p>
                            <p>Tipo: <span className="content_modal">{selectedProduct.tipo}</span></p>
                            <p>Valor: <span className="content_modal">{selectedProduct.valor}</span></p>
                            <p>Unidade de Venda: <span className="content_modal"> {selectedProduct.und_venda}</span></p>
                        </div>
                        <div>
                            <h2>Informações Fiscais</h2>
                            <p>CFOP Interno: <span className="content_modal"> {selectedProduct.cfop_interno}</span></p>
                            <p>CFOP Externo: <span className="content_modal">{selectedProduct.cfop_externo}</span></p>
                            <p>NCM: <span className="content_modal">{selectedProduct.ncm}</span></p>
                            <p>Orig: <span className="content_modal">{selectedProduct.orig}</span></p>
                            <p>Código de Barras: <span className="content_modal">{selectedProduct.codigo_barras}</span></p>
                            <p>CST CSOSN: <span className="content_modal">{selectedProduct.cst_csosn}</span></p>
                            <p>CST PIS: <span className="content_modal">{selectedProduct.cst_pis}</span></p>
                            <p>CST COFINS: <span className="content_modal">{selectedProduct.cst_cofins}</span></p>
                            <p>CST IPI: <span className="content_modal"> {selectedProduct.cst_ipi}</span></p>
                            <p>Percentual ICMS: <span className="content_modal"> {selectedProduct.perc_icms}%</span></p>
                            <p>Percentual PIS: <span className="content_modal"> {selectedProduct.perc_pis}%</span></p>
                            <p>Percentual COFINS: <span className="content_modal">{selectedProduct.perc_cofins}%</span></p>
                            <p>Percentual IPI: <span className="content_modal">{selectedProduct.perc_ipi}%</span></p>
                        </div>
                        <p>Criado em: <span className="content_modal">{new Date(selectedProduct.created_at).toLocaleString()}</span></p>
                        <p>Atualizado em: <span className="content_modal"> {new Date(selectedProduct.updated_at).toLocaleString()}</span></p>
                    </div>
                )}
            </Modal>
        </div>
    );
}
