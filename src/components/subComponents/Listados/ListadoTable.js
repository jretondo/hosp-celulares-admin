import React from 'react'
import {
    Table
} from "reactstrap"

const ListadoTable = ({ listado, titulos }) => {

    return (
        <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
                <tr>
                    {
                        titulos.map((titulo, key) => {
                            return (
                                <th key={key} scope="col" style={{ textAlign: "center" }}>{titulo}</th>
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody style={{ minHeight: "500px" }}  >
                {
                    listado
                }
            </tbody>
        </Table>
    )
}

export default ListadoTable