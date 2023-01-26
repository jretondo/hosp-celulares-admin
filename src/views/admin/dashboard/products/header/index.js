import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Form, FormGroup, Input, Label, Row, Spinner } from 'reactstrap';
import Button from 'reactstrap/lib/Button';
import PtosVtas from './ptosVta'
import { BsFileEarmarkPdfFill, BsCardList } from "react-icons/bs";
import axios from 'axios';
import UrlNodeServer from '../../../../../api/NodeServer';
import swal from 'sweetalert';
import FileSaver from 'file-saver';
import ProductosFiltro from 'views/admin/stock/components/listaStock/components/header/productos';

const HeaderListaCaja = ({
    setListaCaja,
    setLoading,
    actualizar,
    setDataProducts
}) => {
    const hoy1 = (moment(new Date()).format("YYYY-MM-DD"))
    const hoy2 = (moment(new Date()).format("YYYY-MM-DD"))
    const [ptosVta, setPtoVta] = useState({ id: 0 })
    const [ptoVtaList, setPtoVtaList] = useState(<option>No hay puntos de venta relacionados</option>)
    const [desde, setDesde] = useState(hoy1)
    const [hasta, setHasta] = useState(hoy2)
    const [loadingPDF, setLoadingPDF] = useState(false)
    const [prodId, setProdId] = useState(false)

    const getReport = async () => {
        setLoading(true)
        const query = `?fromDate=${moment(desde).format("YYYY-MM-DD")}&toDate=${moment(hasta).format("YYYY-MM-DD")}&pvId=${ptosVta.id}&prodId=${prodId}`
        await axios.get(UrlNodeServer.reportsDir.sub.products + query, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        })
            .then(res => {
                setLoading(false)
                const status = res.data.status
                if (status === 200) {
                    setDataProducts(res.data.body.data)
                } else {
                    setDataProducts([])
                }
            })
            .catch(() => {
                setLoading(false)
                setDataProducts([])
            })
    }

    const printPDF = async () => {
        setLoadingPDF(true)
        const query = `?fromDate=${moment(desde).format("YYYY-MM-DD")}&toDate=${moment(hasta).format("YYYY-MM-DD")}&pvId=${ptosVta.id}&prodId=${prodId}`
        await axios.get(UrlNodeServer.invoicesDir.sub.cajaListPDF + query, {
            responseType: 'arraybuffer',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
                Accept: 'application/pdf',
            }
        })
            .then(res => {
                let headerLine = res.headers['content-disposition'];
                const largo = parseInt(headerLine.length)
                let filename = headerLine.substring(21, largo);
                var blob = new Blob([res.data], { type: "application/pdf" });
                FileSaver.saveAs(blob, filename);
                setLoadingPDF(false)
                swal("Listado de Caja!", "El listado de caja ha sido generado con éxito!", "success");
            })
            .catch((error) => {
                setLoadingPDF(false)
                setListaCaja([])
                swal("Listado de Caja!", "Hubo un error al querer listar la caja!", "error");
            })
    }

    useEffect(() => {
        getReport()
        // eslint-disable-next-line
    }, [actualizar])

    return (
        <Form onSubmit={e => {
            e.preventDefault()
            getReport()
        }}>
            <Row>
                <Col md="8" >
                    <Row>
                        <PtosVtas
                            setPtoVta={setPtoVta}
                            setPtoVtaList={setPtoVtaList}
                            ptoVtaList={ptoVtaList}
                            ptoVta={ptosVta}
                            colSize={12}
                        />

                    </Row>
                    <Row>
                        <ProductosFiltro
                            colSize={6}
                            setProdId={setProdId}
                        />
                        <Col md={3}>
                            <FormGroup>
                                <Label for="desdeTxtCaja">Desde</Label>
                                <Input
                                    type="date"
                                    id="desdeTxtCaja"
                                    value={desde}
                                    onChange={e => setDesde(e.target.value)}
                                    max={hasta}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <Label for="desdeTxtCaja">Hasta</Label>
                            <Input
                                type="date"
                                id="desdeTxtCaja"
                                value={hasta}
                                onChange={e => setHasta(e.target.value)}
                                min={desde}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col md="4" style={{ textAlign: "center" }} >

                    <Col md="12" style={{ textAlign: "center", margin: "10px" }} >
                        <Button
                            color="primary"
                            style={{ height: "100%", width: "60%", fontSize: "14px", minWidth: "125px", maxWidth: "170px" }}
                            type="submit"
                        >
                            <Row>
                                <span style={{ textAlign: "center", width: "100%" }}> Listar Ventas</span>
                            </Row>
                            <Row >
                                <span style={{ textAlign: "center", width: "100%", fontSize: "25px" }}> <BsCardList /></span>
                            </Row>
                        </Button>
                    </Col>

                    <Col md="12" style={{ textAlign: "center", margin: "10px" }} >
                        {
                            loadingPDF ?
                                <div style={{ textAlign: "center" }}  >
                                    <Spinner type="border" color="red" style={{ width: "5rem", height: "5rem" }} /> </div>
                                :
                                <Button
                                    color="danger"
                                    style={{ height: "100%", width: "60%", fontSize: "14px", minWidth: "125px", maxWidth: "170px" }}
                                    onClick={e => {
                                        e.preventDefault()
                                        printPDF()
                                    }}
                                >
                                    <Row>
                                        <span style={{ textAlign: "center", width: "100%" }}> Imprimir PDF</span>
                                    </Row>
                                    <Row >
                                        <span style={{ textAlign: "center", width: "100%", fontSize: "25px" }}> <BsFileEarmarkPdfFill /></span>
                                    </Row>
                                </Button>
                        }

                    </Col>
                </Col>
            </Row>
        </Form>
    )
}

export default HeaderListaCaja
