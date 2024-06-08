import Team_member_all from './team_members/team_members_all';
import Profile from './team_members/profile';

export default [

    {
        route: 'team-members-all',
        component: Team_member_all
    },
    {
        route: 'userProfile/:id',
        component: Profile
    },
];


