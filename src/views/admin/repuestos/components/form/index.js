import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, Label, Row, Spinner } from 'reactstrap';
import PtosVtas from './ptosVta';

import PartTypeModal from './partTypeModal';
import ReactQuill from 'react-quill';
import PartStateModal from './partStateModal';
import axios from 'axios';
import UrlNodeServer from '../../../../../api/NodeServer';
import swal from 'sweetalert';

const PartsForm = ({
    trigger,
    dataPart,
    newForm
}) => {
    const [isOpenModalTypes, setIsOpenModalTypes] = useState(false)
    const [isOpenModalStates, setIsOpenModalStates] = useState(false)
    const [partTypeId, setPartTypeId] = useState(newForm ? false : dataPart.accessoryTypeId)
    const [partTypeName, setPartTypeName] = useState(newForm ? "" : dataPart.accessoryType)
    const [modelName, setModelName] = useState(newForm ? "" : dataPart.model)
    const [color, setColor] = useState(newForm ? "" : dataPart.accessoryColor)
    const [ptoVta, setPtoVta] = useState({ id: false })
    const [stateId, setStateId] = useState(false)
    const [stateName, setStateName] = useState("")
    const [stateColor, setStateColor] = useState("")
    const [observations, setObservations] = useState("")
    const [loading, setLoading] = useState(false)

    const resetForm = () => {
        setPartTypeId(false)
        setPartTypeName("")
        setModelName("")
        setColor("")
        setPtoVta({ id: false })
        setStateId(false)
        setStateName("")
        setObservations("")
    }

    const newPartAccessory = async () => {
        if (ptoVta.id && partTypeId && stateId) {
            setLoading(true)
            const data = {
                color: color,
                model: modelName,
                observations: observations,
                pv_id: ptoVta.id,
                type_id: partTypeId,
                state_id: stateId
            }
            await axios.post(UrlNodeServer.partsDir.parts, data, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('user-token')
                }
            }).then(res => {
                const response = res.data
                if (response.status === 200) {
                    swal("Accesorios/Repuestos", "Registrado con éxito!", "success")
                    resetForm()
                    trigger()
                } else {
                    throw Error("Error inesperado")
                }
            }).catch(() => {
                swal("Accesorios/Repuestos", "Hubo un error inesperado", "error")
            }).finally(() => {
                setLoading(false)
            })
        } else {
            swal("Accesorios/Repuestos", "Faltan completar datos", "error")
        }
    }

    return (<>
        <Card>
            <CardBody>
                <Form onSubmit={e => {
                    e.preventDefault()
                    newPartAccessory()
                }}>
                    {
                        loading ?
                            <Row>
                                <Col md="12" style={{ textAlign: "center" }}>
                                    <Spinner color="danger" style={{ width: "200px", height: "200px" }} />
                                </Col>
                            </Row> :
                            <>
                                <Row>
                                    <Col md="4">
                                        <FormGroup>
                                            <Label>Tipo de repuesto/accesorio</Label>
                                            <InputGroup>
                                                <Input value={partTypeName} disabled />
                                                <InputGroupAddon addonType="append"><Button color="primary" onClick={() => setIsOpenModalTypes(!isOpenModalTypes)}>Buscar</Button></InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col md="4">
                                        <FormGroup>
                                            <Label>Modelo</Label>
                                            <Input required value={modelName} onChange={e => setModelName(e.target.value)} />
                                        </FormGroup>
                                    </Col>
                                    <Col md="4">
                                        <FormGroup>
                                            <Label>Color</Label>
                                            <Input required value={color} onChange={e => setColor(e.target.value)} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <PtosVtas
                                        setPtoVta={setPtoVta}
                                        ptoVta={ptoVta}
                                        colSize={6}
                                    />
                                    <Col md="6">
                                        <FormGroup>
                                            <Label>Estado del repuesto</Label>
                                            <InputGroup>
                                                <Input style={stateColor === "" ? {} : { backgroundColor: `${stateColor}`, color: "white" }} value={stateName} disabled />
                                                <InputGroupAddon addonType="append"><Button color="primary" onClick={() => setIsOpenModalStates(!isOpenModalStates)}>Buscar</Button></InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                            <Label>
                                                Observaciones
                                            </Label>
                                            <ReactQuill
                                                debug='info'
                                                placeholder='Observaciones generales de la reparación...'
                                                theme='snow'
                                                value={observations}
                                                onChange={setObservations}
                                                modules={{
                                                    toolbar: ['bold', 'italic', 'underline']
                                                }}
                                                style={{ height: "250px", background: "#e8eaed", marginBottom: "100px" }}
                                            />

                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12" style={{ textAlign: "center" }}>
                                        <Button color="success" type="submit">Crear Registro</Button>
                                        <Button color="danger" onClick={e => {
                                            e.preventDefault()
                                            resetForm()
                                        }}>Cancelar</Button>
                                    </Col>
                                </Row>
                            </>
                    }
                </Form>
            </CardBody>
        </Card>
        <PartTypeModal
            setPartTypeId={setPartTypeId}
            setPartTypeName={setPartTypeName}
            isOpenModalTypes={isOpenModalTypes}
            toggle={() => setIsOpenModalTypes(!isOpenModalTypes)}
        />
        <PartStateModal
            setStateId={setStateId}
            setStateName={setStateName}
            isOpenModalState={isOpenModalStates}
            setStateColor={setStateColor}
            toggle={() => setIsOpenModalStates(!isOpenModalStates)}
        />
    </>)
}

export default PartsForm