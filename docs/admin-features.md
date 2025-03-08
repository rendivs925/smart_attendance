# AttendX - Admin Features

## 1. Dashboard

- **Overview:** Displays key statistics such as total users (students, employees, teachers, admins), attendance rate, and recent activities.
- **Recent Activity:** Logs system events like new user registrations, attendance updates, and organizational changes.
- **Organization Summary:** Shows data filtered by **schools, businesses, or organizations**.

## 2. Organization Management

- **Create New Organization:** Allows admins to create an organization (school, business, etc.).
  - **API:** `POST /organizations/new`
- **Manage Organizations:** List all organizations with options to edit or delete them.
  - **API:** `GET /organizations/all`
- **Assign Admins to Organizations:** Allows assigning or changing admins for an organization.
  - **API:** `PUT /organizations/{id}`

## 3. User Management

- **Add New User:** A form to create a new user with fields for username, email, password, phone, role (Student/Teacher/Admin/Employee), and organization.
  - **API:** `POST /users/new`
- **Manage Users by Organization:** Show users filtered by their organization with options to view, edit, or delete them.
  - **API:** `GET /users?organization_id={id}`
- **Edit/Delete Users:** Allow editing or deleting user records.
  - **Edit API:** `PUT /users/{id}`
  - **Delete API:** `DELETE /users/{id}`
- **Role Management:** Allows admins to assign roles within an organization.
  - **API:** `PUT /users/{id}/role`

## 4. Attendance Tracking

- **Mark Attendance:** A form where teachers or managers can mark students/employees present or absent.
  - **API:** `POST /attendances/new`
- **View Attendance Records:** Show attendance data, filterable by organization, user, or date.
  - **API:** `GET /attendances?organization_id={id}`
- **Generate Reports:** Generate and export attendance reports.
  - **API:** `GET /attendances/report?organization_id={id}`
- **Export Data:** Download attendance data in CSV or PDF format.

## 5. Subscription & Billing

- **View Subscription Plans:** Displays available subscription tiers.
  - **API:** `GET /subscriptions/plans`
- **Manage Organization Subscription:** Allows upgrading or canceling a subscription.
  - **API:** `PUT /organizations/{id}/subscription`
- **Billing History:** Shows invoices and payment history.
  - **API:** `GET /organizations/{id}/billing`

## 6. Analytics & Reports

- **Attendance Trends:** Graphs showing attendance trends for an organization.
- **User Performance Reports:** Insights into attendance consistency and participation.
- **Department & Class Analytics:** View attendance stats for different departments or classes.
- **Teacher/Manager Activity Logs:** Logs for tracking attendance actions.

## 7. System Settings

- **Authentication Settings:** Configure login/logout, password policies, and multi-factor authentication.
  - **Login API:** `POST /auth/login`
  - **Logout API:** `DELETE /auth/logout`
- **Notifications:** Manage notifications for users (e.g., attendance reminders).
  - **API:** `POST /notifications/send`
- **API Configuration:** Display system API keys and settings.

## 8. Deployment & Maintenance

- **System Updates:** Show system update logs.
- **Backup & Restore:** Provide options to back up or restore data.
- **Logs & Debugging:** Display system logs for debugging.
