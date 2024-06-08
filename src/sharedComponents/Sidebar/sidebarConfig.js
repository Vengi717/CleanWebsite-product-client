export const requiredSidebarPathssettings = [
  {
    title: 'Settings',
    items: [
      {
        title: 'Navigation ',
        iconClassName: 'la la-dashboard',
        items: [
          { title: 'Permissions & Defaults', path: '/settings/permissions_and_defaults' },
          { title: 'titles & depts', path: '/settings/titles_&_depts' },
        ]
      }
    ]
  }
];

export const allSidebarPaths = [
  {
    title: 'main',
    items: [
      {
        title: 'dashboard',
        iconClassName: 'la la-dashboard',
        items: [
          { title: 'welcome', path: '/access_job_seeker/welcome' },
          { title: 'admin_dashboard', path: '/app/main/dashboard' },
          { title: 'employee_dashboard', path: '/app/main/employee-dashboard' }
        ]
      },
      {
        title: 'apps',
        iconClassName: 'la la-cube',
        items: [
          { title: 'chat', path: '/conversation/chat' },
          {
            title: 'calls',
            items: [
              { title: 'voice_call', path: '/conversation/voice-call' },
              { title: 'video_call', path: '/conversation/video-call' },
              { title: 'outgoing_call', path: '/conversation/outgoing-call' },
              { title: 'incoming_call', path: '/conversation/incoming-call' }
            ]
          },
          { title: 'calendar', path: '/apps/calendar' },
          { title: 'contacts', path: '/apps/contacts' },
          { title: 'email', path: '/email/inbox' },
          { title: 'file_manager', path: '/apps/file-manager' }
        ]
      },
    ]
  },
  {
    title: 'employees',
    items: [
      {
        title: 'employees',
        iconClassName: 'la la-user',
        items: [
          { title: 'all_employees', path: '/team_members_all' },
          { title: 'holidays', path: '/app/employee/holidays' },
          { title: 'leaves_(admin)', path: '/app/employee/leaves-admin' },
          { title: 'leaves_(employee)', path: '/app/employee/leaves-employee' },
          { title: 'leave_settings', path: '/app/employee/leave-settings' },
          { title: 'attendance_(admin)', path: '/app/employee/attendance-admin' },
          { title: 'attendance_(employee)', path: '/app/employee/attendance-employee' },
          { title: 'titles_&_depts', path: '/app/employee/titles_&_depts' },
          { title: 'timesheet', path: '/app/employee/timesheet' },
          { title: 'overtime', path: '/app/employee/overtime' },
        ]
      },
      { title: 'clients', iconClassName: 'la la-users', path: '/app/employees/clients' },
      {
        title: 'projects',
        iconClassName: 'la la-rocket',
        items: [
          { title: 'projects', path: '/app/projects/project_dashboard' },
          { title: 'tasks', path: '/tasks/tasks' },
          { title: 'task_board', path: '/projects/task-board' }
        ]
      },
      { title: 'leads', iconClassName: 'la la-user-secret', path: '/employees/leads' },
      { title: 'tickets', iconClassName: 'la la-ticket', path: '/employees/tickets' },
    ]
  },
  {
    title: 'hr',
    items: [
      {
        title: 'accounts',
        iconClassName: 'la la-files-o',
        items: [
          { title: 'estimates', path: '/accounts/estimates' },
          { title: 'invoices', path: '/accounts/invoices' },
          { title: 'payments', path: '/accounts/payments' },
          { title: 'expenses', path: '/accounts/expenses' },
          { title: 'provident_fund', path: '/accounts/provident-fund' },
          { title: 'taxes', path: '/accounts/taxes' }
        ]
      },
      {
        title: 'payroll',
        iconClassName: 'la la-money',
        items: [
          { title: 'employee_salary', path: '/payroll/_salary' },
          { title: 'payslip', path: '/payroll/salary-view' },
          { title: 'payroll_items', path: '/payroll/payroll-items' },
        ]
      },
      { title: 'policies', iconClassName: 'la la-file-pdf-o', path: '/hr/policies' },
      {
        title: 'reports',
        iconClassName: 'la la-pie-chart',
        items: [
          { title: 'expense_reports', path: '/reports/expense-reports' },
          { title: 'invoice_report', path: '/reports/invoice-reports' }
        ]
      }
    ]
  },
  {
    title: 'performance',
    items: [
      {
        title: 'performance',
        iconClassName: 'la la-graduation-cap',
        items: [
          { title: 'performance_indicator', path: '/performances/performance-indicator' },
          { title: 'performance_review', path: '/performances/performance-review' },
          { title: 'performance_appraisal', path: '/performances/performance-appraisal' }
        ]
      }
    ]
  },
  {
    title: 'goals',
    iconClassName: 'la la-crosshairs',
    items: [
      { title: 'goal_list', path: '/goals/goal-tracking' },
      { title: 'goal_type', path: '/goals/goal-type' }
    ]
  },
  {
    title: 'training',
    iconClassName: 'la la-edit',
    items: [
      { title: 'training_list', path: '/training/training-list' },
      { title: 'trainers', path: '/training/trainer' },
      { title: 'training_type', path: '/training/training-type' }
    ]
  },
  {
    title: 'training_modules',
    iconClassName: 'la la-edit',
    items: [
      { title: 'training_module_admin', path: '/training-modules/training-module-admin' },
      { title: 'trainig_module', path: '/training-modules/training-module-tm' }
    ]
  },
  { title: 'promotion', iconClassName: 'la la-bullhorn', path: '/performance/promotion' },
  { title: 'resignation', iconClassName: 'la la-external-link-square', path: '/performance/resignation' },
  { title: 'termination', iconClassName: 'la la-times-circle', path: '/performance/termination' },
  {
    title: 'administration',
    items: [
      { title: 'assets', iconClassName: 'la la-object-ungroup', path: '/access_admin/assets' },
      {
        title: 'jobs',
        iconClassName: 'la la-briefcase',
        items: [
          { title: 'job_dashboard', path: '/access_admin/job-dashboard' },
          { title: 'manage_jobs', path: '/access_admin/jobs' },
          { title: 'applied_cadidates', path: '/access_admin/job-applicants' },
          { title: 'job_seeker', path: '/access_job_seeker/dashboard' }
        ]
      },
      { title: 'knowledgebase', iconClassName: 'la la-question', path: '/access_admin/knowledgebase' },
      { title: 'activities', iconClassName: 'la la-bell', path: '/access_admin/activities' },
      { title: 'users', iconClassName: 'la la-user-plus', path: '/access_admin/users' },
      { title: 'settings', iconClassName: 'la la-cog', path: '/settings/companysetting' }
    ]
  },
  {
    title: 'pages',
    items: [
      {
        title: 'profile',
        iconClassName: 'la la-user',
        items: [
          { title: 'employee_profile', path: '/profile/employee-profile' },
          { title: 'client_profile', path: '/profile/client-profile' }
        ]
      },
      {
        title: 'authentication',
        iconClassName: 'la la-key',
        items: [
          { title: 'login', path: '/login' },
          { title: 'register', path: '/register' },
          { title: 'forgot_password', path: '/forgotpassword' },
          { title: 'OTP', path: '/otp' },
          { title: 'lock_screen', path: '/lockscreen' }
        ]
      },
      {
        title: 'error_pages',
        iconClassName: 'la la-exclamation-triangle',
        items: [
          { title: '404_error', path: '/error-404' },
          { title: '500_error', path: '/error-500' }
        ]
      },
      {
        title: 'subscriptions',
        iconClassName: 'la la-hand-o-up',
        items: [
          { title: 'subscriptions_(admin)', path: '/subscription/subscriptionadmin' },
          { title: 'subscriptions_(company)', path: '/subscription/subscriptioncompany' },
          { title: 'subscribed_companies', path: '/subscription/subscribedcompanies' }
        ]
      },
      {
        title: 'pages',
        iconClassName: 'la la-columns',
        items: [
          { title: 'search', path: '/pages/search' },
          { title: 'faq', path: '/pages/faq' },
          { title: 'terms', path: '/pages/terms' },
          { title: 'privacy_policy', path: '/pages/privacypolicy' },
          { title: 'blank_page', path: '/pages/blank' }
        ]
      }
    ]
  },
  {
    title: 'UI_interface',
    items: [
      { title: 'componants', iconClassName: 'la la-puzzle-piece', path: '/ui-componants' },
      {
        title: 'forms',
        iconClassName: 'la la-object-group',
        items: [
          { title: 'basic_inputs', path: '/ui-interface/forms/basicinputs' },
          { title: 'input_groups', path: '/ui-interface/forms/inputgroups' },
          { title: 'horizontal_form', path: '/ui-interface/forms/horizontalform' },
          { title: 'vertical_form', path: '/ui-interface/forms/verticalform' },
          { title: 'form_mask', path: '/ui-interface/forms/formmask' },
          { title: 'form_validation', path: '/ui-interface/forms/formvalidation' }
        ]
      },
      {
        title: 'tables',
        iconClassName: 'la la-table',
        path: '/ui-interface/tables/basic',
        items: [
          { title: 'basic_tables', path: '/ui-interface/tables/basic' },
          { title: 'data_table', path: '/ui-interface/tables/data-table' }
        ]
      }
    ]
  },
  {
    title: 'extras',
    items: [
      { title: 'documentation', iconClassName: 'la la-file-text', path: '#' },
      { title: 'change_log', iconClassName: 'la la-info', path: '#' },
      {
        title: 'multi_level',
        iconClassName: 'la la-share-alt',
        items: [
          {
            title: 'level_1',
            items: [
              { title: 'level_2', path: '#' },
              {
                title: 'level_2',
                items: [
                  { title: 'level_3', path: '#' },
                  { title: 'level_3', path: '#' }
                ]
              },
              { title: 'level_2', path: '#' }
            ]
          },
          { title: 'level_1', path: '#' }
        ]
      }
    ]
  }
];

export const requiredSidebarPaths = [
  {
    title: 'Job Seekers',
    items: [
      {
        title: 'job Seekers',
        iconClassName: 'la la-external-link-square',
        items: [
          { title: 'Dashboard', path: '/access_job_seeker/dashboard' },
          { title: 'Job Posts', path: '/access_job_seeker/job_posts_all' },
          { title: 'Applied', path: '/access_job_seeker/job_post_applied' }
        ]
      }
    ]
  },
  {
    title: 'Team Members',
    items: [
      {
        title: 'Team Members',
        iconClassName: 'la la-user',
        items: [
          { title: 'Team Members', path: '/access_team_member/team-members-all' },
        ]
      }
    ]
  },
  {
    title: 'administration',
    items: [
      {
        title: 'jobs',
        iconClassName: 'la la-briefcase',
        items: [
          { title: 'dashboard', path: '/access_admin/job-dashboard' },
          { title: 'manage jobs', path: '/access_admin/job_post_manage' },
          { title: 'manage documents', path: '/access_admin/job_post_document_manage' },
          { title: 'applications', path: '/access_admin/job-applicants' }
        ]
      },
      {
        title: 'Users',
        iconClassName: 'la la-user',
        items: [
          { title: 'Team Members', path: '/access_admin/team_members_all' },
          { title: 'Other Users', path: '/access_admin/users_other' },
        ]
      },







      //  { title: 'settings', iconClassName: 'la la-cog', path: '/settings/permissions_and_defaults' },


    ]
  },




  {
    title: 'Settings',
    items: [
      {
        title: 'Settings',
        iconClassName: 'la la-cog',
        items: [
       //   { title: 'General', path: '/access_admin/general' },
          { title: 'Departments', path: '/access_admin/departments' },
          { title: 'Titles', path: '/access_admin/titles' },
          { title: 'Access', path: '/access_admin/permissions_and_defaults' }
        ]
      }
    ]
  },
  {
    title: 'Testing',
    items: [
      {
        title: 'general',
        iconClassName: 'la la-codepen',
        items: [
          { title: 'modal', path: '/access_admin/modal_testing' },
          { title: 'file_input', path: '/access_admin/file_input' },
          { title: 'r_doc_sign_setup', path: '/access_admin/r_doc_sign_setup' },
          { title: 'serverfiletransfer', path: '/access_admin/serverfiletransfer' },
        ]
      },
    ]
  },


];
