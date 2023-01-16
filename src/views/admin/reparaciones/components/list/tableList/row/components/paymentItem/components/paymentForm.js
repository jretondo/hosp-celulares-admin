import UrlNodeServer from '../../../../../../../../../../api/NodeServer';
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row, Spinner } from 'reactstrap';
import swal from 'sweetalert';
import formatMoney from 'Function/NumberFormat';

const PaymentForm = ({ id, balance, trigger }) => {
    const [detail, setDetail] = useState("")
    const [typePayment, setTypePayment] = useState(0)
    const [amount, setAmount] = useState("")
    const [loading, setLoading] = useState(false)

    const insertPayment = async () => {
        if (balance >= amount) {
            setLoading(true)
            const data = {
                detail: detail,
                repair_id: id,
                type: typePayment,
                amount: amount
            }
            await axios.post(UrlNodeServer.paymentsRepairsDir.paymentsRepairs, data, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('user-token')
                }
            }).then(res => {
                const response = res.data
                if (response.status === 200) {
                    swal("Pagos de reparaciones", "Pago registrado con éxito!", "success")
                    resetForm()
                } else {
                    throw Error("Error inesperado")
                }
            }).catch(error => {
                swal("Pagos de reparaciones", "Error inesperado", "error")
            }).finally(() => {
                setLoading(false)
            })
        } else {
            await swal("Pagos de reparaciones", "El importe de pago no puede ser mayor al pendiente", "error")
            document.getElementById("amountInp").select()
        }
    }

    const resetForm = () => {
        setDetail("")
        setTypePayment("")
        setAmount("")
        trigger()
    }

    return (<>
        <Form onSubmit={e => {
            e.preventDefault()
            insertPayment()
        }}>
            {
                loading ?
                    <Row>
                        <Col md="12" style={{ textAlign: "center" }}>
                            <Spinner style={{ width: "150px", height: "150px" }} />
                        </Col>
                    </Row> :
                    <>
                        <Row>
                            <Col md="4">
                                <FormGroup>
                                    <Label>Saldo pendiente</Label>
                                    <Input disabled value={"$ " + formatMoney(balance)} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form>
                                    <Row>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label>Forma de pago</Label>
                                                <Input value={typePayment} onChange={e => setTypePayment(e.target.value)} type="select">
                                                    <option value={0}>Efectivo</option>
                                                    <option value={1}>Débito</option>
                                                    <option value={2}>Crédito</option>
                                                    <option value={3}>Mercado Pago</option>
                                                    <option value={4}>Transferencia</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label>Importe del pago</Label>
                                                <Input id="amountInp" min={0} max={parseFloat(balance)} value={amount} onChange={e => setAmount(e.target.value)} type="number" required />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <FormGroup>
                                                <Label>Detalles</Label>
                                                <Input value={detail} onChange={e => setDetail(e.target.value)} type="textarea" />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12" style={{ textAlign: "center" }}>
                                <Button type="submit" color="success">Registrar pago</Button>

                                <Button color="danger" onClick={e => {
                                    e.preventDefault()
                                    resetForm()
                                }} >Cancelar</Button>
                            </Col>
                        </Row>
                    </>
            }
        </Form>
    </>)
}

export default PaymentForm