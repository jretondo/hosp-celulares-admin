import formatMoney from 'Function/NumberFormat';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, FormGroup, Input, InputGroup, InputGroupAddon, Label } from 'reactstrap';
import CashWithdrawalsDetailsModal from './cashWithdrawalsDetails';

const TotalItemsVtas = ({
    id,
    totalId,
    totalImporte,
    colSize,
    cashWithdrawalDetails
}) => {
    const [totalStr, setTotalStr] = useState("")
    const [tituloStr, setTituloStr] = useState("")
    const [isOpenDetails, setIsOpenDetails] = useState(false)

    const format = useCallback(() => {
        switch (parseInt(totalId)) {
            case 0:
                setTituloStr("Total Efectivo")
                break;
            case 1:
                setTituloStr("Total Mercado Pago")
                break;
            case 2:
                setTituloStr("Total Débito")
                break;
            case 3:
                setTituloStr("Total Crédito")
                break;
            case 4:
                setTituloStr("Total Cuenta Corriente")
                break;
            case 5:
                setTituloStr("Total Transferencias")
                break;
            case 6:
                setTituloStr("Retiros en Efectivo")
                break;
            case 7:
                setTituloStr("Fondo de caja")
                break;
            case 8:
                setTituloStr("Neto de efectivo")
                break;
            default:
                setTituloStr("No hay totales para mostrar")
                break;
        }

        setTotalStr(formatMoney(totalImporte))
    }, [totalId, totalImporte])

    useEffect(() => {
        format()
    }, [format])

    return (<>
        <CashWithdrawalsDetailsModal
            isOpen={isOpenDetails}
            toggle={() => setIsOpenDetails(!isOpenDetails)}
            detailsArray={cashWithdrawalDetails ? cashWithdrawalDetails : []}
        />
        <Col md={colSize} key={id}>
            <FormGroup>
                <Label>{tituloStr}</Label>
                {
                    parseInt(totalId) === 6 ? <>
                        <InputGroup>
                            <Input style={totalImporte < 0 ? { backgroundColor: "red", color: "white" } : {}} type="text" value={"$ " + totalStr} disabled />
                            <InputGroupAddon addonType="append"><Button onClick={e => {
                                e.preventDefault()
                                setIsOpenDetails(true)
                            }} color="default">Ver detalle</Button></InputGroupAddon>
                        </InputGroup>
                    </> :
                        <Input style={totalImporte < 0 ? { backgroundColor: "red", color: "white" } : {}} type="text" value={"$ " + totalStr} disabled />
                }

            </FormGroup>
        </Col>
    </>
    )
}

export default TotalItemsVtas