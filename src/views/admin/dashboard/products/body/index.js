import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import Chart from 'chart.js';
import ListadoTable from 'components/subComponents/Listados/ListadoTable2';
import formatMoney from 'Function/NumberFormat';

const ProductReportBody = ({
    dataProducts
}) => {
    const [labels, setLabels] = useState([])
    const [cantData, setCantData] = useState([])
    const [totalVentas, setTotalVentas] = useState([])
    const [totalCosto, setTotalCosto] = useState([])
    const [totalGanancia, setTotalGanancia] = useState([])
    const [cantDataRow, setCantDataRow] = useState(<td></td>)
    const [totalVentasRow, setTotalVentasRow] = useState(<td></td>)
    const [totalCostoRow, setTotalCostoRow] = useState(<td></td>)
    const [finalList, setFinalList] = useState(<><tr></tr><tr></tr></>)
    const [totalGananciaRow, setTotalGananciaRow] = useState(<td></td>)

    useEffect(() => {
        let costos = []
        let ventas = []
        let cantidad = []
        let fechas = []
        let ganancia = []

        if (dataProducts.length > 0) {
            dataProducts.map((item, key) => {
                costos.push(item.totalCosto)
                ventas.push(item.totalVenta)
                cantidad.push(item.cantidad)
                ganancia.push(item.totalGanancia)
                fechas.push(moment(item.fecha).format("DD/MM/YYYY"))

                if (key === dataProducts.length - 1) {
                    setLabels(fechas)
                    setCantData(cantidad)
                    setTotalVentas(ventas)
                    setTotalCosto(costos)
                    setTotalGanancia(ganancia)
                }
            })
        }
    }, [dataProducts])

    useEffect(() => {
        if (totalCosto.length > 0 && totalVentas.length > 0 && labels.length > 0) {
            generateGrafic()
            combine()
        }
    }, [labels, totalCosto, totalVentas])

    useEffect(() => {
        if (cantData.length > 0) {
            generateGrafic2()
            combine()
        }
    }, [cantData])

    const generateGrafic = () => {
        let canvasElement = document.createElement("canvas")
        canvasElement.id = "myChart"
        document.getElementById("myChart").remove()
        document.getElementById("container-canvas").appendChild(canvasElement)
        const ctx = document.getElementById('myChart');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Ventas $',
                    data: totalVentas,
                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Costos $',
                    data: totalCosto,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    const generateGrafic2 = () => {
        let canvasElement = document.createElement("canvas")
        canvasElement.id = "myChart2"
        document.getElementById("myChart2").remove()
        document.getElementById("container-canvas2").appendChild(canvasElement)
        const ctx = document.getElementById('myChart2');
        const myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: 'Cantidad',
                    data: cantData,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 4,
                    fill: false
                }
                ]
            }
        });
    }

    const combine = () => {
        setCantDataRow(
            cantData.map((item, key) => {
                return (
                    <td style={{ textAlign: "center" }} key={key}>
                        {item}
                    </td>
                )
            })
        )

        setTotalVentasRow(
            totalVentas.map((item, key) => {
                return (
                    <td style={{ textAlign: "center" }} key={key}>
                        ${" "}{formatMoney(item)}
                    </td>
                )
            })
        )

        setTotalCostoRow(
            totalCosto.map((item, key) => {
                return (
                    <td style={{ textAlign: "center" }} key={key}>
                        ${" "}{formatMoney(item)}
                    </td>
                )
            })
        )

        setTotalGananciaRow(
            totalGanancia.map((item, key) => {
                return (
                    <td style={{ textAlign: "center" }} key={key}>
                        ${" "}{formatMoney(item)}
                    </td>
                )
            })
        )
    }

    useEffect(() => {
        setFinalList(<>
            <tr className="table-light">
                <td>Cantidad</td>
                {cantDataRow}
            </tr>
            <tr className="table-light">
                <td>Ventas</td>
                {totalVentasRow}
            </tr>
            <tr className="table-light">
                <td>Costos</td>
                {totalCostoRow}
            </tr>
            <tr className="table-dark" style={{ fontWeight: "bold" }}>
                <td style={{ fontSize: "18px" }}>Ganancia</td>
                {totalGananciaRow}
            </tr>
        </>)
    }, [totalCostoRow, totalVentasRow, cantDataRow])

    return (
        <>
            <Row style={{ marginTop: "35px" }}>
                <Col md="12" id="container-canvas">
                    <canvas id="myChart" style={{ width: "100%" }} ></canvas>
                </Col>
            </Row>
            <Row style={{ marginTop: "35px" }}>
                <Col md="12" id="container-canvas2">
                    <canvas id="myChart2" style={{ width: "100%" }} ></canvas>
                </Col>
            </Row>
            <Row style={{ marginTop: "35px" }}>
                <ListadoTable
                    titulos={["Fecha", ...labels]}>
                    {finalList}
                </ListadoTable>
            </Row>
        </>

    )
}

export default ProductReportBody