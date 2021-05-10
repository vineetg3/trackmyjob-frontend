import React, { useState, useEffect } from 'react';
import NavigationBarAuth from '../components/NavigationBarAuth';
import CustomAddCardModal from '../components/customAddCardModal';
import { Dropdown, Alert } from 'react-bootstrap';
import '../components/sidebar.css';
import CustomCard from '../components/CustomCard';
import { useDispatch, useSelector } from 'react-redux';
import { getQueriedJobs } from '../store/entities/userjobs.js'
import {DropdownItems,StatusItems} from '../uiElements.js';




const hrStyle = { marginTop: '.3rem', marginBottom: '.3rem' }

const DashboardPage = () => {
    const [filterDropdownItem, setFilterDropDownItem] = useState(DropdownItems[0]);
    const [sortingOrder, setSortingOrder] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [addCardModal, setAddCardModal] = useState(false);
    const [isQueryBar, setIsQueryBar] = useState(false);
    const [rightPaneCss, setRightPaneCss] = useState("col px-4 mt-5 pt-4");
    const [checkedStatus, setCheckedStatus] = useState(StatusItems);
    const [width, setDimensions] = useState(window.innerWidth);

    const userJobsList = useSelector(state => state.entities.userjobs.list);
    const isLoading = useSelector(state => state.entities.userjobs.loading);
    const errorState = useSelector(state => state.entities.userjobs.error);


    const dispatch = useDispatch();

    let queryObject = {
        searchTerm: "",
        sortingEntity: "",
        sortingOrder: "",
        entitiesVisible: null
    }

    useEffect(() => {
        var lst = []
        for(let i=0;i<checkedStatus.length;i++){
                lst.push(checkedStatus[i].status)
        }
        queryObject.searchTerm = "";
        queryObject.sortingEntity = "Last Modified";
        queryObject.sortingOrder = "Des";
        queryObject.entitiesVisible = lst;
        dispatch(getQueriedJobs(queryObject))
    }, []);

    useEffect(() => {
        function handleResize() {
          setDimensions(
            window.innerWidth
          )
        }
        window.addEventListener('resize', handleResize)
      })
    


    function handleFilterDropdown(e) {
        // e -> index of clicked dropdown
        setFilterDropDownItem(DropdownItems[e]);
    }

    function handleSortingOrder(e) {
        let order = e.target.value;
        setSortingOrder(order);
    }


    function handleCheckedStatus(e) {
        //if all status are false, display everything
        checkedStatus[e.target.value].checked = !checkedStatus[e.target.value].checked;
    }

    
    function handleQueryButton(e) {
        let lst = [];
        for(let i=0;i<checkedStatus.length;i++){
            if(checkedStatus[i].checked){
                lst.push(checkedStatus[i].status)
            }
        }
        if (lst.length === 0) {
            for(let i=0;i<checkedStatus.length;i++){
                lst.push(checkedStatus[i].status)
            }
        }
        queryObject.searchTerm = searchValue;
        queryObject.sortingEntity = filterDropdownItem;
        queryObject.sortingOrder = sortingOrder;
        queryObject.entitiesVisible = lst;
        dispatch(getQueriedJobs(queryObject));
        if(width<1000){
            toggleQueryBar(null);
        }
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
    function handleAddButton(e) {
        //add button callback used at addcard modal at close and save changed
        setAddCardModal(!addCardModal);
        if(width<1000){
            toggleQueryBar(null);
        }
    }
    function toggleQueryBar(e){
        //callback when clicked on toggle query button
        setIsQueryBar(!isQueryBar);
        if(!isQueryBar){
            setRightPaneCss("col-sm-9 ml-sm-auto .d-block col-lg-10 px-4 mt-5 pt-4");
        }else{
            setRightPaneCss("col px-4 mt-5 pt-4");
        }
    } 
    function toggleAddCardModal(e){
        //called when clicked on add card in query menu
        setAddCardModal(!addCardModal);
    }

    return (
        <div>
            <NavigationBarAuth page="dashboard" toggleQueryBar={toggleQueryBar}/>

            <div class="container-fluid">
                <div class="row">
                    {
                        isQueryBar &&
                        <nav class="col-sm-3 col-lg-2  .d-sm-none .d-md-block bg-light sidebar mt-4 pt-4 px-1 position-fixed" style={{overflowY:"scroll"}}>
                        <div class="sidebar-sticky mt-4"  >
                            <ul class="nav flex-column">
                                <li>
                                    <div class=" mt-2 mx-2">
                                        <button class="btn btn-primary btn-block " type="button" onClick={toggleAddCardModal}>+ Add Card</button>
                                        {
                                            addCardModal &&
                                            <CustomAddCardModal addCardModal={addCardModal} onClose={handleAddButton} />
                                        }
                                    </div>
                                    <hr style={hrStyle}></hr>
                                </li>
                                <li>
                                    <div class=" mb-1 mx-2">

                                        <button class="btn btn-outline-success btn-block " type="button" onClick={handleQueryButton}>Query</button>
                                        <hr style={hrStyle}></hr>

                                    </div>
                                </li>
                                <li>
                                    <div class=" mb-2 mx-2">
                                        <input class="form-control my-2 " type="search"
                                            placeholder="Company,Salary,etc.." id="form1"
                                            value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
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
                                        <div class="form-check" >
                                            <label class="form-check-label">
                                                <input
                                                    class="form-check-input"
                                                    type="radio"
                                                    name="sortRadios"
                                                    value="Asc"
                                                    checked={sortingOrder === "Asc"}
                                                    onChange={handleSortingOrder}
                                                />
                                                Ascending
                                            </label>
                                            <br></br>
                                            <label class="form-check-label" >
                                                <input
                                                    class="form-check-input"
                                                    type="radio"
                                                    name="sortRadios"
                                                    value="Des"
                                                    checked={sortingOrder === "Des"}
                                                    onChange={handleSortingOrder}
                                                />
                                                Descending
                                            </label>
                                        </div>
                                        <hr style={hrStyle}></hr>
                                    </div>
                                </li>
                                <li>
                                    <div class="mb-1 mx-2">
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
                    }
                    <div class={rightPaneCss}>
                        {
                            !isLoading && !errorState.isError &&
                            <div className="card p-3 px-4">
                                <h3>Current Count:<span class="badge badge-info mx-2">{userJobsList.length}</span></h3>
                            </div>
                        }
                        {
                            !isLoading && !errorState.isError &&
                            userJobsList.map(
                                (job) => {
                                    job = JSON.parse(JSON.stringify(job));
                                    replaceNull(job);
                                    var statusTheme = StatusItems.find((obj) => obj.status === job.status);
                                    statusTheme = statusTheme.theme;
                                    return <CustomCard statusTheme={statusTheme} job={job} />
                                }
                            )
                            
                        }
                        {
                            isLoading && !errorState.isError &&
                            <div class="d-flex justify-content-center p-4 my-5" >
                                <strong>Loading...</strong>
                                <div class="spinner-grow ml-auto" role="status" aria-hidden="true"></div>
                            </div>
                        }
                        {
                            errorState.isError && !isLoading &&
                            <div>
                                <Alert variant='danger'>
                                    Error: {errorState.statusCode} {errorState.message}
                                </Alert>
                                <button type="button" class="btn btn-primary mx-1" onClick={handleQueryButton}>Try Again</button>

                            </div>
                        }
                    </div>
                </div>


            </div>
        </div>

    )
};

export default DashboardPage;