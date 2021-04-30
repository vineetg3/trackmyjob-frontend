import React, { useState } from 'react';
import NavigationBarAuth from '../components/NavigationBarAuth';
import { Dropdown } from 'react-bootstrap';
import '../components/sidebar.css';




const DropdownItems = ["Company", "Salary", "Last Application-Date", "Start-Date", "End-Date"];
const StatusItems = [{ status: "Saved", checked: false },
{ status: "Applied", checked: false },
{ status: "Interviewing", checked: false },
{ status: "Hired", checked: false },
{ status: "Rejected", checked: false },
{ status: "Archived", checked: false }];


const JobsPage = () => {

    const [filterDropdownItem, setFilterDropDownItem] = useState(DropdownItems[0]);
    const [sortingOrder, setSortingOrder] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [checkedStatus, setCheckedStatus] = useState(StatusItems);



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





    return (
        <div>
            <NavigationBarAuth page="jobs" />

            <div class="container-fluid">
                <div class="row">
                    <nav class="col-sm-3 col-lg-2  d-block bg-light sidebar mt-4 pt-4 px-1 position-fixed">
                        <div class="sidebar-sticky" >
                            <ul class="nav flex-column">
                                <li>
                                    <div class=" mb-3 mx-2">
                                        <input class="form-control my-2 " type="search"
                                            placeholder="Company,Salary,etc.." id="form1"
                                            value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                                        <button class="btn btn-outline-success btn-block" type="button" onClick={handleSearchValue}>Search</button>
                                    </div>
                                    <hr></hr>
                                </li>
                                <li>
                                    <div class="mb-3 mx-2 ">
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
                                    <div class="mb-3 mx-2">
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
                                        <hr></hr>
                                    </div>
                                </li>
                                <li>
                                    <div class="mb-3 mx-2">
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
                                </li>

                            </ul>
                        </div>
                    </nav>
                    <div class="col-sm-9 ml-sm-auto col-lg-10 px-4 mt-5 pt-4">
                        <h2>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt volutpat turpis sit amet vestibulum. Etiam eu enim eget quam imperdiet interdum. Vestibulum et efficitur risus. Aenean eget porttitor ligula, nec ornare tortor. Ut sodales libero vitae ultrices pretium. Aliquam in nibh eu magna mollis vulputate. Phasellus vel lacus viverra lectus euismod sodales. In nec placerat nisi, nec scelerisque ante.

                            Sed blandit diam leo, in mollis elit pretium dignissim. Cras imperdiet eros non dignissim sollicitudin. Curabitur pretium mollis lacus in luctus. Integer eget nisl efficitur, sagittis tortor at, molestie dui. Fusce vitae nulla lacus. Vivamus id turpis velit. Ut dictum orci eget felis elementum, ut consequat lorem feugiat. Vivamus lacus eros, iaculis dapibus lorem eget, viverra fringilla neque. Maecenas sed ultricies augue. Etiam eu laoreet ante.

                            Duis ultricies, massa in tristique vestibulum, velit ipsum placerat risus, at condimentum nunc lacus sit amet purus. Vestibulum a volutpat nisl. Suspendisse nec nisi urna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer malesuada, neque quis ullamcorper lacinia, felis erat lacinia nulla, sit amet ultricies metus lacus ut felis. Cras feugiat orci ultrices nisi commodo, ut consequat magna rutrum. Sed pulvinar interdum elit ut interdum. Aenean ultrices eu libero quis sagittis. Aenean arcu massa, consequat a pellentesque quis, cursus a leo. Maecenas efficitur felis sed porttitor fermentum. Duis sit amet aliquet elit. Mauris rutrum efficitur nulla a volutpat. Mauris posuere diam non turpis porta, in sodales ipsum vehicula. Aenean urna orci, hendrerit ac luctus vel, placerat ac arcu. Donec sed egestas diam.


                    </h2>
                    </div>
                </div>


            </div>


        </div>
    );
};

export default JobsPage;