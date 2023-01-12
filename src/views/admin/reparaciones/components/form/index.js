import UrlNodeServer from '../../../../../api/NodeServer';
import formatMoney from 'Function/NumberFormat';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row, Spinner } from 'reactstrap';
import FranchisesInput from '../list/franchisesInput';
import axios from 'axios';

const RepairsForm = ({
    newForm,
    setNewForm,
    idRepair,
    setIdRepair,
    dataRepair,
    setActividadStr,
    setNvaActCall,
    setMsgStrong,
    setAlertar,
    alertar,
    setMsgGralAlert,
    setSuccessAlert,
    nvaActCall,
    triggerList
}) => {

    const [loading, setLoading] = useState(false)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [franchiseId, setFranchiseId] = useState(newForm ? false : dataRepair.franchise_id)
    const [franchiseName, setFranchiseName] = useState(newForm ? "" : dataRepair.franchise_name)
    const [client, setClient] = useState(newForm ? "" : client)
    const [finalPrice, setFinalPrice] = useState(newForm ? "" : dataRepair.final_price)
    const [partCost, setPartCost] = useState(newForm ? "" : dataRepair.part_cost)
    const [serviceCost, setServiceCost] = useState(newForm ? "" : dataRepair.service_cost)
    const [repairState, setRepairState] = useState(newForm ? 0 : dataRepair.state)
    const [detail, setDetail] = useState(newForm ? "" : dataRepair.detail)

    const upsertRepair = async (newForm) => {
        setLoading(true)
        const repair = {
            detail,
            client,
            part_cost: partCost,
            service_cost: serviceCost,
            final_price: finalPrice,
            state: repairState,
            franchise_id: franchiseId,
            id: newForm ? false : idRepair
        }

        await axios.post(UrlNodeServer.repairsDir.repairs, repair, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            const respuesta = res.data
            const status = parseInt(respuesta.status)
            if (status === 200) {
                if (!newForm) {
                    setActividadStr("El usuario ha modificado a la franquicia '" + name + "'")
                    setNvaActCall(!nvaActCall)
                    setMsgStrong("Franquicia modificada con éxito!")
                } else {
                    setActividadStr("El usuario ha agregado a la franquicia '" + name + "'")
                    setNvaActCall(!nvaActCall)
                    setMsgStrong("Franquicia agregada con éxito!")
                }
                setMsgGralAlert("")
                setSuccessAlert(true)
                setAlertar(!alertar)
                ResetForm()
            } else {
                setMsgStrong("hubo un error! ")
                setMsgGralAlert("intente nuevamente")
                setSuccessAlert(false)
                setAlertar(!alertar)
            }
        }).catch(error => {
            setMsgStrong("hubo un error! ")
            setMsgGralAlert("Error: " + error.msg)
            setSuccessAlert(false)
            setAlertar(!alertar)
        }).finally(() => {
            setLoading(false)
            triggerList()
        })
    }

    const ResetForm = () => {
        setFranchiseId(false)
        setFranchiseName("")
        setClient("")
        setFinalPrice("")
        setPartCost("")
        setServiceCost("")
        setRepairState(0)
        setDetail("")
        setNewForm(true)
        setIdRepair(false)
    }

    if (loading) {
        return (
            <Card style={{ marginTop: "30px" }}>
                <CardBody>
                    <Row>
                        <Col md="12" style={{ textAlign: "center" }}>
                            <Spinner color="primary" style={{ width: "200px", height: "200px" }} />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        )
    } else {
        return (
            <Card style={{ marginTop: "30px" }}>
                <CardBody>
                    <Form onSubmit={e => {
                        e.preventDefault()
                        if (franchiseId) {
                            upsertRepair(newForm)
                        } else {
                            setMsgStrong("Olvidó información! ")
                            setMsgGralAlert("No puede completar una reparación sin asignar una franquicia")
                            setSuccessAlert(false)
                            setAlertar(!alertar)
                            setIsOpenModal(true)
                        }
                    }}>
                        <Row>
                            <Col md="6">
                                <FranchisesInput
                                    franchiseName={franchiseName}
                                    setIsOpenModal={setIsOpenModal}
                                    isOpenModal={isOpenModal}
                                    setFranchiseName={setFranchiseName}
                                    setFranchiseId={setFranchiseId}
                                    all={false}
                                />
                            </Col>
                            <Col md="6">
                                <FormGroup>
                                    <Label>
                                        Cliente
                                    </Label>
                                    <Input type="text" value={client} onChange={(e) => setClient(e.target.value)} required />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="3">
                                <FormGroup>
                                    <Label>
                                        Costo de repuesto
                                    </Label>
                                    <Input min={0} type="number" value={partCost} onChange={e => setPartCost(e.target.value)} />
                                </FormGroup>
                            </Col>
                            <Col md="3">
                                <FormGroup>
                                    <Label>
                                        Costo de servicio
                                    </Label>
                                    <Input min={0} type="number" value={serviceCost} onChange={e => setServiceCost(e.target.value)} />
                                </FormGroup>
                            </Col>
                            <Col md="3">
                                <FormGroup>
                                    <Label>
                                        Total HPC
                                    </Label>
                                    <Input type="text" value={"$ " + formatMoney(parseFloat(partCost) + parseFloat(serviceCost))} disabled />
                                </FormGroup>
                            </Col>
                            <Col md="3">
                                <FormGroup>
                                    <Label>
                                        Precio final cliente
                                    </Label>
                                    <Input min={parseFloat(partCost) + parseFloat(serviceCost)} type="number" value={finalPrice} onChange={e => setFinalPrice(e.target.value)} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="9">
                                <FormGroup>
                                    <Label>
                                        Detalles
                                    </Label>
                                    <ReactQuill
                                        debug='info'
                                        placeholder='Observaciones generales de la reparación...'
                                        theme='snow'
                                        value={detail}
                                        onChange={setDetail}
                                        modules={{
                                            toolbar: ['bold', 'italic', 'underline']
                                        }}
                                        style={{ height: "250px", background: "#e8eaed", marginBottom: "100px" }}
                                    />

                                </FormGroup>
                            </Col>
                            <Col md="3">
                                <FormGroup>
                                    <Label>
                                        Estado
                                    </Label>
                                    <Input type="select" value={repairState} onChange={e => setRepairState(e.target.value)}>
                                        <option value={0}>Pendiente de pago</option>
                                        <option value={1}>Pago parcial</option>
                                        <option value={2}>Totalmente pago</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12" style={{ textAlign: "center" }}>
                                <Button color="danger" onClick={e => {
                                    e.preventDefault()
                                    ResetForm()
                                }} >Cancelar</Button>
                                <Button color="success" type="submit">Registrar Reparación</Button>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card >
        )
    }
}

export default RepairsForm