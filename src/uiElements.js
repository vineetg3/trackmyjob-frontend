const DropdownItems = ["Job Title","Company", "Salary", "Date of Last Application", "Start-Date", "End-Date", "Last Modified", "Created Date"];
const StatusItems = [{ status: "Saved", checked: false, theme: "bg-light" },
{ status: "Applied", checked: false, theme: "bg-dark text-white" },
{ status: "Interviewing", checked: false, theme: "bg-info text-white" },
{ status: "Hired", checked: false, theme: "bg-success text-white" },
{ status: "Rejected", checked: false, theme: "bg-danger text-white" },
{ status: "Archived", checked: false, theme: "bg-secondary text-white" }];

export {
    DropdownItems,
    StatusItems
}