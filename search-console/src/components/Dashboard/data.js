import React, { useEffect, useState } from 'react'
import { getDataByPage } from './Service'

function ByPageData() {

    const [data, setData] = useState({

        "startDate": "2023-06-01",
        "endDate": "2023-06-10",
        "dimensions": [
            "QUERY",
            "PAGE"
        ],
        "dimensionFilterGroups": [
            {
                "filters": [
                    {
                        "dimension": "PAGE",
                        "operator": "CONTAINS",
                        "expression": "/palindrome-number-program-flowchart"
                    }
                ]
            }
        ],
        "rowLimit": 25000,
        "type": "WEB"
    })

    console.log(data);

    const fetchData = async () => {

        const response = await getDataByPage(data);
        console.log(response);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            Hi
        </>
    )
}

export default ByPageData