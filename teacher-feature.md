# AttendX - Teacher Features

## 1. Dashboard

- **Overview:** Display key statistics such as total assigned classes, student attendance rate, and upcoming schedules.
- **Recent Activity:** Show logs of attendance updates, class modifications, and student performance.

## 2. Class Management

- **View Assigned Classes:** List all classes assigned to the teacher.
  - **API:** `GET /classes/assigned`
- **Manage Class Details:** Allow teachers to update class details such as name and description.
  - **API:** `PUT /classes/{id}`

## 3. Attendance Management

- **Mark Attendance:** A form where teachers can mark students present/absent/tardy.
  - **API:** `POST /attendances/new`
- **View Attendance Records:** Show attendance history filtered by class, student, or date.
  - **API:** `GET /attendances/class/{id}`
- **Modify Attendance:** Allow teachers to update attendance records if needed.
  - **API:** `PUT /attendances/{id}`
- **Export Attendance Data:** Provide options to download attendance records as CSV or PDF.

## 4. Student Management

- **View Students:** Display a list of students in each assigned class.
  - **API:** `GET /students/class/{id}`
- **Student Performance Tracking:** Show student attendance trends and engagement statistics.
- **Communicate with Students:** Allow messaging or announcements for students within a class.

## 5. Reports & Analytics

- **Class Attendance Reports:** Generate reports on attendance performance for a specific class.
  - **API:** `GET /attendances/report/class/{id}`
- **Individual Student Reports:** Provide insights on individual student attendance trends.
  - **API:** `GET /attendances/report/student/{id}`
- **Export Reports:** Download reports in CSV or PDF format.

## 6. Notifications & Reminders

- **Receive Notifications:** Alert teachers about low attendance rates, upcoming classes, or system updates.
- **Send Reminders:** Notify students about upcoming classes or assignments.

## 7. System Settings

- **Update Profile Information:** Allow teachers to modify their personal information.
  - **API:** `PUT /users/{id}`
- **Change Password:** Enable teachers to update their login credentials.
  - **API:** `PUT /users/password/{id}`
- **Logout:** Securely log out from the system.
  - **API:** `DELETE /logout`
