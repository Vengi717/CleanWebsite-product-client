
//TODO: is this being used? i think it should be put into routeItems. and route items should export them all. it should have a section for each access type.

import Companysettings from '../../_routes/access_admin/Settings/companysettings';
//import Localization from '../../_routes/access_admin/settings/localization';
import Permissions_and_defaults from '../../_routes/access_admin/Settings/Permissions_and_defaults';

import Titles_and_depts from '../../_routes/access_admin/Settings/titles_&_depts'
console.log("not in use anymor")
export default [
   {
      path: 'companysetting',
      component: Companysettings
   },

   {
      path: 'permissions_and_defaults',
      component: Permissions_and_defaults
   },
   {
      path: 'titles_&_depts',
      component: Titles_and_depts
   },



]