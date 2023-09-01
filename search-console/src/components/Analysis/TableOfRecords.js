import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import FindKeywords from "./FindKeywords";



function TableOfRecords({ queryDetails, selectedPage, fetchDataClicked}) {
    const [isLoading, setIsLoading] = useState(true);
    const [mainTable, setMainTable] = useState(true);


    useEffect(() => {
        // Simulating data loading or any asynchronous operation
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        setIsLoading(true);

    }, [mainTable, fetchDataClicked]);


    const data = {
        columns: [
            {
                label: "Query",
                field: "query",
                sort: "asc",
                width: 150,
            },
            {
                label: "Clicks",
                field: "clicks",
                sort: "asc",
                width: 270,
            },
            {
                label: "Impressions",
                field: "impression",
                sort: "asc",
                width: 200,
            },
            {
                label: "CTR",
                field: "ctr",
                sort: "asc",
                width: 100,
            },
            {
                label: "Positions",
                field: "position",
                sort: "asc",
                width: 150,
            },
        ],

        rows: queryDetails?.map((row) => ({
            query: row.keys[0],
            clicks: row.clicks,
            impression: row.impressions,
            ctr: row.ctr.toFixed(1),
            position: row.position.toFixed(1),
        })),
    };


    console.log(queryDetails);

    return (
        <div style={{ position: "relative" }}>
            <div>Table of Records</div>

            {isLoading ? (
                <div
                    className="spinner-border"
                    role="status"
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                    }}
                >
                    <span className="sr-only">Loading...</span>
                </div>
            ) : (
                <>
                    {mainTable &&
                        <MDBDataTable striped bordered small data={data} />
                    }
                </>
            )}

            <FindKeywords selectedPage={selectedPage} queryDetails={queryDetails} setMainTable={setMainTable} mainTable={mainTable}/>
        </div>
    );
}

export default TableOfRecords;
