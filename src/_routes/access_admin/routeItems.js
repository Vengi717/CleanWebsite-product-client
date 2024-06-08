import JobsDashboard from './Jobs/jobs_dashboard';
import ManageJobs from "./Jobs/job_post_manage";
import AppliedCandidate from './Jobs/application_all';
import JobDetails from "./Jobs/job_post_details";
import OtherUsers from './users/users_other';
import AllEmployees from './users/team_members_all';
import UserProfile from './users/userProfile/user_profile';
import Titles from './Settings/titles';
import Departments from './Settings/departments';
import JobPostDocumentManage from "./Jobs/job_post_document_manage";
import Testing from "./testing/modal_testing_page";
import FileInput from "./testing/file_input_page";
//import RDocSignSetup from "./testing/pdf_signer/index";
import ServerFileTransfer from "./testing/serverfiletransfer/serverfiletransfer";
import Permissions_and_defaults from "./Settings/Permissions_and_defaults";
import JobApplication from "./Jobs/jobApplication";
import JobPostEdit from "./Jobs/jobPostEdit";
import DocumentEdit from "./Jobs/documentEdit";



export default [
    {
        route: 'documentEdit/:id',
        component: DocumentEdit
    },
    {
        route: 'job-post-edit/:id',
        component: JobPostEdit
    },
    {
        route: 'job-details/:id/job-application/:id',
        component: JobApplication
    },
    {
        route: 'permissions_and_defaults',
        component: Permissions_and_defaults
    },
    {
        route: `job-dashboard`,
        component: JobsDashboard
    },





    {
        route: `application-details`,
        component: UserProfile
    },
    {
        route: `titles`,
        component: Titles
    },
    {
        route: `departments`,
        component: Departments
    },
    {
        route: `job_post_manage`,
        component: ManageJobs
    },
    {
        route: `job-details/:id`,
        component: JobDetails
    },
    {
        route: `job-applicants`,
        component: AppliedCandidate
    },

    {
        route: `job_post_document_manage`,
        component: JobPostDocumentManage
    },
    {
        route: `team_members_all`,
        component: AllEmployees
    },
    {
        route: `user_profile/:id`,
        component: UserProfile
    },
    {
        route: `users_other`,
        component: OtherUsers
    },
    {
        route: `modal_testing`,
        component: Testing
    },
    {
        route: `file_input`,
        component: FileInput
    },
 
    {
        route: `serverfiletransfer`,
        component: ServerFileTransfer
    },
    
  
];