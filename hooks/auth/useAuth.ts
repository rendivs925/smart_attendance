import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setLoginState, logout } from "@/redux/slices/authSlice";

interface UseAuthReturn {
  isLoggedIn: boolean;
  role: string | null;
  handleLogin: () => void;
  handleLogout: () => void;
  redirectToDashboard: () => void;
  redirectToPath: (path: string) => void;
}

export const useAuth = (): UseAuthReturn => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isLoggedIn, role } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (user) {
      dispatch(setLoginState({ isLoggedIn: true, role: user.role }));
    } else {
      dispatch(setLoginState({ isLoggedIn: false, role: null }));
    }
  }, [dispatch]);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    router.push("/");
  };

  const redirectToDashboard = () => {
    if (!role) {
      console.error("No role defined for user!");
      return;
    }

    const paths: Record<string, string> = {
      student: "/student/dashboard",
      teacher: "/teacher/dashboard",
      admin: "/admin/dashboard",
    };

    router.push(paths[role] || "/");
  };

  const redirectToPath = (path: string) => {
    if (!isLoggedIn) {
      console.error("User must be logged in to perform this action!");
      return;
    }
    router.push(path);
  };

  return {
    isLoggedIn,
    role,
    handleLogin,
    handleLogout,
    redirectToDashboard,
    redirectToPath,
  };
};
