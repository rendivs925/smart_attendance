import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth/useAuth";

const HeroButton: React.FC = () => {
  const { isLoggedIn, handleLogin, handleLogout, redirectToDashboard } =
    useAuth();

  return (
    <div className="flex items-start sm:flex-row gap-4">
      {isLoggedIn ? (
        <>
          <Button size="lg" className="w-fit" onClick={redirectToDashboard}>
            Go to Dashboard
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-primary w-fit"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </>
      ) : (
        <Button size="lg" className="w-fit" onClick={handleLogin}>
          Login
        </Button>
      )}
    </div>
  );
};

export default HeroButton;
