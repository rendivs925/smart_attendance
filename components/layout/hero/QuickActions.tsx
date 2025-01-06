import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth/useAuth";

const QuickActions: React.FC = () => {
  const { role, redirectToPath } = useAuth();

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {role === "student" && (
          <>
            <Button
              size="lg"
              onClick={() => redirectToPath("/student/classes")}
            >
              View Classes
            </Button>
            <Button
              size="lg"
              onClick={() => redirectToPath("/student/attendance-history")}
            >
              Check Attendance History
            </Button>
          </>
        )}
        {role === "teacher" && (
          <>
            <Button
              size="lg"
              onClick={() => redirectToPath("/teacher/mark-attendance")}
            >
              Mark Attendance
            </Button>
            <Button
              size="lg"
              onClick={() => redirectToPath("/teacher/class-reports")}
            >
              View Class Reports
            </Button>
          </>
        )}
        {role === "admin" && (
          <>
            <Button
              size="lg"
              onClick={() => redirectToPath("/admin/manage-users")}
            >
              Manage Users
            </Button>
            <Button
              size="lg"
              onClick={() => redirectToPath("/admin/attendance-data")}
            >
              View Attendance Data
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default QuickActions;
