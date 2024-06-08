// router_service.js
import Job_seekers from '../../_routes/access_job_seeker';


import Access_admin from '../../_routes/access_admin';
import Access_team_member from '../../_routes/access_team_member';

export default [
    {
        path: '/access_team_member', // Remove the leading slash
        component: Access_team_member,
     },
     {
        path: '/access_job_seeker', // Remove the leading slash
        component: Job_seekers,
     },
     {
        path: '/access_admin', // Remove the leading slash
        component: Access_admin
     },
]