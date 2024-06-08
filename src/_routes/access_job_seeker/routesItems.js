
import Welcome from './welcome';
import User_profile from './userProfile/user_profile';
import AppliedJobs from './job_post_applied';
import Useralljobs from './job_posts_all';
import Jobdetails from './job_post_details';
import UserDashboard from './job_seeker_dashboard';
import JobApplication from './jobApplication';

export default [
    {
        route: 'job-details/:id/jobApplication/:id',
        component: JobApplication,
    },
    {
        route: 'job_post_applied',
        component: AppliedJobs,
    },
    {
        route: 'welcome',
        component: Welcome,
    },
    {
        route: 'job_posts_all',
        component: Useralljobs,
    },
    {
        route: 'dashboard',
        component: UserDashboard,
    },
    {
        route: 'job-details/:id',
        component: Jobdetails,
    },
    {
        route: 'user_profile/:id',
        component: User_profile,
    },
];