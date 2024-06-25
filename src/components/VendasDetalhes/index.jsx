import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, DollarOutlined, InfoCircleOutlined, ProductOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { Button, Pagination } from 'antd';
import styles from './VendasDetalhes.module.css';
import Loading from '../Loading';

const LIMIT = 7;

export default function VendasDetalhes() {
    const { id } = useParams();
    const [venda, setVenda] = useState(null);
    const [vendasCount, setVendasCount] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://api.drd.app.br/api/venda/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setVenda(data);
                setVendasCount(data.itens.length);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    }, [id]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleBackButtonClick = () => {
        navigate(-1);
    };

    const formatarMoeda = (valor) => {
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    };


    const paginatedItems = venda ? venda.itens.slice((currentPage - 1) * LIMIT, currentPage * LIMIT) : [];

    return (
        <div className={styles.container}>
            <div className={styles.header_title}>
                <Button className={styles.backButton} onClick={handleBackButtonClick}><ArrowLeftOutlined />Voltar</Button>
                <h1>Detalhes da Venda</h1>
                <div></div>
            </div>
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <div className={styles.section}>
                        <div className={styles.header_cards}>
                            <InfoCircleOutlined />
                            <h2>Informações Venda</h2>
                            <div></div>
                        </div>
                        <div className={styles.details}>
                            <p>ID: {venda.id}</p>
                            <p>Valor Total: {formatarMoeda(venda.valorTotal)}</p>
                            <p>Número da NF-e: {venda.numero_nfe}</p>
                            <p>Status: {venda.status}</p>
                            <p>Modalidade do Frete: {venda.modFrete}</p>
                            <p>Natureza da Operação: {venda.natOp}</p>
                            {venda.motivo_rejeitado ? <p>Motivo Rejeição: {venda.motivo_rejeitado}</p> : ""}
                            <p>Finalidade da NF-e: {venda.finNFe}</p>
                            <p>Criado em: {new Date(venda.created_at).toLocaleString()}</p>
                            <p>Atualizado em: {new Date(venda.updated_at).toLocaleString()}</p>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <div className={styles.header_cards}>
                            <UserSwitchOutlined />
                            <h2>Informações do Cliente</h2>
                            <div></div>
                        </div>
                        <div className={styles.details}>
                            <p>Nome: {venda.cliente.nome}</p>
                            <p>CPF/CNPJ: {venda.cliente.cpf_cnpj}</p>
                            <p>IE/RG: {venda.cliente.ie_rg}</p>
                            <p>CEP: {venda.cliente.cep}</p>
                            <p>Endereço: {venda.cliente.rua}, {venda.cliente.numero}, {venda.cliente.bairro}, {venda.cliente.municipio} - {venda.cliente.uf}</p>
                            <p>Complemento: {venda.cliente.complemento}</p>
                            <p>Telefone: {venda.cliente.telefone}</p>
                            <p>Email: {venda.cliente.email}</p>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <div className={styles.header_cards}>
                            <ProductOutlined />
                            <h2>Informações dos Itens</h2>
                            <div></div>
                        </div>
                        <div className={styles.details}>
                            <ul className={styles.responsive_table}>
                                <li className={styles.table_header}>
                                    <div className={`${styles.col} ${styles.col_1}`}>ID</div>
                                    <div className={`${styles.col} ${styles.col_2}`}>Produto</div>
                                    <div className={`${styles.col} ${styles.col_3}`}>Acabamento</div>
                                    <div className={`${styles.col} ${styles.col_4}`}>Qtd</div>
                                    <div className={`${styles.col} ${styles.col_4}`}>Valor</div>
                                </li>
                                <div>
                                    {paginatedItems.map((e) => (
                                        <li key={e.id} className={styles.table_row}>
                                            <div className={`${styles.col} ${styles.col_1}`}>{e.produto.id}</div>
                                            <div className={`${styles.col} ${styles.col_2}`}>{e.produto.nome}</div>
                                            <div className={`${styles.col} ${styles.col_3}`}>{e.produto.acabamento_id ? e.produto.acabamento.nome : '- - -'}</div>
                                            <div className={`${styles.col} ${styles.col_4}`}>{e.qtd}</div>
                                            <div className={`${styles.col} ${styles.col_4}`}>{formatarMoeda(e.valor)}</div>
                                        </li>
                                    ))}
                                </div>
                            </ul>
                        </div>
                        {vendasCount > LIMIT && (
                            <Pagination
                                current={currentPage}
                                pageSize={LIMIT}
                                total={vendasCount}
                                onChange={handlePageChange}
                            />
                        )}
                    </div>

                    <div className={styles.section}>
                        <div className={styles.header_cards}>
                            <DollarOutlined />
                            <h2>Informações da Fatura</h2>
                            <div></div>
                        </div>
                        <div className={styles.details}>
                            {venda.fatura.map((fatura) => (
                                <div key={fatura.id}>
                                    <p>Status: {fatura.status}</p>
                                    <p>Valor: {formatarMoeda(fatura.valor)}</p>
                                    <p>Valor IPI: {formatarMoeda(fatura.valor_ipi)}</p>
                                    <p>Forma de Pagamento: {fatura.forma_pagamento}</p>
                                    <p>Vencimento: {fatura.vencimento}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <Button className={styles.backButton} onClick={handleBackButtonClick}><ArrowLeftOutlined />Voltar</Button>
        </div>
    );
}
