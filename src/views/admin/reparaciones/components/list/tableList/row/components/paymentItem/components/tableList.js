import UrlNodeServer from '../../../../../../../../../../api/NodeServer';
import axios from 'axios';
import ListadoTable from 'components/subComponents/Listados/ListadoTable2';
import formatMoney from 'Function/NumberFormat';
import React, { useEffect, useState } from 'react';
import { Col, FormGroup, Input, Label, Row, Spinner } from 'reactstrap';
import PaymentRow from './paymentRow';

const PaymentsList = ({ id, balance, trigger, search }) => {
    const [paymentsArray, setPaymentsArray] = useState([])
    const [loading, setLoading] = useState(false)

    const getPayments = async () => {
        setLoading(true)
        await axios.get(UrlNodeServer.paymentsRepairsDir.paymentsRepairs, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            },
            params: {
                repairId: id
            }
        }).then(res => {
            const response = res.data
            if (response.status === 200) {
                setPaymentsArray(response.body.data)
            } else {
                throw Error("")
            }
        }).catch(error => {
            setPaymentsArray([])
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        getPayments()
    }, [search, id])

    return (<>
        <Row style={{ marginTop: "20px" }}>
            <Col md="12" style={{ textAlign: "center" }}>
                {loading ?
                    <Spinner color="danger" /> :
                    <ListadoTable
                        titulos={["Fecha", "Forma de pago", "Importe", ""]}>

                        {paymentsArray.length > 0 ?
                            paymentsArray.map((item, key) => {
                                return (<PaymentRow
                                    key={key}
                                    id={key}
                                    item={item}
                                    trigger={trigger}
                                />)
                            }) : <tr><td>No hay pagos aún</td></tr>
                        }
                    </ListadoTable>}
            </Col>
        </Row>
        <Row>
            <Col md="8">
            </Col>
            <Col md="4">
                <FormGroup>
                    <Label>Saldo pendiente</Label>
                    <Input disabled value={"$ " + formatMoney(balance)} />
                </FormGroup>
            </Col>
        </Row>
    </>)
}

export default PaymentsList