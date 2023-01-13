import ButtonOpenCollapse from 'components/buttonOpen';
import React, { useState } from 'react';
import { Button, ButtonGroup, Col, Collapse, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { useWindowSize } from 'Hooks/UseWindowSize'
import PaymentsList from './components/tableList';
import PaymentForm from './components/paymentForm';

const PayItemRow = ({ id, isOpenModal, toggleModal }) => {
    const width = useWindowSize()

    const [moduleActive, setModuleActive] = useState(0)

    const activateList = () => {
        setModuleActive(0)
    }

    const activateForm = () => {
        setModuleActive(1)
    }

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
                            <ButtonOpenCollapse
                                action={activateForm}
                                tittle={"Nuevo pago"}
                                active={moduleActive === 1 ? true : false}
                            />
                        </ButtonGroup>
                    </Col>
                </Row>

                <Collapse isOpen={moduleActive === 0 ? true : false} >
                    <PaymentsList

                    />
                </Collapse>

                <Collapse isOpen={moduleActive === 1 ? true : false} >
                    <PaymentForm />
                </Collapse>
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