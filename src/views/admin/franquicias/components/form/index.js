import UrlNodeServer from '../../../../../api/NodeServer';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row, Spinner } from 'reactstrap';

const FranchisesForm = ({ newForm, setNewForm, idFranchise, dataFranchise, setActividadStr, setNvaActCall, setMsgStrong, setAlertar, alertar, setMsgGralAlert, setSuccessAlert, nvaActCall, triggerList, setIdFranchise }) => {
    const [name, setName] = useState(newForm ? "" : dataFranchise.name)
    const [direction, setDirection] = useState(newForm ? "" : dataFranchise.direction)
    const [user, setUser] = useState(newForm ? "" : dataFranchise.user)
    const [email, setEmail] = useState(newForm ? "" : dataFranchise.email)
    const [obs, setObs] = useState(newForm ? "" : dataFranchise.obs)
    const [phone, setPhone] = useState(newForm ? "" : dataFranchise.phone)
    const [loading, setLoading] = useState(false)

    const upsertFranchise = async (newForm) => {
        setLoading(true)
        const franchise = {
            name,
            direction,
            f_user: user,
            email,
            obs,
            phone,
            id: newForm ? false : idFranchise
        }

        await axios.post(UrlNodeServer.franchisesDir.franchises, franchise, {
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
            console.log('error :>> ', error);
            setMsgStrong("hubo un error! ")
            setMsgGralAlert("Error: " + error.msg)
            setSuccessAlert(false)
            setAlertar(!alertar)
        }).finally(() => {
            setLoading(false)
            triggerList()
            document.getElementById("franchiseName").select()
        })
    }

    const ResetForm = () => {
        setName("")
        setDirection("")
        setUser("")
        setEmail("")
        setObs("")
        setPhone("")
        setNewForm(true)
        setIdFranchise(false)
    }

    const GetFranchise = async () => {
        setLoading(true)
        await axios.get(UrlNodeServer.franchisesDir.sub.details + "/" + idFranchise, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            const response = res.data
            if (response.status === 200) {
                setName(response.body[0].name)
                setUser(response.body[0].f_user)
                setDirection(response.body[0].direction)
                setPhone(response.body[0].phone)
                setObs(response.body[0].obs)
                setEmail(response.body[0].email)
            } else {
                setMsgStrong("Hubo un error inesperado! ")
                setMsgGralAlert("Intente nuevamente")
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
        })
    }

    useEffect(() => {
        if (idFranchise) { GetFranchise() } else { ResetForm() }
    }, [idFranchise])

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
                        upsertFranchise(newForm)
                    }}>
                        <Row>
                            <Col md="3">
                                <FormGroup>
                                    <Label>Nombre de la franquicia</Label>
                                    <Input id="franchiseName" value={name} onChange={e => setName(e.target.value)} type="text" required />
                                </FormGroup>
                            </Col>
                            <Col md="9">
                                <FormGroup>
                                    <Label>Dirección</Label>
                                    <Input value={direction} onChange={e => setDirection(e.target.value)} type="text" required />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4">
                                <FormGroup>
                                    <Label>Usuario</Label>
                                    <Input value={user} onChange={e => setUser(e.target.value)} type="text" required disabled={!newForm} />
                                </FormGroup>
                            </Col>
                            <Col md="4">
                                <FormGroup>
                                    <Label>Email</Label>
                                    <Input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
                                </FormGroup>
                            </Col>
                            <Col md="4">
                                <FormGroup>
                                    <Label>Telefóno</Label>
                                    <Input value={phone} onChange={e => setPhone(e.target.value)} type="text" required />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <FormGroup>
                                    <Label>Observaciones</Label>
                                    <Input type="textarea" value={obs} onChange={e => setObs(e.target.value)} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12" style={{ textAlign: "center" }}>
                                <Button color="success" type="submit">
                                    {newForm ? "Agregar Franquicia" : "Modificar Franquicia"}
                                </Button>
                                <Button color="danger" onClick={e => {
                                    e.preventDefault()
                                    ResetForm()
                                }}>
                                    Cancelar
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        )
    }
}

export default FranchisesForm