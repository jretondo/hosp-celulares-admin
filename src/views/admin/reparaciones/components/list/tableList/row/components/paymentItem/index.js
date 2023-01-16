import ButtonOpenCollapse from 'components/buttonOpen';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, Collapse, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { useWindowSize } from 'Hooks/UseWindowSize'
import PaymentsList from './components/tableList';
import PaymentForm from './components/paymentForm';
import axios from 'axios';
import UrlNodeServer from '../../../../../../../../../api/NodeServer';

const PayItemRow = ({ id, isOpenModal, toggleModal }) => {
    const width = useWindowSize()
    const ptoVta = localStorage.getItem("pv")
    const [moduleActive, setModuleActive] = useState(0)
    const [difference, setDifference] = useState(0)
    const [search, setSearch] = useState(false)

    const activateList = () => {
        setModuleActive(0)
    }

    const activateForm = () => {
        setModuleActive(1)
    }

    const getDifference = async () => {
        await axios.get(UrlNodeServer.paymentsRepairsDir.sub.difference + "/" + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            const response = res.data
            if (response.status === 200) {
                setDifference(response.body)
            } else {
                throw Error("Error inesperado")
            }
        }).catch(error => {
            setDifference(0)
        })
    }

    useEffect(() => {
        if (isOpenModal) {
            getDifference()
        }
    }, [id, isOpenModal, search])

    return (<>
        <Modal size="lg" isOpen={isOpenModal} toggle={toggleModal}>
            <ModalHeader>
                Pagos de la repación - ID: {id}
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col md="12" style={{ textAlign: "center" }}>
                        <ButtonGroup vertical={width > 1030 ? false : true}>
                            <ButtonOpenCollapse
                                action={activateList}
                                tittle={"Pagos relacionados"}
                                active={moduleActive === 0 ? true : false}
                            />
                            {
                                ptoVta === "null" &&
                                <ButtonOpenCollapse
                                    action={activateForm}
                                    tittle={"Nuevo pago"}
                                    active={moduleActive === 1 ? true : false}
                                />
                            }
                        </ButtonGroup>
                    </Col>
                </Row>

                <Collapse isOpen={moduleActive === 0 ? true : false} >
                    <PaymentsList
                        id={id}
                        balance={difference}
                        search={search}
                        trigger={() => setSearch(!search)}
                    />
                </Collapse>

                {
                    ptoVta === "null" &&
                    <Collapse isOpen={moduleActive === 1 ? true : false} >
                        <PaymentForm
                            id={id}
                            balance={difference}
                            trigger={() => setSearch(!search)}
                        />
                    </Collapse>
                }
            </ModalBody>
            <ModalFooter>
                <Button
                    color="danger"
                    onClick={e => {
                        e.preventDefault()
                        toggleModal()
                    }}
                >
                    Cerrar
                </Button>
            </ModalFooter>
        </Modal>
    </>)
}

export default PayItemRow