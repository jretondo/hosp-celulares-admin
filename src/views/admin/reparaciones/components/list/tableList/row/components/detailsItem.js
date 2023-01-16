import UrlNodeServer from 'api/NodeServer';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { Button, Col, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from 'reactstrap';
import swal from 'sweetalert';

const DetailsItemRow = ({ setLoading, item, loading, trigger, isOpenModal, setIsOpenModal }) => {
    const [newDetail, setNewDetail] = useState(item.detail)
    const ptoVta = localStorage.getItem("pv")

    const updateDetails = async () => {
        setLoading(true)
        const data = {
            update: { detail: newDetail },
            id: item.id
        }
        await axios.patch(UrlNodeServer.repairsDir.repairs, data, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            const response = res.data
            if (response.status === 200) {
                swal("Reparaciones", "El detalle de la repación se modificó con éxito!", "success")
            } else {
                throw Error("Error inesperado")
            }
        }).catch(error => {
            swal("Reparaciones", "Hubo un error inesperado", "error")
        }).finally(() => {
            setLoading(false)
            setIsOpenModal(false)
            trigger()
        })
    }

    useEffect(() => {
        if (!isOpenModal) {
            setLoading(false)
        }
    }, [isOpenModal])


    return (<>
        <Modal isOpen={isOpenModal} toggle={() => setIsOpenModal(!isOpenModal)}>
            <ModalHeader>Detalles de la reparación - ID: {item.id}</ModalHeader>
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
                    disabled={loading || ptoVta === "null"}
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

    </>)
}

export default DetailsItemRow