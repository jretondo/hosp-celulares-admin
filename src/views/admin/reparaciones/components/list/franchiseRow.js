import React from 'react';
import { Button } from 'reactstrap';

const FranchiseRow = ({ id, item, setFranchiseId, setFranchiseName, toggle }) => {
    return (
        <tr key={id}>
            <td style={{ textAlign: "center" }}>
                {item.direccion}
            </td>
            <td style={{ textAlign: "center" }}>
                {item.raz_soc}
            </td>
            <td style={{ textAlign: "right" }}>
                <Button color="success"
                    onClick={e => {
                        e.preventDefault()
                        setFranchiseId(item.id)
                        setFranchiseName(`${item.direccion} (${item.raz_soc})`)
                        toggle()
                    }}
                >
                    Seleccionar
                </Button>
            </td>
        </tr>
    )
}

export default FranchiseRow