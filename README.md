
put the route auth on the server. as the server should check if the user has access to that path or not. it can receive the requested route urls. compare them, and return the authed ones. this is becuse this function also needs to be used in the backend for aother calls, it should chekcn not only that the user is logged in, though also should they have access to the route that is calling that function. or something like this for security. as the front end could be manipulated in the current state 



- "window.location.href =" replace these with the navigate from dom 6
# General
- clear up console warnings errors
- override required docs for apply, onboard and post onboard for applications/job seekers. In the event for example your giving that one person a different salary in their contract.
-

# /access_admin/jobs
- major changes needed for the modal component. currently stopping page from loading
# /access_job_seeker/dashboard
- Pending & Offered
- Pending applications

# /team_members_all
- add job seekers only

# /app/employee/titles_&_depts
- remove company - its redundant
- check code still works
- update add employee

# /access_admin/job-dashboard
- Applications download button does not work
# /access_admin/jobs 
- page not loading


# /access_admin/job-applicants

# /settings/permissions_and_defaults
- review code make sure it works. minor refractoring
- remove the company 

# /app/profile/employee-profile/
- the url isnt working corrctly with the id
- add option for family info, education, and experience
- remove link from phone and email

# /access_admin/jobs
- page load error

# TODO: 
- add a "?" tooltip to components. it should show the component id. this will be used for access control by the user
- implement import { Helmet } from "react-helmet" in all routes
- add cleanups to the useeffects to stop memory leaks (isMounted )
- Add a report error button to notif errors. then it should open a model to send the error with user comments. should also be a button for quick report, which will skip the modal and just send the error without comments from the user
- maybe inject a function into notif, that logs any errors that occur for the user and store in db. for debugging
- add indeed apis for job posting and messages etc 

- add ant-spin-dot ant-spin-dot-spin loading and skeletion loading and lazy loading
- if jwt is expired. then the db should send back a logout demand to the front. the front should then action that command
- for personal info changes. maybe an an approval feature. or dont actually delete old info unless approved. incase of destructive tms



for access control. create a db table. that contains routes and components that can be restricted. this should be in a searchable drop down for the user to create perms. it will also need to have the relevent api url. this way on the backend for each call it can confirm that the user should have access to that api call or not 


