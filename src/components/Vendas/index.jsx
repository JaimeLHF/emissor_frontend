import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { animateScroll as scroll } from "react-scroll";
import styles from './Vendas.module.css';
import InputSearch from '../InputSearch';
import ButtonAdd from '../ButtonAdd';
import Loading from '../Loading';

export default function Vendas() {
    const [vendas, setVendas] = useState([]);
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
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    }, []);

    const scrollToTop = () => {
        scroll.scrollToTop({
            duration: 500, // Duração da animação em milissegundos
            smooth: "easeInOutQuart" // Efeito de animação (opcional)
        });
    };


    const formatarMoeda = (valor) => {
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.actions}>
                <ButtonAdd to='new' text={'New Sale'} />
                <p>Vendas</p>
                <InputSearch placeholder={"Search..."} />
            </div>

            <ul className={styles.responsive_table}>
                <li className={styles.table_header}>
                    <div className={`${styles.col} ${styles.col_1}`}>ID</div>
                    <div className={`${styles.col} ${styles.col_2}`}>Cliente</div>
                    <div className={`${styles.col} ${styles.col_3}`}>Valor</div>
                    <div className={`${styles.col} ${styles.col_4}`}>Nº NF</div>
                    <div className={`${styles.col} ${styles.col_4}`}>Status</div>
                    <div className={`${styles.col} ${styles.col_4}`}></div>
                    <div className={`${styles.col} ${styles.col_4}`}></div>
                </li>
                {loading ? (
                    <Loading />
                ) : (
                    <div>
                        {vendas.map((e) => (
                            <li key={e.id} className={styles.table_row}>
                                <div className={`${styles.col} ${styles.col_1}`}>{e.id}</div>
                                <div className={`${styles.col} ${styles.col_2}`}>{e.cliente.nome}</div>
                                <div className={`${styles.col} ${styles.col_3}`}>{formatarMoeda(e.valorTotal)}</div>
                                <div className={`${styles.col} ${styles.col_4}`}>{e.numero_nfe}</div>
                                <div className={`${styles.col} ${styles.col_4} ${styles[e.status.toLowerCase()]}`}>{e.status}</div>
                                <div className={`${styles.col} ${styles.col_4}`}><Link to={`/venda/${e.id}`}><Button onClick={scrollToTop}>Detalhes</Button></Link></div>
                                <div className={`${styles.col} ${styles.col_4}`}><Button><a href={`https://api.drd.app.br/api/nfe/imprimir/${e.id}`} target='blank'>Download</a></Button></div>
                            </li>
                        ))}
                    </div>
                )}
            </ul>
        </div>
    );
}
