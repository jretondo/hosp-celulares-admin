import React from 'react';
import { Button } from 'reactstrap';

const FranchiseRow = ({ id, item, setFranchiseId, setFranchiseName, toggle }) => {
    return (
        <tr key={id}>
            <td>
                {item.name}
            </td>
            <td style={{ textAlign: "right" }}>
                <Button color="success"
                    onClick={e => {
                        e.preventDefault()
                        setFranchiseId(item.id)
                        setFranchiseName(item.name)
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