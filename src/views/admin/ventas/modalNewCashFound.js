import UrlNodeServer from '../../../api/NodeServer';
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import moment from 'moment';
import swal from 'sweetalert';
import formatMoney from 'Function/NumberFormat';

const ModalNewCashFound = ({ isOpen, toggle }) => {
    const [newCashFound, setNewCashFound] = useState("")
    const currentCashFound = localStorage.getItem("lastCashFound") ? localStorage.getItem("lastCashFound") : 0

    const putNewCashFound = async () => {
        await axios.put(UrlNodeServer.invoicesDir.sub.cashFound, {
            cashFound: newCashFound,
            cashDate: moment(new Date()).format("YYYY-MM-DD")
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            if (res.data.status === 200) {
                swal("Fondo de caja asignado", "Puede continuar con el sistema", "success")
                toggle()
            } else {
                swal("Hubo un error", "Intentelo nuevamente. Si persiste llame a sistemas.", "error")
            }
        })
    }

    return (<>
        <Modal isOpen={isOpen} toggle={toggle} onSubmit={e => {
            e.preventDefault()
            putNewCashFound()
        }}>
            <Form>
                <ModalHeader>
                    Ingrese el nuevo fondo de caja a útilizar
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label>
                            Fondo actual:
                        </Label>
                        <Input value={"$ " + formatMoney(currentCashFound)} disabled />
                    </FormGroup>

                    <FormGroup>
                        <Label>
                            Nuevo fondo:
                        </Label>
                        <Input step={0.01} min={1} type="number" value={newCashFound} onChange={e => setNewCashFound(e.target.value)} required />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" type="submit">
                        Ingresar
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    </>)
}

export default ModalNewCashFound