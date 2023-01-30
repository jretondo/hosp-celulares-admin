import React, { useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import PartsBodyList from './components/body';
import PartsFooterList from './components/footer';
import PartsHeaderList from './components/header';

const AccessoriesPartsList = ({
    trigger,
    refresh,
    setNewForm,
    setDataPart
}) => {
    const [partsArray, setPartsArray] = useState([])

    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const [dataList, setDataList] = useState(false)
    const [loading, setLoading] = useState(false)



    return (<>
        <Card>
            <CardBody>
                <PartsHeaderList
                    setPartsArray={setPartsArray}
                    page={page}
                    refresh={refresh}
                    setDataList={setDataList}
                    setLastPage={setLastPage}
                    setLoading={setLoading}
                    trigger={trigger}
                />
                <PartsBodyList
                    partsArray={partsArray}
                    trigger={trigger}
                    loading={loading}
                    setNewForm={setNewForm}
                    setDataPart={setDataPart}
                />
                <PartsFooterList
                    setPage={setPage}
                    page={page}
                    lastPage={lastPage}
                    dataList={dataList}
                    setLastPage={setLastPage}
                    trigger={trigger}
                />
            </CardBody>
        </Card>
    </>)
}

export default AccessoriesPartsList