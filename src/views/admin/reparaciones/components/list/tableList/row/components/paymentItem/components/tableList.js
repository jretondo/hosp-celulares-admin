import ListadoTable from 'components/subComponents/Listados/ListadoTable2';
import React, { useState } from 'react';
import { Col, FormGroup, Input, Label, Row } from 'reactstrap';
import PaymentRow from './paymentRow';

const PaymentsList = ({ repairId }) => {
    const [paymentsArray, setPaymentsArray] = useState([])
    return (<>
        <Row style={{ marginTop: "20px" }}>
            <Col md="12">
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
                </ListadoTable>
            </Col>
        </Row>
        <Row>
            <Col md="8">
            </Col>
            <Col md="4">
                <FormGroup>
                    <Label>Saldo pendiente</Label>
                    <Input disabled value={0} />
                </FormGroup>
            </Col>
        </Row>
    </>)
}

export default PaymentsList