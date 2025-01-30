import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"; // Import axios
import { getLocalStorage, removeLocalStorage } from "@/utils/storage";
import { LOCAL_STORAGE_USER_KEY } from "@/constants";
import { RootStateType } from "@/redux/store";
import { setLoginState, logout } from "@/redux/slices/authSlice";
import { IAuthState, RoleType } from "@/types";

interface IUseAuthReturn {
  isLoggedIn: boolean;
  role: RoleType | null;
  _id: string | null;
  username: string | null;
  email: string | null;
  handleLogin: () => void;
  handleLogout: () => void;
  redirectToDashboard: () => void;
  redirectToPath: (path: string) => void;
}

const updateAuthState = (dispatch: any, user: IAuthState | null) => {
  const userState = user
    ? {
        role: user.role ?? null,
        _id: user._id ?? null,
        username: user.username ?? null,
        email: user.email ?? null,
        phone: user.phone ?? null,
        nim: user.nim ?? null,
        nidn: user.nidn ?? null,
        createdAt: user.createdAt ?? null,
        updatedAt: user.updatedAt ?? null,
      }
    : {
        role: null,
        _id: null,
        username: null,
        email: null,
        phone: null,
        nim: null,
        nidn: null,
        createdAt: null,
        updatedAt: null,
      };

  dispatch(setLoginState(userState));
};

export const useAuth = (): IUseAuthReturn => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { role, _id, username, email } = useSelector(
    (state: RootStateType) => state.auth,
  );

  const isLoggedIn = Boolean(_id);

  useEffect(() => {
    const user = getLocalStorage(LOCAL_STORAGE_USER_KEY) as IAuthState;
    updateAuthState(dispatch, user);
  }, [dispatch]);

  const handleLogin = () => {
    router.push("/auth/login");
  };

  const handleLogout = async () => {
    try {
      await axios.delete("http://localhost:8000/logout");

      dispatch(logout());
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const redirectToDashboard = () => {
    console.log("role:", role);
    if (!role) {
      console.error("No role defined for user!");
      return;
    }

    const paths: Record<string, string> = {
      student: "/student/dashboard",
      teacher: "/teacher/dashboard",
      admin: "/admin/dashboard",
    };

    router.push(paths[role.toLowerCase()] || "/");
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
    _id,
    username,
    email,
    handleLogin,
    handleLogout,
    redirectToDashboard,
    redirectToPath,
  };
};
