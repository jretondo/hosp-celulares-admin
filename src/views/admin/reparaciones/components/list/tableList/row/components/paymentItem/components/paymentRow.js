import UrlNodeServer from '../../../../../../../../../../api/NodeServer';
import axios from 'axios';
import formatMoney from 'Function/NumberFormat';
import moment from 'moment';
import React, { useState } from 'react';
import { Button, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, UncontrolledDropdown } from 'reactstrap';
import swal from 'sweetalert';

const PaymentRow = ({ key, id, item, trigger }) => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const ptoVta = localStorage.getItem("pv")
    const deletePayment = async () => {

        swal({
            title: `¿Está seguro de eliminar el pago por $ ${formatMoney(item.amount)} ?`,
            text: "Esta operación no tiene retroceso.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    await axios.delete(UrlNodeServer.paymentsRepairsDir.paymentsRepairs + "/" + item.id, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('user-token')
                        }
                    }).then(res => {
                        const response = res.data
                        if (response.status === 200) {
                            swal("Pagos", "Pago eliminada con éxito!", "success")
                        } else {
                            throw Error("Error inesperado")
                        }
                    }).catch(error => {
                        swal("Pagos", "Hubo un error inesperado", "error")
                    }).finally(() => {
                        setLoading(false)
                        trigger()
                    })
                }
            });
    }

    return (<>
        <tr>
            <td style={{ textAlign: "center" }}>
                {moment(item.date).format("DD/MM/YYYY")}
            </td>
            <td style={{ textAlign: "center" }}>
                {parseInt(item.type) === 0 ? "Efectivo" :
                    parseInt(item.type) === 0 ? "Débito" :
                        parseInt(item.type) === 0 ? "Crédito" :
                            parseInt(item.type) === 0 ? "Mercado Pago" :
                                "Transferencia"
                }
            </td>
            <td style={{ textAlign: "center" }}>
                $ {formatMoney(item.amount)}
            </td>
            <td>
                <UncontrolledDropdown>
                    <DropdownToggle
                        className="btn-icon-only text-light"
                        href="#pablo"
                        role="button"
                        size="sm"
                        color=""
                        onClick={e => e.preventDefault()}
                    >
                        <i className="fas fa-ellipsis-v" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                        {
                            ptoVta === "null" &&
                            <DropdownItem
                                href="#pablo"
                                onClick={e => {
                                    e.preventDefault()
                                    deletePayment()
                                }}
                            >
                                <i className="fas fa-trash-alt"></i>
                                Eliminar
                            </DropdownItem>
                        }
                        <DropdownItem
                            href="#pablo"
                            onClick={e => {
                                e.preventDefault()
                                setIsOpenModal(true)
                            }}
                        >
                            <i className="fas fa-search"></i>
                            Detalles
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </td>
        </tr>
        <Modal isOpen={isOpenModal} toggle={() => setIsOpenModal(!isOpenModal)}>
            <ModalHeader>Detalles del pago por $ {formatMoney(item.amount)}</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label>Detalles del pago:</Label>
                    <Input type="textarea" style={{ height: "150px" }} value={item.detail} disabled />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="danger"
                    onClick={e => {
                        e.preventDefault()
                        setIsOpenModal(false)
                    }}
                >Cerrar</Button>
            </ModalFooter>
        </Modal>
    </>)
}

export default PaymentRow