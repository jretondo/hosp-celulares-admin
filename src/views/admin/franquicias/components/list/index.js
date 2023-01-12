import UrlNodeServer from '../../../../../api/NodeServer';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Row, Spinner } from 'reactstrap';
import FranchiseFilter from './filters';
import FranchisesFooterList from './footer';
import FranchisesTable from './table';

const FranchiseList = ({ setMsgStrong, setMsgGralAlert, setSuccessAlert, setAlertar, alertar, triggerList, searchTrigger, setNewForm, setIdFranchise }) => {
    const [franchisesArray, setFranchisesArray] = useState([])
    const [searchText, setSearchText] = useState("")
    const [loading, setLoading] = useState(false)

    const GetFranchises = async () => {
        setLoading(true)
        await axios.get(UrlNodeServer.franchisesDir.franchises, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            },
            params: { query: searchText }
        }).then(res => {
            const response = res.data
            if (response.status === 200) {
                setFranchisesArray(response.body.data)
            } else {
                setFranchisesArray([])
            }
        }).catch(error => {
            setMsgStrong("hubo un error! ")
            setMsgGralAlert("Error: " + error.msg)
            setSuccessAlert(false)
            setAlertar(!alertar)
        }).finally(() => { setLoading(false) })
    }

    useEffect(() => {
        GetFranchises()
    }, [searchTrigger])

    return (
        <Card style={{ marginTop: "30px" }}>
            <CardBody>
                <FranchiseFilter
                    searchText={searchText}
                    setSearchText={setSearchText}
                    trigger={() => triggerList()}
                />
                {
                    loading ?
                        <Row>
                            <Col style={{ textAlign: "center" }}>
                                <Spinner color="primary" style={{ width: "200px", height: "200px" }} />
                            </Col>
                        </Row> :
                        <FranchisesTable
                            franchisesArray={franchisesArray}
                            setNewForm={setNewForm}
                            setIdFranchise={setIdFranchise}
                            trigger={() => triggerList()}
                        />
                }
                <FranchisesFooterList
                    franchisesArray={franchisesArray}
                />
            </CardBody>
        </Card>
    )
}

export default FranchiseList