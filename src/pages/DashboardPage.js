import React, { useState, useEffect } from 'react';
import NavigationBarAuth from '../components/NavigationBarAuth';
import { Dropdown } from 'react-bootstrap';
import '../components/sidebar.css';
import CustomCard from '../components/CustomCard';
import { useDispatch, useSelector } from 'react-redux';
import { getQueriedJobs } from '../store/entities/userjobs.js'


const DropdownItems = ["Company", "Salary", "Last Application-Date", "Start-Date", "End-Date"];
const StatusItems = [{ status: "Saved", checked: false, theme: "bg-secondary text-white" },
{ status: "Applied", checked: false, theme: "bg-dark text-white" },
{ status: "Interviewing", checked: false, theme: "bg-info text-white" },
{ status: "Hired", checked: false, theme: "bg-success text-white" },
{ status: "Rejected", checked: false, theme: "bg-danger text-white" },
{ status: "Archived", checked: false, theme: "bg-light" }];

const hrStyle = { marginTop: '.5rem', marginBottom: '.5rem' }

const DashboardPage = () => {
    const [filterDropdownItem, setFilterDropDownItem] = useState(DropdownItems[0]);
    const [sortingOrder, setSortingOrder] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [checkedStatus, setCheckedStatus] = useState(StatusItems);
    const userJobsList = useSelector(state => state.entities.userjobs.list);
    const dispatch = useDispatch();

    useEffect(() => {
        var lst = []
        for (let i in StatusItems) {
            lst.push(i.status)
        }
        var defaultQuery = {
            search: "",
            sort: DropdownItems[0],
            order: "asc",
            showOnly: lst
        }
        dispatch(getQueriedJobs(defaultQuery))

    }, [])


    function handleFilterDropdown(e) {

        setFilterDropDownItem(DropdownItems[e]);
        console.log(DropdownItems[e]);
    }

    function handleSortingOrder(e) {
        setSortingOrder(e.target.value);
        console.log(sortingOrder);
    }
    function handleSearchValue(e) {
        console.log(searchValue);
    }

    function handleCheckedStatus(e) {
        //if all status are false, display everything
        checkedStatus[e.target.value].checked = !checkedStatus[e.target.value].checked;
        console.log(checkedStatus);
        //setCheckedStatus(checkedStatus);
    }

    function handleAddButton(e) {
        console.log(e.target)
    }

    function replaceNull(obj) {
        Object.keys(obj).forEach(
            (key) => {
                if (obj[key] === null) {
                    obj[key] = "NA";
                }
            }
        )
    }





    return (
        <div>
            <NavigationBarAuth page="dashboard" />

            <div class="container-fluid">
                <div class="row">
                    <nav class="col-sm-3 col-lg-2  .d-sm-none .d-md-block bg-light sidebar mt-4 pt-4 px-1 position-fixed">
                        <div class="sidebar-sticky" >
                            <ul class="nav flex-column">
                                <li>
                                    <div class=" mt-2 mx-2">
                                        <button class="btn btn-primary btn-block " type="button" onClick={handleAddButton}>+ Add Card</button>
                                    </div>
                                    <hr style={hrStyle}></hr>
                                </li>
                                <li>
                                    <div class=" mb-3 mx-2">
                                        <input class="form-control my-2 " type="search"
                                            placeholder="Company,Salary,etc.." id="form1"
                                            value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                                        <button class="btn btn-outline-success btn-block" type="button" onClick={handleSearchValue}>Search</button>
                                    </div>
                                    <hr style={hrStyle}></hr>
                                </li>
                                <li>
                                    <div class="mb-2 mx-2 ">
                                        <h6 class="font-weight-bold">Sort:</h6>
                                        <Dropdown onSelect={handleFilterDropdown} >
                                            <Dropdown.Toggle variant="info" id="dropdown-basic" style={{ width: "100%" }}>
                                                {filterDropdownItem}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                {DropdownItems.map((item, idx) => {
                                                    return <Dropdown.Item as="button" eventKey={idx}>{item}</Dropdown.Item>
                                                })}

                                            </Dropdown.Menu>
                                        </Dropdown>

                                    </div>
                                </li>
                                <li>
                                    <div class="mb-2 mx-2">
                                        <h6 class="mb-2 font-weight-bold ">By:</h6>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="sortRadios" id="exampleRadios2" value="Asc" onClick={handleSortingOrder} />
                                            <label class="form-check-label" for="exampleRadios2">
                                                Ascending
                                            </label>
                                            <br></br>
                                            <input class="form-check-input" type="radio" name="sortRadios" id="exampleRadios2" value="Des" onClick={handleSortingOrder} />
                                            <label class="form-check-label" for="exampleRadios2">
                                                Descending
                                            </label>
                                        </div>
                                        <hr style={hrStyle}></hr>
                                    </div>
                                </li>
                                <li>
                                    <div class="mb-2 mx-2">
                                        <h6 class="font-weight-bold">Show only:</h6>
                                        <div class="form-check">

                                            {checkedStatus.map((item, idx) => {

                                                return (<div><input class="form-check-input" type="checkbox" value={idx} id="flexCheckDefault" onClick={handleCheckedStatus} />
                                                    <label class="form-check-label" for="flexCheckDefault">
                                                        {item.status}
                                                    </label>
                                                    <br></br></div>);
                                            })}
                                        </div>
                                    </div>
                                    <hr style={hrStyle}></hr>
                                </li>

                            </ul>
                        </div>
                    </nav>
                    <div class="col-sm-9 ml-sm-auto .d-block col-lg-10 px-4 mt-5 pt-4">
                        <h2>
                            {
                                userJobsList.map(
                                    (job) => {
                                        job = JSON.parse(JSON.stringify(job));
                                        replaceNull(job);
                                        var statusTheme = StatusItems.find((obj) => obj.status === job.status);
                                        statusTheme = statusTheme.theme;
                                        console.log(statusTheme) 
                                       return <CustomCard statusTheme={statusTheme} job={job} />
                                    }
                                )


                            }
                            {
                                // map each customcard to an element in list as ...lst[0],StatusItems
                            }

                        </h2>
                    </div>
                </div>


            </div>
        </div>

    )
};

export default DashboardPage;