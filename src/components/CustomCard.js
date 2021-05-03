import React, { useRef, useState, useEffect } from 'react';
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./customcard.css";
import { Overlay, Tooltip } from 'react-bootstrap';


const CustomCard = (props) => {
    const [isCopied, setIsCopied] = useState(false);
    //When clicked on deleted button
    const [isDeleted, setIsDeleted] = useState(false);
    const target = useRef(null);
    

    function copyToClipboard(e) {

        setIsCopied(true);
        setTimeout(() => { setIsCopied(false) }, 500);
    };

    return (
        <div>
            {
                !isDeleted &&
                <div class={`card ${props.statusTheme} my-4`}>
                    <div class="card-header pb-0">
                        <h4><b>{props.job.jobTitle}</b></h4>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title mt-0"><b>Company: </b>{props.job.company}</h5>
                        <div class="d-flex justify-content-between">
                            <h6 class="card-text"><b>Type of Job:</b> {props.job.typeOfJob}</h6>
                            <h6 class="card-text"><b>Location:</b> {props.job.location}</h6>
                            <h6 class="card-text"><b>Salary:</b> {props.job.salary}</h6>
                        </div>
                        <div class="d-flex justify-content-between">
                            <h6 class="card-text"><b>Start Date:</b> {props.job.startDate}</h6>
                            <h6 class="card-text"><b>End Date:</b> {props.job.endDate}</h6>
                            <h6 class="card-text"><b>Last Application Date:</b> {props.job.lastApplicationDate}</h6>
                        </div>
                        <div class="d-flex justify-content-between">
                            <h6 class="card-text"><b>Last Modified:</b> {props.job.lastModified}</h6>
                            <h6 class="card-text"><b>Created At:</b> {props.job.createdAt}</h6>
                        </div>
                        <hr class="hr-style"></hr>
                        <h6 class="card-text mt-1"><b>Description</b></h6>
                        <h6 class="card-text">
                            {props.job.description}
                        </h6>
                        <h6 class="card-text mb-1"><b>Application Location</b></h6>
                        <div style={{ fontSize: "20px" }} class="row mx-1 mb-2">

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
                            <p class="m-1"><u>{props.job.applicationLocation}</u></p>
                        </div>
                        <div class="d-flex justify-content-end">
                        <h6 class="card-text mb-1"><b>ID:</b> {props.job.userJob_id}</h6>
                        <button type="button" class="btn btn-primary mx-1">Edit</button>
                        <button type="button" class="btn btn-danger mx-1">Delete</button>
                        </div>
                    </div>
                </div>
            }
            {
                isDeleted &&
                <div class={`card ${props.statusTheme} my-4`} style={{height:"200px"}}>
                    kk
                </div>
            }
        </div>
    );
};

export default CustomCard;