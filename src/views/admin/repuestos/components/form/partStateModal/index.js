import UrlNodeServer from '../../../../../../api/NodeServer';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, FormGroup, Input, InputGroup, InputGroupAddon, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from 'reactstrap';
import swal from 'sweetalert';
import ListPartStates from './list';

const PartStateModal = ({
    setStateId,
    setStateName,
    setStateColor,
    isOpenModalState,
    toggle,
    filter,
    update
}) => {
    const [newStateName, setNewStateName] = useState("")
    const [newStateColor, setNewStateColor] = useState("")
    const [searchText, setSearchText] = useState("")
    const [loading, setLoading] = useState(false)
    const [statesArray, setStatesArray] = useState([])
    const [statesFiltered, setStatesFiltered] = useState([])

    const addNewState = async () => {
        setLoading(true)
        await axios.post(UrlNodeServer.partsDir.sub.states, { state: newStateName, color: newStateColor }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            const response = res.data
            if (response.status === 200) {
                setStateName(newStateName)
                setStateColor(newStateColor)
                setStateId(response.body.insertId)
                swal("Nuevo Estado", "Nuevo estado agregado éxitosamente!", "success")
                toggle()
            } else {
                throw Error("Hubo un error")
            }
        }).catch(error => {
            swal("Nuevo estado", "No se puede repetir el estado", "error")
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        setStatesFiltered(statesArray)
    }, [statesArray])

    const changeSearchText = (e) => {
        try {
            const newArray = statesArray.filter(item => (item.state).toLowerCase().indexOf(e.target.value) !== -1)
            setStatesFiltered(() => newArray)
            setSearchText(e.target.value)
        } catch (error) {
            setStatesFiltered(statesArray)
        }
    }

    useEffect(() => {
        setLoading(false)
    }, [isOpenModalState])

    return (
        <Modal isOpen={isOpenModalState} toggle={toggle}>
            <ModalHeader>
                <h3>Estado</h3>
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col md="12">
                        <FormGroup>
                            <Label>Buscar Estado</Label>
                            <Input onChange={e => changeSearchText(e)} value={searchText} />
                        </FormGroup>
                    </Col>
                </Row>
                {
                    loading ?
                        <Row>
                            <Col md="12" style={{ textAlign: "center" }}>
                                <Spinner style={{ width: "150px", height: "150px" }} />
                            </Col>
                        </Row>
                        :
                        <>
                            <ListPartStates
                                setStateId={setStateId}
                                setStateName={setStateName}
                                setStateColor={setStateColor}
                                toggle={toggle}
                                statesArray={statesFiltered}
                                setStatesArray={setStatesArray}
                                filter={filter}
                                update={update}
                            />
                            <hr />
                            <Row>
                                <Col md="12">
                                    <FormGroup>
                                        <Label>Nuevo Estado</Label>
                                        <InputGroup>
                                            <Input style={newStateColor === "" ? {} : { backgroundColor: `${newStateColor}`, color: "white" }} placeholder="Nombre del estado..." onChange={e => setNewStateName(e.target.value)} value={newStateName} />
                                            <Input style={newStateColor === "" ? {} : { backgroundColor: `${newStateColor}`, color: "white" }} type="select" onChange={e => setNewStateColor(e.target.value)} value={newStateColor}>
                                                <option value={""}>Sin Color</option>
                                                <option value={"red"}>Rojo</option>
                                                <option value={"blue"}>Azul</option>
                                                <option value={"green"}>Verde</option>
                                                <option value={"violet"}>Violeta</option>
                                            </Input>
                                            <InputGroupAddon addonType="append"><Button color="success" onClick={(e) => {
                                                e.preventDefault()
                                                addNewState()
                                            }}>Agregar</Button></InputGroupAddon>
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </>
                }
            </ModalBody>
            <ModalFooter>
                <Button
                    color="danger"
                    disabled={loading}
                    onClick={e => {
                        e.preventDefault()
                        toggle()
                    }}>Cancelar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default PartStateModal