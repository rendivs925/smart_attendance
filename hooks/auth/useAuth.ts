import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStorage, removeLocalStorage } from "@/utils/storage";
import { LOCAL_STORAGE_USER_KEY } from "@/constants";
import { RootStateType } from "@/redux/store";
import { setLoginState, logout } from "@/redux/slices/authSlice";
import { RoleType, IAuthState } from "@/types";

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
        isLoggedIn: true,
        role: user.role,
        _id: user._id,
        username: user.username,
        email: user.email,
      }
    : {
        isLoggedIn: false,
        role: null,
        _id: null,
        username: null,
        email: null,
      };

  dispatch(setLoginState(userState));
};

export const useAuth = (): IUseAuthReturn => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isLoggedIn, role, _id, username, email } = useSelector(
    (state: RootStateType) => state.auth,
  );

  useEffect(() => {
    const user = getLocalStorage(LOCAL_STORAGE_USER_KEY) as IAuthState;
    updateAuthState(dispatch, user);
  }, [dispatch]);

  const handleLogin = () => {
    router.push("/auth/login");
  };

  const handleLogout = () => {
    dispatch(logout());
    removeLocalStorage(LOCAL_STORAGE_USER_KEY);
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
    _id,
    username,
    email,
    handleLogin,
    handleLogout,
    redirectToDashboard,
    redirectToPath,
  };
};
