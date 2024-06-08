
import api from './api/_handler';

//TODO: maybe put the the reduxData in the class constructor

class access_admin {//requires login & tm status & admin
    users = new class {
        async get_job_seeker_qty() {
            return api({ data: {}, route: `v2_get_active_job_seeker_qty` })
                .then(async (response) => {
                    if (response.success) {//success
                        return response.data
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });

        }
        get_all_other_users() {
            return api({ data: { only_active: true }, route: `v2_get_all_other_users` })
                .then(async (response) => {
                    if (response.success) {//success
                        return response.data
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });
        }
    }
    jobs = new class {
        async update_status(data) {


            return api({ data: { data }, route: `v2_admin_actions_applications_update_status`, notif: true })
                .then(async (response) => {
                    if (response.success) {//success
                        return response.data
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });


            return api({ data, route: `v2_admin_actions_applications_update_status` })
                .then(async (response) => {
                    if (response.success) {//success
                        return response.data
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });
        }
        async get_job_application_statuses(only_active = true) {
            return api({ data: { only_active }, route: `v2_get_job_application_statuses` })
                .then(async (response) => {
                    if (response.success) {//success
                        return response.data
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });
        }

        async get_job_applications(recent_qty, get_only_not_onboarded) {
            return api({ data: { recent_qty, get_only_not_onboarded }, route: `v2_admin_actions_get_job_applications` })
                .then(async (response) => {
                    if (response.success) {//success
                        return response.data
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });
        }
        async get_user_docs_by_user_id(props) {
            const { id_user, only_active, only_doc_type, required_for_onboard, required_for_apply } = props
            return api({ data: { id_user, only_active, only_doc_type, required_for_onboard, required_for_apply }, route: `v2_get_user_docs_by_user_id` })
                .then(async (response) => {
                    if (response.success) {//success
                        return response.data
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });
        }

        async v2_document_names(props) {
            const { only_active, only_doc_type, required_for_onboard, required_for_apply } = props
            return api({ data: { only_active, only_doc_type, required_for_onboard, required_for_apply }, route: `v2_document_names` })
                .then(async (response) => {
                    if (response.success) {//success
                        return response.data
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });
        }

        async update_job_status_by_id(data, reduxData) {
            return api({ data, route: `v2_update_job_status_by_id`, notif: true, reduxData })
                .then(async (response) => {
                    if (response.success) {//success
                        return response.data
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });
        }
        async update_job_type_by_id(data) {
            return api({ data, route: `v2_update_job_type_by_id`, notif: true, reduxData })
                .then(async (response) => {
                    if (response.success) {//success
                        return response.data
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });
        }


        async add_job_post(data) {
            return api({ data: data.data, route: `v2_add_job_post`, reduxData })
                .then(async (response) => {
                    if (response.success) {//success
                        return response
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });
        }
        async edit_job_post(data) {

            data.data.id_job_posts = data.edit_id
            return api({ data: data.data, route: `v2_edit_job_post`, notif: true, reduxData })
                .then(async (response) => {
                    if (response.success) {//success
                        return response
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });
        }


        async get_documents_master_names(only_active = true) {
            return api({ data: { only_active }, route: `v2_get_documents_master_names` })
                .then(async (response) => {
                    if (response.success) {//success
                        return response.data
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });
        }

        async update_document_required_for_by_id(data) {
            return api({ data, route: `v2_update_document_required_for_by_id`, notif: true, reduxData })
                .then(async (response) => {
                    if (response.success) {//success
                        return response.data
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });
        }


        async edit_documents_master_names(data) {
            return api({ data, route: `v2_edit_documents_master_names`, notif: true, reduxData })
                .then(async (response) => {
                    if (response.success) {//success
                        return response
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });
        }

        async add_documents_master_names(data) {
            return api({ data, route: `v2_add_documents_master_names`, notif: true, reduxData })
                .then(async (response) => {
                    if (response.success) {//success
                        return response
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });
        }
    }
}

class access_team_member {//requires login & tm status
    users = new class {
        async get_employee_qty() {
            return api({}, `v2_get_employee_qty`)
                .then(async (response) => {
                    if (response.success) {//success
                        return response.data
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });

        }
        get_all_employees() {
            return api({ only_active: true }, `AccessAdminUsersTeamMembers`)
                .then(async (response) => {
                    if (response.success) {//success
                        return response.data
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });
        }
    }
    jobs = new class {
    }
}
class access_job_seeker {//requires login
    users = new class {
        async get_user_id_from_server(reduxData) {
            if (reduxData.bearer) {
                return await api({ data: {}, route: `getuser_id`, reduxData })
                    .then(async (response) => {
                        if (response.success) {//success
                            return response.data
                        } else {//failed, though handled by server backend with custom fail response 
                            console.log("handled error", response)
                        }
                    })
                    .catch(async (e) => {//failure not handled by custom backend function 
                        console.log("Unhandled Error: ", e)
                    });
            }

        }

        async get_user_id_from_redux(reduxData) {
            return reduxData.id_user
        }

        async get_user_profile_by_id(id_user) {
            return api({ id_user, only_active: true }, `v2_get_user_profile/` + id_user)
                .then(async (response) => {
                    if (response.success) {//success
                        return response.data
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });
        }
        async edit_family_info(data) {
            return api(
                data.data
                , `v2_edit_family_info`, true)
                .then(async (response) => {
                    if (response.success) {//success
                        return response
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });
        }

        async edit_user_profile(data) {
            //console.log(data)
            return api({
                ...data.data
            }, `v2_edit_user_profile`, true)
                .then(async (response) => {
                    if (response.success) {//success
                        return response
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });
        }

        async edit_education_history(data) {
            console.log(data)
            return api({
                ...data.data
            }, `v2_edit_education_history`, true)
                .then(async (response) => {
                    if (response.success) {//success
                        return response
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });
        }

        async edit_experince(data) {
            console.log(data)
            return api({
                ...data.data
            }, `v2_edit_user_experince`, true)
                .then(async (response) => {
                    if (response.success) {//success
                        return response
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });
        }


    }
    jobs = new class {
        async get_open_job_qty() {
            return api({}, `v2_get_open_job_qty`)
                .then(async (response) => {
                    if (response.success) {//success
                        return response.data
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });

        }
        async get_job_application_qty() {
            return api({}, `v2_get_active_application_qty`)
                .then(async (response) => {
                    if (response.success) {//success
                        return response.data
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });

        }
        async get_job_posts({ recent_qty, only_active, reduxData }) {//TODO: split this with admin actions. as some of this data should only be accessed by admin
            return api({ data: { recent_qty, only_active }, route: `accessJobSeekerGetJobPostss`, reduxData })
                .then(async (response) => {
                    if (response.success) {//success
                        return response.data
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });

        }
        async get_job_types({ only_active, reduxData }) {//TODO: split this with admin actions. as some of this data should only be accessed by admin
            return api({ data: { only_active }, route: `v2_get_job_types`,reduxData })
                .then(async (response) => {
                    if (response.success) {//success
                        return response.data
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });

        }
        async get_applications_by_user_id({ id_user, reduxData }) {
            return api({ data: {}, route: `accessJobSeekerGetAppliationsViaUserId/` + id_user, reduxData })
                .then(async (response) => {
                    if (response.success) {//success
                        return response.data
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });
        }
        async get_job_post_offered_qty({ id_user, reduxData }) {
            return api({ data: { id_user }, route: `v2get_job_post_offered_qty`, reduxData })
                .then(async (response) => {
                    if (response.success) {//success
                        return response.data.offred_qty
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });
        }
        async get_job_post_offered_by_id({ id_user, reduxData }) {
            return api({ data: { id_user }, route: `v2get_job_post_offered_by_id`, reduxData })
                .then(async (response) => {
                    if (response.success) {//success
                        return response.data
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });
        }
        async get_job_post_offered_interview_by_id({ id_user, reduxData }) {
            return api({ data: { id_user }, route: `v2get_job_post_offered_interview_by_id`, reduxData })
                .then(async (response) => {
                    if (response.success) {//success
                        return response.data
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });
        }

    }
    general = new class {
        async add_documents_company_provided(data) {
            // console.log("sending this: ", data)
            return api({ data, route: `v2_add_documents_company_provided`, reduxData })
                .then(async (response) => {
                    if (response.success) {//success
                        return response
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });
        }
    }
}

class access_public {//anyone can access
    users = new class {
    }
    jobs = new class {
    }
    general = new class {
        get_titles({ only_active, reduxData }) {
            return api({ data: { only_active }, route: `v2_get_titles`, reduxData })
                .then(async (response) => {
                    if (response.success) {//success
                        return response.data
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });
        }
        get_departments({ only_active, reduxData }) {
            return api({ data: { only_active }, route: `v2_get_departments`, reduxData })
                .then(async (response) => {
                    if (response.success) {//success
                        return response.data
                    } else {//failed, though handled by server backend with custom fail response
                        console.log("handled error", response)
                    }
                })
                .catch(async (e) => {//failure not handled by custom backend function 
                    console.log("Unhandled Error: ", e)
                });
        }
        get_bearer() {//TODO: should this come from redux instead of localstorage?
            var bearer = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).data).bearer
            console.log("oooooo:", bearer)
            return bearer
        }
        isABootstrapModalOpen() {//move out of data services and move to services
            return document.querySelectorAll('.modal.show').length > 0;
        }
    }
}

class wrappers {
    access_admin = new class {
        async admin_job_dashboard(console_log) {
            var temp = {}
            temp.job_application_qty = await funcs.access_job_seeker.jobs.get_job_application_qty()
            temp.job_seeker_qty = await funcs.access_admin.users.get_job_seeker_qty()
            temp.open_job_qty = await funcs.access_job_seeker.jobs.get_open_job_qty()
            temp.employee_qty = await funcs.access_team_member.users.get_employee_qty()
            temp.applications = await funcs.access_admin.jobs.get_job_applications(3, true)
            temp.job_posts = await funcs.access_job_seeker.jobs.get_job_posts(3, true)



            if (console_log) {
                console.log("wrapper data: ", await temp)
            }
            return temp
        }

        async admin_manage_jobs(console_log) {
            var temp = {}
            temp.job_types = await funcs.access_job_seeker.jobs.get_job_types()
            temp.job_posts = await funcs.access_job_seeker.jobs.get_job_posts()
            temp.departments = await funcs.access_public.general.get_departments(true)
            temp.titles = await funcs.access_public.general.get_titles(true)

            temp.functions = {//TODO: implement this for all functions accross app
                update_job_type_by_id: (props) => funcs.access_admin.jobs.update_job_type_by_id({ ...props }),
                update_job_status_by_id: (props) => funcs.access_admin.jobs.update_job_status_by_id({ ...props }),
                edit_job_post: (props) => funcs.access_admin.jobs.edit_job_post({ ...props })
            }
            const all_docs = await funcs.access_admin.jobs.get_documents_master_names()
            const applying = await all_docs.filter(i => i.required_for_apply == 1);
            const onboarding = await all_docs.filter(i => i.required_for_onboard == 1);
            const post_onboarding = await all_docs.filter(i => i.required_for_post_onboard == 1);

            temp.job_posts_docs = await {
                applying: applying,
                onboarding: onboarding,
                post_onboarding: post_onboarding,
            }

            if (console_log) {
                console.log("wrapper data: ", await temp)
            }
            return temp
        }

        async admin_manage_documents(console_log) {
            var temp = {}
            temp.data = {}
            temp.data.documents = await funcs.access_admin.jobs.get_documents_master_names()

            temp.functions = {//TODO: implement this for all functions accross app
                firebase_upload: async (props) => await funcs.access_job_seeker.general.firebase_upload({ ...props }),
                update_document_required_for_by_id: async (props) => await funcs.access_admin.jobs.update_document_required_for_by_id({ ...props }),
                edit_document_name: async (props) => await funcs.access_admin.jobs.edit_documents_master_names({ ...props }),
                add_document_name: async (props) => await funcs.access_admin.jobs.add_documents_master_names({ ...props }),
                add_document_company_provided: async (props) => await funcs.access_job_seeker.general.add_documents_company_provided({ ...props }),
            }

            if (console_log) {
                console.log("wrapper data: ", await temp)
            }
            return temp
        }


    }
    access_team_member = new class {

    }
    access_job_seeker = new class {
        async all_job_posts({ console_log, reduxData }) {
            var temp = {}
            temp.job_types = await funcs.access_job_seeker.jobs.get_job_types({ only_active: true, reduxData })
            temp.job_posts = await funcs.access_job_seeker.jobs.get_job_posts({ recent_qty: false, only_active: true, reduxData })
            temp.departments = await funcs.access_public.general.get_departments({ only_active: true, reduxData })
            temp.titles = await funcs.access_public.general.get_titles({ only_active: true, reduxData })

            if (console_log) {
                console.log("wrapper data: ", await temp)
            }
            return temp
        }

        async dashboard({ console_log, reduxData }) {
            const id_user = reduxData.id_user//await funcs.access_job_seeker.users.get_user_id_from_server(reduxData)
            var temp = {}

            temp.recent_job_posts = await funcs.access_job_seeker.jobs.get_job_posts({ recent_qty: 3, only_active: true, reduxData })
            // console.log("ttttt", temp.recent_job_posts)
            temp.job_applications = await funcs.access_job_seeker.jobs.get_applications_by_user_id({ id_user, reduxData })
            temp.applied_to_qty = await temp.job_applications.length
            temp.offered_qty = await funcs.access_job_seeker.jobs.get_job_post_offered_qty({ id_user, reduxData })
            temp.offered_interview_data = await funcs.access_job_seeker.jobs.get_job_post_offered_interview_by_id({ id_user, reduxData })

            if (console_log) {
                console.log("wrapper data: ", await temp)
            }
            return temp
        }
    }
    access_public = new class {

    }
}


const funcs = {
    access_admin: new access_admin,
    access_team_member: new access_team_member,
    access_job_seeker: new access_job_seeker,
    access_public: new access_public,
    wrappers: new wrappers,
}

export default funcs