import React, { useRef, useState, useEffect } from 'react';
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./customcard.css";
import { Overlay, Tooltip} from 'react-bootstrap';
import { deleteJob } from '../store/entities/userjobs.js'
import { useDispatch } from 'react-redux';
import CustomEditCardModal from './customEditCardModal.js';




//props.job 
//props.statusTheme
const CustomCard = (props) => { 
    const [isCopied, setIsCopied] = useState(false);
    //When clicked on deleted button
    const [isDeleted, setIsDeleted] = useState(false);
    const [toEdit, setToEdit] = useState(false);

    const target = useRef(null);
    const dispatch = useDispatch();

    function copyToClipboard(e) {

        setIsCopied(true);
        setTimeout(() => { setIsCopied(false) }, 500);
    };

    function handleDelete(e) {
        setIsDeleted(true);
    }
    function handleCancelledDelete(e) {
        setIsDeleted(false);
    }
    function handleConfirmedDelete(e) {
        setIsDeleted(false);
        dispatch(deleteJob(props.job.userJob_id));
    }

    function handleEdit(e){
        setToEdit(!toEdit);
    }
    

    return (
        <div>
            {
                !isDeleted &&
                <div class={`card ${props.statusTheme} my-4`}>
                    <div class="card-header pb-0 d-flex justify-content-between">
                        <h4 class="ml-2"><b>{props.job.jobTitle}</b></h4>
                        <h6 class="card-text mb-1"><b>ID:</b> {props.job.userJob_id}</h6>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <h5 class="card-title mt-0 col-8"><b>Company: </b>{props.job.company}</h5>
                            <h5 class="card-title mt-0 col"><b>Status: </b>{props.job.status}</h5>

                        </div>
                        <div class="row">
                            <h6 class="card-text col"><b>Type of Job:</b> {props.job.typeOfJob}</h6>
                            <h6 class="card-text col"><b>Location:</b> {props.job.location}</h6>
                            <h6 class="card-text col"><b>Salary:</b> {props.job.salary}</h6>
                        </div>
                        <div class="row">
                            <h6 class="card-text col"><b>Start Date:</b> {props.job.startDate}</h6>
                            <h6 class="card-text col"><b>End Date:</b> {props.job.endDate}</h6>
                            <h6 class="card-text col"><b>Last Application Date:</b> {props.job.lastApplicationDate}</h6>
                        </div>
                        <div class="row">
                            <h6 class="card-text col-8"><b>Last Modified:</b> {props.job.lastModified}</h6>
                            <h6 class="card-text col"><b>Created At:</b> {props.job.createdAt}</h6>
                        </div>
                        <hr class="hr-style"></hr>
                        <h6 class="card-text mt-1"><b>Description</b></h6>
                        <h6 class="card-text border rounded p-2">
                            {props.job.description}
                        </h6>
                        <div class="container px-0 ml-3">
                            <div class="row px-0 ">
                                <div class="col-9 px-0 ">
                                    <h5 class="card-text mb-1" ><b>Application Location</b></h5>
                                    <div  class="row mx-1 mb-2">

                                        <CopyToClipboard text={props.job.applicationLocation} onCopy={copyToClipboard}>
                                            <button class="btn btn-info p-1 mt-0" ref={target}><i class="fa fa-copy fa-xs"></i></button>
                                        </CopyToClipboard>
                                        <Overlay target={target.current} show={isCopied} placement="right">
                                            {(props) => (
                                                <Tooltip id="id" {...props}>
                                                    Copied!
                                                </Tooltip>
                                            )}
                                        </Overlay>
                                        <div class="m-1" style={{ fontSize: "15px",wordWarp:"break-word" }}><u>{props.job.applicationLocation}</u></div>
                                    </div>
                                </div>
                                <div class="col px-0 mx-0 mt-3">
                                        <button type="button" class="btn btn-primary mx-1" onClick={handleEdit}>Edit</button>
                                        {
                                            toEdit &&
                                            <CustomEditCardModal job={props.job} onClose={handleEdit} editCardModal={toEdit}/>
                                        }
                                        <button type="button" class="btn btn-danger mx-1" onClick={handleDelete}>Delete</button>
                                </div>
                            </div>

                        </div>


                    </div>
                </div>
            }
            {
                isDeleted &&
                <div class={`card ${props.statusTheme} my-4`} style={{ height: "300px" }}>
                    <div class="alert alert-danger m-5 d-flex justify-content-center">  
                            Continue deleting?
                    </div>
                    <div class="d-flex justify-content-center">
                        <button type="button" class="btn btn-primary mx-1" onClick={handleCancelledDelete}>Cancel</button>
                        <button type="button" class="btn btn-danger mx-1" onClick={handleConfirmedDelete}>Delete</button>
                        </div>
                </div>
            }
        </div>
    );
};

export default CustomCard;