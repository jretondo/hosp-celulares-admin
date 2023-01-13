import UrlNodeServer from '../../../../../../../api/NodeServer';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Col, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, UncontrolledDropdown } from 'reactstrap';
import swal from 'sweetalert';
import ClientItemRow from './components/clientItem';
import StateItemRow from './components/stateItem';
import ImportsItemRow from './components/importsItem';
import DetailsItemRow from './components/detailsItem';
import PayItemRow from './components/paymentItem';

const RepairRow = ({ id, item, trigger }) => {
    const [loading, setLoading] = useState(false)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isOpenModal2, setIsOpenModal2] = useState(false)

    const deleteRepair = async () => {
        swal({
            title: `¿Está seguro de eliminar la repación de ID: ${item.id} ?`,
            text: "Esta operación no tiene retroceso y se eliminarán todos los pagos relacionados.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    await axios.delete(UrlNodeServer.repairsDir.repairs + "/" + item.id, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('user-token')
                        }
                    }).then(res => {
                        const response = res.data
                        if (response.status === 200) {
                            swal("Reparaciones", "Reparación eliminada con éxito!", "success")
                        } else {
                            throw Error("Error inesperado")
                        }
                    }).catch(error => {
                        swal("Reparaciones", "Hubo un error inesperado", "error")
                    }).finally(() => {
                        setLoading(false)
                        trigger()
                    })
                }
            });
    }

    return (
        <>
            <tr id={id} key={id} className={loading ? "shimmer" : ""}>
                <td style={{ textAlign: "center" }}>
                    {item.id}
                </td>
                <td style={{ textAlign: "center" }}>
                    {moment(item.date).format("DD/MM/YYYY HH:mm") + "hs"}
                </td>
                <ClientItemRow
                    client={item.client}
                    id={item.id}
                    trigger={trigger}
                />
                <StateItemRow
                    state={item.state}
                    id={item.id}
                    trigger={trigger}
                />
                <ImportsItemRow
                    item={item}
                />

                <td style={{ textAlign: "center" }}>
                    {`${item.direccion} (${item.raz_soc})`}
                </td>

                <td style={{ textAlign: "center" }}>
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
                            <DropdownItem
                                href="#pablo"
                                onClick={e => {
                                    e.preventDefault()
                                    deleteRepair()
                                }}
                            >
                                <i className="fas fa-trash-alt"></i>
                                Eliminar
                            </DropdownItem>
                            <DropdownItem
                                href="#pablo"
                                onClick={e => {
                                    e.preventDefault()
                                    setIsOpenModal2(true)
                                }}
                            >
                                <i className="fas fa-credit-card"></i>
                                Pagos relacionados
                            </DropdownItem>
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
            <DetailsItemRow
                trigger={trigger}
                item={item}
                setLoading={setLoading}
                loading={loading}
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
            />
            <PayItemRow
                id={item.id}
                isOpenModal={isOpenModal2}
                toggleModal={() => setIsOpenModal2(!isOpenModal2)}
            />
        </>
    )
}

export default RepairRow