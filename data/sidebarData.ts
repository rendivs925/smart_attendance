import { OrganizationType } from "@/types";

export const getSidebarData = (organizationType: OrganizationType) => {
  return {
    title: "AttendX",
    navMain: [
      {
        title: "Dashboard",
        items: [
          { title: "Overview", url: "/dashboard" },
          { title: "Recent Activity", url: "/dashboard/activity" },
        ],
      },
      {
        title:
          organizationType === "business"
            ? "Employee Management"
            : "Member Management",
        items: [
          {
            title:
              "Add New " +
              (organizationType === "business" ? "Employee" : "Member"),
            url: "/users/new",
          },
          {
            title:
              "Manage " +
              (organizationType === "business" ? "Employees" : "Members"),
            url: "/users",
          },
          { title: "Role Management", url: "/users/roles" },
        ],
      },
      {
        title: "Attendance Tracking",
        items: [
          { title: "Mark Attendance", url: "/attendance/mark" },
          {
            title: "View Attendance Records",
            url: "/attendance/records",
            isActive: true,
          },
          { title: "Generate Reports", url: "/attendance/reports" },
          { title: "Export Data", url: "/attendance/export" },
        ],
      },
      ...(organizationType === "business"
        ? [
            {
              title: "Payroll & HR",
              items: [
                { title: "Payroll Management", url: "/payroll" },
                { title: "Leave & Overtime", url: "/payroll/leave" },
              ],
            },
          ]
        : [
            {
              title: "Event Attendance",
              items: [
                { title: "Upcoming Events", url: "/events" },
                { title: "Event Participation", url: "/events/attendance" },
              ],
            },
          ]),
      {
        title: "Analytics & Reports",
        items: [
          { title: "Attendance Trends", url: "/analytics/trends" },
          {
            title:
              organizationType === "school"
                ? "Student Performance"
                : "Engagement Reports",
            url: "/analytics/performance",
          },
          { title: "Activity Logs", url: "/analytics/logs" },
        ],
      },
      {
        title: "System Settings",
        items: [
          { title: "Authentication Settings", url: "/settings/auth" },
          { title: "Notifications", url: "/settings/notifications" },
          { title: "API Configuration", url: "/settings/api" },
        ],
      },
      {
        title: "Deployment & Maintenance",
        items: [
          { title: "System Updates", url: "/maintenance/updates" },
          { title: "Backup & Restore", url: "/maintenance/backup" },
          { title: "Logs & Debugging", url: "/maintenance/logs" },
        ],
      },
    ],
  };
};
