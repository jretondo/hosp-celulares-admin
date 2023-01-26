import React, { useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import ProductReportBody from './body';
import HeaderListaCaja from './header';

const ProductsReports = () => {
    const [pagina, setPagina] = useState(1)
    const [loading, setLoading] = useState(false)
    const [actualizar, setActualizar] = useState(false)
    const [dataProducts, setDataProducts] = useState([])

    return (
        <Card style={{ marginTop: "30px" }}>
            <CardBody>
                <HeaderListaCaja
                    pagina={pagina}
                    setLoading={setLoading}
                    actualizar={actualizar}
                    setDataProducts={setDataProducts}
                />
                <ProductReportBody
                    dataProducts={dataProducts}
                />
            </CardBody>
        </Card>
    )
}

export default ProductsReports