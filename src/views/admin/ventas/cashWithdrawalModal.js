import UrlNodeServer from '../../../api/NodeServer';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import swal from 'sweetalert';
import PtosVtas from '../repuestos/components/form/ptosVta';

const CashWithdrawalModal = ({ isOpen, toggle }) => {
    const [amount, setAmount] = useState("")
    const [ptoVta, setPtoVta] = useState({ id: false })

    const CashWithdrawalRegister = async () => {
        await axios.post(UrlNodeServer.invoicesDir.sub.cashWithdrawal, {
            pvId: ptoVta.id,
            amount: amount
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            if (res.data.status === 201) {
                swal("Registrado con éxito!", "El retiro de efectivo se registró con éxito!", "success")
                toggle()
            } else {
                swal("Hubo un problema", "Intentelo nuevamente. Si persiste llame a sistemas.", "error")
            }
        }).catch(() => {
            swal("Hubo un problema", "Intentelo nuevamente. Si persiste llame a sistemas.", "error")
        })
    }

    useEffect(() => {
        isOpen && setAmount("")
    }, [isOpen])

    return (<>
        <Modal isOpen={isOpen} toggle={toggle} >
            <Form onSubmit={e => {
                e.preventDefault()
                CashWithdrawalRegister()
            }}>
                <ModalHeader>
                    Retiro de Efectivo
                </ModalHeader>
                <PtosVtas
                    setPtoVta={setPtoVta}
                    ptoVta={ptoVta}
                    colSize={12}
                />
                <ModalBody>
                    <FormGroup>
                        <Label>
                            Monto del retiro:
                        </Label>
                        <Input step={0.01} min={1} type="number" value={amount} onChange={e => setAmount(e.target.value)} required />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={e => {
                        e.preventDefault()
                        toggle()
                    }}>
                        Cancelar
                    </Button>
                    <Button color="success" type="submit" >
                        Registrar
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    </>)
}

export default CashWithdrawalModal