import JobsList from './JobsList';
import JobDetails from './jobdetails';

export default [

    {
        route: 'job-list',
        component: JobsList
    },
    {
        route: `job-details/:id`,
        component: JobDetails
    }
];

