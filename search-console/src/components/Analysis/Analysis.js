import React, { useEffect, useState } from "react";
import { getAllPages, getDataByPage, getListofSites } from "../Service";
import TableOfRecords from "./TableOfRecords";
import DatePicker from "react-datepicker";
import "./Analysis.css";

function Analysis({ setComponent }) {
    const [pagesRequestBody, setPagesRequestBody] = useState({
        startDate: "2020-05-05",
        endDate: "2023-06-06",
        dimensions: ["PAGE"],
        rowLimit: 25000,
    });

    const [pages, setPages] = useState([]);
    const [selectedPage, setSelectedPage] = useState("");
    const [fetchDataClicked, setFetchDataClicked] = useState(false);
    const [sites, setSites] = useState([]);
    const [selectedSite, setSelectedSite] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [dataReq, setDataReq] = useState({
        startDate: "2020-06-06",
        endDate: "2023-06-06",
        dimensions: ["QUERY", "PAGE"],
        dimensionFilterGroups: [
            {
                filters: [
                    {
                        dimension: "PAGE",
                        operator: "CONTAINS",
                        expression: selectedPage,
                    },
                ],
            },
        ],
        rowLimit: 10000,
        type: "WEB",
    });

    const [queryDetails, setQueryDetails] = useState([]);

    useEffect(() => {
        // Update the expression value when selectedPage changes
        setDataReq((prevDataReq) => ({
            ...prevDataReq,
            startDate: startDate,
            endDate: endDate,
            dimensionFilterGroups: [
                {
                    filters: [
                        {
                            dimension: "PAGE",
                            operator: "CONTAINS",
                            expression: selectedPage,
                        },
                    ],
                },
            ],
        }));

    }, [selectedPage, startDate, endDate, fetchDataClicked]);

    const getAllPagesFunc = async () => {
        const { data } = await getAllPages(pagesRequestBody, selectedSite);
        const rows = data.rows;
        const pageUrls = rows.map((row) => row.keys[0]);
        setPages(pageUrls);
    };

    const handlePageChange = (event) => {
        setSelectedPage(event.target.value);
        setFetchDataClicked(false)
    };

    const handleSiteChange = (event) => {
        setSelectedSite(encodeURIComponent(event.target.value));
        
    };

    console.log(pages.length);

    const fetchData = async () => {
        const { data } = await getDataByPage(dataReq, selectedSite);
        const rows = data.rows;
        const queries = rows?.map((row) => row);
        setQueryDetails(queries);
        setFetchDataClicked(true);
    };

    console.log(selectedPage);
    console.log(selectedSite);

    //fetch site urls

    const fetchSites = async () => {
        const { data } = await getListofSites();
        console.log(data.siteEntry);
        setSites(data.siteEntry);
    };

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            fetchSites();
        } else {
            setComponent("authorize");
        }
    }, []);

    


    return (
        <div className="inner-component">
            <h1>Select Site URL</h1>

            <div className="custom-selectt">
                <select onChange={handleSiteChange}>
                    <option value="Select a site URL">
                        Select Site URL
                    </option>

                    {sites.map((site, index) => (
                        <option key={index} value={site.siteUrl}>
                            {site.siteUrl}
                        </option>
                    ))}
                </select>
            </div>


            {selectedSite &&
                <>
                    <h1>Select Date Range</h1>

                    <div className="datepicker-pos">
                        <h6>Start Date</h6>
                        <DatePicker
                            className="datepicker-lol"
                            value={startDate}
                            onChange={(date) => setStartDate(date.toISOString().slice(0, 10))}
                        />

                        <h6>End Date</h6>
                        <DatePicker
                            className="datepicker-lol"
                            value={endDate}
                            onChange={(date) => setEndDate(date.toISOString().slice(0, 10))}
                        />
                    </div>

                    <h1>Select Page</h1>

                    <div className="select-page-css">
                        <div className="custom-selectt">
                            <select
                                value={selectedPage}
                                onChange={handlePageChange}
                                onClick={getAllPagesFunc}
                            >
                                <option value="" disabled>
                                    Select a Page
                                </option>

                                {pages?.map((page, index) => (
                                    <option key={index} value={page}>
                                        {page}
                                    </option>
                                ))}
                                </select>
                            </div>

                            <button className="authorize-btn" onClick={fetchData}>
                                Fetch Data
                            </button>


                         <div className="youselected">
                            <div>
                                {selectedPage && (
                                    <p>
                                        You selected:{" "}
                                        <a href={selectedPage} target="_blank">
                                            {selectedPage}
                                        </a>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>


                </>
            }

            <div>
                {fetchDataClicked && <TableOfRecords queryDetails={queryDetails} selectedPage={selectedPage} fetchDataClicked={fetchDataClicked}/>}
            </div>
        </div>
    );
}

export default Analysis;
