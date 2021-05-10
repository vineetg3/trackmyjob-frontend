import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, Alert } from 'react-bootstrap';
import { addJob } from '../store/entities/userjobs.js'
import {StatusItems} from '../uiElements.js';



export default function CustomAddCardModal(props) {

    const [jobType, setJobType] = useState("");
    const [jobLocation, setJobLocation] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [company, setCompany] = useState(""); 
    const [salary, setSalary] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [lastApplicationDate, setLastApplicationDate] = useState("");
    const [applicationLoc, setApplicationLoc] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(StatusItems[0].status);

    const dispatch = useDispatch()

    function replaceBlank(obj) {
        Object.keys(obj).forEach(
            (key) => {
                if (obj[key] === "") {
                    obj[key] = null;
                }
            }
        )
    }
    
    function handleSaveChanges() {
        if(jobTitle.length===0)return;
        const data = {
            typeOfJob: jobType,
            location: jobLocation,
            jobTitle,
            company,
            salary,
            startDate,
            endDate,
            lastApplicationDate,
            applicationLocation: applicationLoc,
            description,
            status,
        };
        replaceBlank(data);
        dispatch(addJob(data));
        props.onClose();
    } 

    function handleStatusChange(e) {
        setStatus(e.target.value);
    }


    return (
        <>

            <Modal show={props.addCardModal} animation={true} size="lg" centered>
                <Modal.Header >
                    <Modal.Title>Enter Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div class="form-row">
                            <div class="form-group col-6">
                                <label for="jobTitle">Job Title</label>
                                <input type="text" class="form-control" id="jobTitle" placeholder="Job Title" value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
                            </div>
                            <div class="form-group col-6">
                                <label for="Company">Company</label>
                                <input type="text" class="form-control" id="location" placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-6">
                                <label for="jobType">Job Type</label>
                                <input type="text" class="form-control" id="jobType" placeholder="Job Type" value={jobType} onChange={e => setJobType(e.target.value)} />
                            </div>
                            <div class="form-group col-6">
                                <label for="location">Location</label>
                                <input type="text" class="form-control" id="location" placeholder="Location" value={jobLocation} onChange={e => setJobLocation(e.target.value)} />
                            </div>
                        </div>
                        <div class="form-row">

                            <div class="form-group col-4">
                                <label for="startdate" >Start Date</label>
                                <div >
                                    <input class="form-control" type="date" value={startDate} id="startdate" onChange={e => setStartDate(e.target.value)} />
                                </div>
                            </div>
                            <div class="form-group col-4">
                                <label for="enddate" >End Date</label>
                                <div >
                                    <input class="form-control" type="date" value={endDate} id="enddate" onChange={e => setEndDate(e.target.value)} />
                                </div>
                            </div>
                            <div class="form-group col-4">
                                <label for="lastApplicationDate">Last Application Date</label>
                                <div >
                                    <input class="form-control" type="date" value={lastApplicationDate} id="lastApplicationDate" onChange={e => setLastApplicationDate(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-6">
                                <label for="salary">Salary</label>
                                <input type="number" class="form-control" id="salary" placeholder="Salary" value={salary} onChange={e => setSalary(e.target.value)} />
                            </div>
                            <div class="form-group col-6">
                                <label for="applicationLoc">Application Location</label>
                                <input type="text" class="form-control" id="applicationLoc" placeholder="Application Location" value={applicationLoc} onChange={e => setApplicationLoc(e.target.value)} />
                            </div>
                        </div>
                        <div class="form-row mb-1">
                            <label>Status:</label>
                            <select class={`custom-select`}
                                value={status}
                                onChange={handleStatusChange}>
                                {
                                    StatusItems.map((item, idx) =>
                                        <option value={item.status} class={item.theme}>{item.status}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div class="form-row">
                            <div>
                                <label for="description">Description</label>
                                <textarea class="form-control" cols={90} rows={3} id="description" value={description} onChange={e => setDescription(e.target.value)} />

                            </div>
                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onClose}>
                        Close
            </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Add Card
            </Button>
                </Modal.Footer>
                {
                    jobTitle.length === 0 &&
                    <div class="mx-3">
                        <Alert variant='danger' dismissible>
                            JobTitle cannot be empty
                    </Alert>
                    </div>
                }
            </Modal>
        </>
    );
}