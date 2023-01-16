import UrlNodeServer from '../../../../../../../../api/NodeServer';
import axios from 'axios';
import React, { useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from 'reactstrap';
import swal from 'sweetalert';

const StateItemRow = ({ state, id, trigger }) => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const ptoVta = localStorage.getItem("pv")
    const changeState = async (e, newState) => {
        e.preventDefault()
        setLoading(true)
        const data = {
            update: { state: newState },
            id: id
        }
        await axios.patch(UrlNodeServer.repairsDir.repairs, data, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            const response = res.data
            if (response.status === 200) {
                swal("Reparaciones", "El estado de la repación se modificó con éxito!", "success")
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

    return (<>
        <td style={{ textAlign: "center" }}>
            <Button
                disabled={ptoVta !== "null"}
                onClick={e => {
                    e.preventDefault()
                    setIsOpenModal(true)
                }}>
                {parseInt(state) === 0 ? "Pendiente de Pago" :
                    parseInt(state) === 1 ? "Pago Parcial" : "Totalmente Pago"}
                {" "}<FiRefreshCcw />
            </Button>
        </td>
        <Modal isOpen={isOpenModal} toggle={() => setIsOpenModal(!isOpenModal)}>
            <ModalHeader>
                Nuevo Estado - ID: ${id}
            </ModalHeader>
            <ModalBody>
                {
                    loading ?
                        <Row>
                            <Col md="12" style={{ textAlign: "center" }}>
                                <Spinner color="primary" style={{ width: "150px", height: "150px" }} />
                            </Col>
                        </Row> :
                        <>
                            <Row>
                                <Col md="12" style={{ textAlign: "center" }}>
                                    <Button color="gray" style={{ width: "200px" }} disabled={state === 0}
                                        onClick={e => changeState(e, 0)}
                                    >Pendiente de Pago</Button>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: "25px" }}>
                                <Col md="12" style={{ textAlign: "center" }}>
                                    <Button color="gray" style={{ width: "200px" }} disabled={state === 1}
                                        onClick={e => changeState(e, 1)}
                                    >Pago Parcial</Button>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: "25px" }}>
                                <Col md="12" style={{ textAlign: "center" }}>
                                    <Button color="gray" style={{ width: "200px" }} disabled={state === 2}
                                        onClick={e => changeState(e, 2)}
                                    >Totalmente Pago</Button>
                                </Col>
                            </Row>
                        </>
                }
            </ModalBody>
            <ModalFooter>
                <Button
                    disabled={loading}
                    color="danger"
                    onClick={e => {
                        e.preventDefault()
                        setIsOpenModal(false)
                    }} >Cerrar</Button>
            </ModalFooter>
        </Modal>
    </>)
}

export default StateItemRow