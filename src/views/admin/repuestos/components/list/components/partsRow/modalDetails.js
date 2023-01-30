import UrlNodeServer from 'api/NodeServer';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { Button, Col, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from 'reactstrap';

const ModalDetails = ({
    setLoading, item, loading, trigger, isOpenModal, setIsOpenModal
}) => {
    const [newDetail, setNewDetail] = useState(item.observations)

    const updateDetails = async () => {
        setLoading(true)
        const data = {
            update: { observations: newDetail },
            id: item.id
        }
        await axios.patch(UrlNodeServer.partsDir.parts, data, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            const response = res.data
            if (response.status === 200) {
                swal("Repuestos", "El detalle del repuesto se modificó con éxito!", "success")
                setIsOpenModal(false)
                trigger()
            } else {
                throw Error("Error inesperado")
            }
        }).catch(error => {
            swal("Repuestos", "Hubo un error inesperado", "error")
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        if (!isOpenModal) {
            setLoading(false)
        }
    }, [isOpenModal])
    return (

        <Modal isOpen={isOpenModal} toggle={() => setIsOpenModal(!isOpenModal)}>
            <ModalHeader>Detalles del repuesto</ModalHeader>
            <ModalBody>
                <Row>
                    <Col md="12" style={{ textAlign: `${loading ? "center" : "left"}` }}>
                        {loading ?
                            <Spinner style={{ width: "150px", height: "150px" }} /> :
                            <FormGroup>
                                <Label>
                                    Detalles
                                </Label>
                                <ReactQuill
                                    debug='info'
                                    placeholder='Observaciones generales de la reparación...'
                                    theme='snow'
                                    value={newDetail}
                                    onChange={setNewDetail}
                                    modules={{
                                        toolbar: ['bold', 'italic', 'underline']
                                    }}
                                    style={{ height: "250px", background: "#e8eaed", marginBottom: "100px" }}
                                />
                            </FormGroup>
                        }
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="success"
                    onClick={e => {
                        e.preventDefault()
                        updateDetails()
                    }}
                >
                    Aplicar Cambios
                </Button>
                <Button color="danger"
                    disabled={loading}
                    onClick={e => {
                        e.preventDefault()
                        setIsOpenModal(false)
                    }}>
                    Cerrar
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalDetails