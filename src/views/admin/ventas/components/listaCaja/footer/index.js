import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import TotalItemsVtas from './totalItem';

const FooterListVentas = ({
    listaCaja
}) => {
    const [totalesPlant, setTotalesPlant] = useState(<></>)
    const [cashLayOut, setCashLayOut] = useState(<></>)

    useEffect(() => {
        try {
            let efectivoRow = <></>
            let efectivo = 0
            let mercadoPagoRow = <></>
            let mercadoPago = 0
            let debitoRow = <></>
            let debito = 0
            let creditoRow = <></>
            let credito = 0
            let ctacteRow = <></>
            let ctacte = 0
            let retiroRow = <></>
            let netoEfvoRow = <></>
            let fondoRow = <></>
            let totalFinal = 0
            let totalFinalRow = <></>
            const totales = listaCaja.totales
            const totales2 = listaCaja.totales2
            const totalRetiro = listaCaja.retiroData.total === null ? 0 : listaCaja.retiroData.total

            if (totales2.length > 0) {
                totales2.map((item) => {
                    totalFinal = totalFinal + item.SUMA
                    switch (parseInt(item.tipo)) {
                        case 0:
                            efectivo = efectivo + parseFloat(item.SUMA)
                            break;
                        case 1:
                            mercadoPago = mercadoPago + parseFloat(item.SUMA)
                            break;
                        case 2:
                            debito = debito + parseFloat(item.SUMA)
                            break;
                        case 3:
                            credito = credito + parseFloat(item.SUMA)
                            break;
                        case 4:
                            ctacte = ctacte + parseFloat(item.SUMA)
                            break;
                        default:
                            break;
                    }
                })
            }

            if (totales.length > 0) {
                totales.map((item) => {
                    totalFinal = totalFinal + item.SUMA
                    switch (parseInt(item.forma_pago)) {
                        case 0:
                            efectivo = efectivo + parseFloat(item.SUMA)
                            break;
                        case 1:
                            mercadoPago = mercadoPago + parseFloat(item.SUMA)
                            break;
                        case 2:
                            debito = debito + parseFloat(item.SUMA)
                            break;
                        case 3:
                            credito = credito + parseFloat(item.SUMA)
                            break;
                        case 4:
                            ctacte = ctacte + parseFloat(item.SUMA)
                            break;
                        default:
                            break;
                    }
                })
            }

            if (totalRetiro !== 0) {
                if (totalRetiro !== 0) {
                    retiroRow = <TotalItemsVtas
                        totalId={6}
                        totalImporte={-totalRetiro}
                        colSize={4}
                        cashWithdrawalDetails={listaCaja.retiroData.data}
                    />
                }
            }

            netoEfvoRow = <TotalItemsVtas
                totalId={8}
                totalImporte={efectivo - totalRetiro + parseFloat(localStorage.getItem("lastCashFound"))}
                colSize={4}
            />

            fondoRow = <TotalItemsVtas
                totalId={7}
                totalImporte={localStorage.getItem("lastCashFound")}
                colSize={4}
            />

            if (totales.length > 0) {
                if (efectivo !== 0) {
                    efectivoRow = <TotalItemsVtas
                        totalId={0}
                        totalImporte={efectivo}
                        colSize={4}
                    />
                }
                if (mercadoPago !== 0) {
                    mercadoPagoRow = <TotalItemsVtas
                        totalId={1}
                        totalImporte={mercadoPago}
                        colSize={4}
                    />
                }
                if (debito !== 0) {
                    debitoRow = <TotalItemsVtas
                        totalId={2}
                        totalImporte={debito}
                        colSize={4}
                    />
                }
                if (credito !== 0) {
                    creditoRow = <TotalItemsVtas
                        totalId={3}
                        totalImporte={credito}
                        colSize={4}
                    />
                }
                if (ctacte !== 0) {
                    ctacteRow = <TotalItemsVtas
                        totalId={4}
                        totalImporte={ctacte}
                        colSize={4}
                    />
                }
                totalFinalRow = <TotalItemsVtas
                    totalId={9}
                    totalImporte={totalFinal}
                    colSize={4}
                />
                setTotalesPlant(<>
                    {efectivoRow}
                    {mercadoPagoRow}
                    {debitoRow}
                    {creditoRow}
                    {ctacteRow}
                    {totalFinalRow}
                </>)

            } else {
                setTotalesPlant(
                    <TotalItemsVtas
                        totalId={null}
                        totalImporte={0}
                        colSize={6}
                    />
                )
                setCashLayOut(<></>)
            }
            setCashLayOut(<>
                {efectivoRow}
                {retiroRow}
                {fondoRow}
                {netoEfvoRow}
            </>)
        } catch (error) {
            console.log('error :>> ', error);
            setTotalesPlant(
                <TotalItemsVtas
                    totalId={null}
                    totalImporte={0}
                    colSize={6}
                />
            )
        }
    }, [listaCaja])

    return (
        <>
            <Row>
                {totalesPlant}
            </Row>
            <hr />
            <h2>Detalle del efectivo:</h2>
            <Row>
                <Col>
                    {cashLayOut}
                </Col>
            </Row>
        </>
    )
}

export default FooterListVentas