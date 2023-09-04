import React, { useState } from 'react'
import { scrapWebPage } from "../Service";
import { MDBDataTable } from 'mdbreact';
import { useNavigate } from 'react-router-dom';


function FindKeywords({ selectedPage, queryDetails, setMainTable, mainTable }) {

    //  const [scrappedData, setScrappedData] = useState({});
    const [data2, setData2] = useState({});
    const navigate = useNavigate();

    const mydata = {
        page: selectedPage
    }


    const isKeywordPresent = async (query, scrappedData) => {
        const keywordFound = await scrappedData?.toLowerCase().includes(query.toLowerCase());
        console.log(keywordFound);
        return keywordFound;
    }


    const fetchData = async () => {

        try {

            const response = await scrapWebPage(mydata);
            
            if (response.data.status == 'error') {
                navigate('/login');
            }

            const scrappedData = JSON.stringify(response.data);
            // setScrappedData(scrappedData);

            const updatedRows = await Promise.all(
                queryDetails
                    .filter((row) => {
                        const impressions = row.impressions;
                        const clicks = row.clicks;
                        return impressions > 500 && clicks < 10;
                    })
                    .map(async (row) => {
                        const isPresent = await isKeywordPresent(row.keys[0], scrappedData);
                        return {
                            query: row.keys[0],
                            clicks: row.clicks,
                            impression: <span style={{ color: 'darkyellow' }}> {row.impressions}</span>,
                            ctr: row.ctr.toFixed(1),
                            position: row.position.toFixed(1),
                            keyword: isPresent ? <span style={{ color: '#FA5858', fontWeight: 'bold' }}>Found</span> : <span style={{ color: 'green', fontWeight: 'bold' }}> Not Found </span>,
                        };
                    })
            );

            const updatedData2 = {
                columns: [
                    {
                        label: 'Query',
                        field: 'query',
                        sort: 'asc',
                        width: 150,
                    },
                    {
                        label: 'Clicks',
                        field: 'clicks',
                        sort: 'asc',
                        width: 270,
                    },
                    {
                        label: 'Impressions',
                        field: 'impression',
                        sort: 'asc',
                        width: 200,
                    },
                    {
                        label: 'CTR',
                        field: 'ctr',
                        sort: 'asc',
                        width: 100,
                    },
                    {
                        label: 'Positions',
                        field: 'position',
                        sort: 'asc',
                        width: 150,
                    },
                    {
                        label: 'Keyword Found',
                        field: 'keyword',
                        sort: 'asc',
                        width: 75,
                    },
                ],
                rows: updatedRows,
            };

            setData2(updatedData2);

        } catch (error) {
            console.error(error);
        }
    };

    const handleFindKeywords = () => {
        fetchData();
        setMainTable(false);
    };



    return (
        <div className='magic-keyword-set'>
            <button className="find-keywords-btn-kw" onClick={handleFindKeywords}>Find Magic Keywords</button>
           { data2 &&
                < MDBDataTable bordered small data={data2} />
           } 
        </div>
    )
}

export default FindKeywords