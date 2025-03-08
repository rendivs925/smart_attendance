# AttendX - Student Features

## 1. Dashboard

- **Overview:** Display a summary of the student's attendance records, upcoming classes, and important announcements.

## 2. Attendance Tracking

- **View Attendance Records:** Students can check their attendance history for all enrolled classes.
  - **API:** `GET /attendances/all`
- **Check Attendance Status:** Show attendance percentage and status (e.g., Present, Absent, Late).

## 3. Class Management

- **View Enrolled Classes:** Students can see the list of classes they are enrolled in.
  - **API:** `GET /classes/all`
- **Class Schedules:** Show upcoming class schedules and details.

## 4. Notifications & Announcements

- **Receive Important Notifications:** Get notified about class changes, attendance warnings, or important messages from teachers/admins.

## 5. Reports & Analytics

- **Personal Attendance Report:** View statistics on attendance trends and progress.
- **Download Attendance Reports:** Export attendance records for personal tracking.

## 6. Profile Management

- **View and Edit Profile:** Students can update their personal details like email, phone number, and password.
  - **API:** `PUT /users/{id}`
