import UrlNodeServer from '../../../../../../api/NodeServer';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, FormGroup, Input, InputGroup, InputGroupAddon, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from 'reactstrap';
import ListPartTypes from './list';
import swal from 'sweetalert';

const PartTypeModal = ({
    setPartTypeId,
    setPartTypeName,
    isOpenModalTypes,
    toggle,
    filter
}) => {
    const [newTypeName, setNewTypeName] = useState("")
    const [searchText, setSearchText] = useState("")
    const [loading, setLoading] = useState(false)
    const [partTypesArray, setPartTypesArray] = useState([])
    const [partTypesFiltered, setPartTypesFiltered] = useState([])

    const addNewType = async () => {
        setLoading(true)
        await axios.post(UrlNodeServer.partsDir.sub.types, { type: newTypeName }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            const response = res.data
            if (response.status === 200) {
                setPartTypeName(newTypeName)
                console.log('response :>> ', response);
                setPartTypeId(response.body.insertId)
                swal("Nuevo Tipo", "Nuevo tipo agregado éxitosamente!", "success")
                toggle()
            } else {
                throw Error("Hubo un error")
            }
        }).catch(error => {
            swal("Nuevo Tipo", "No se puede repetir el tipo", "error")
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        setPartTypesFiltered(partTypesArray)
    }, [partTypesArray])

    const changeSearchText = (e) => {
        try {
            const newArray = partTypesArray.filter(item => item.type.indexOf(e.target.value) !== -1)
            setPartTypesFiltered(() => newArray)
            setSearchText(e.target.value)
        } catch (error) {
            setPartTypesFiltered(partTypesArray)
        }
    }

    useEffect(() => {
        setLoading(false)
    }, [isOpenModalTypes])

    return (
        <Modal isOpen={isOpenModalTypes} toggle={toggle}>
            <ModalHeader>
                <h3>Tipo de repuesto/accesorio</h3>
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col md="12">
                        <FormGroup>
                            <Label>Buscar Tipo</Label>
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
                            <ListPartTypes
                                setPartTypeId={setPartTypeId}
                                setPartTypeName={setPartTypeName}
                                toggle={toggle}
                                setPartTypesArray={setPartTypesArray}
                                partTypesArray={partTypesFiltered}
                                filter={filter}
                            />
                            <hr />
                            <Row>
                                <Col md="12">
                                    <FormGroup>
                                        <Label>Nuevo Tipo</Label>
                                        <InputGroup>
                                            <Input onChange={e => setNewTypeName(e.target.value)} value={newTypeName} />
                                            <InputGroupAddon addonType="append"><Button color="success" onClick={(e) => {
                                                e.preventDefault()
                                                addNewType()
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

export default PartTypeModal