import ListadoTable from 'components/subComponents/Listados/ListadoTable2';
import formatMoney from 'Function/NumberFormat';
import moment from 'moment';
import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const CashWithdrawalsDetailsModal = ({ isOpen, toggle, detailsArray }) => {
    console.log('detailsArray :>> ', detailsArray);
    return (<>
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader>
                Detalles de los retiros de efectivo
            </ModalHeader>
            <ModalBody>
                <ListadoTable titulos={["Horario", "Detalle", "Monto"]}>
                    {detailsArray.length > 0 && <>
                        {detailsArray.map((item, key) => {

                            return (<tr key={key}>
                                <td>{moment(item.date_time).format("DD/MM/YY H:mm:ss") + " hs"}</td>
                                <td>{item.detail}</td>
                                <td>$ {formatMoney(item.amount)}</td>
                            </tr>)
                        })}
                    </>}
                </ListadoTable>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={e => {
                    e.preventDefault()
                    toggle()
                }}>
                    Cerrar
                </Button>
            </ModalFooter>
        </Modal>
    </>)
}

export default CashWithdrawalsDetailsModal