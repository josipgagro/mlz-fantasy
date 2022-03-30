import { Link, useLocation, useNavigate } from "react-router-dom";
import { setLoading } from "../../store/slices/loadingSlice";
import { setUser } from "../../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import firebase from "./../../firebaseConf";
import { signOut } from "firebase/auth";

export default function Navigation(): JSX.Element | null {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = async () => {
    dispatch(setLoading(true));
    try {
      await signOut(firebase.auth);
      dispatch(setUser(null));
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const navigation =
    location.pathname !== "/auth" ? (
      <nav className="py-4 px-20 md:mx-3 lg:w-5/6 min-h-full lg:mx-auto bg-alfa-200 text-white flex justify-end">
        {!user && <Link to="/auth">Login</Link>}
        {user && (
          <>
            <Link to="/">Home</Link>
            <Link to="/user-profile" className="ml-5">
              User
            </Link>
            <button onClick={handleClick} type="button" className="ml-5">
              Log out
            </button>
          </>
        )}
      </nav>
    ) : null;

  return navigation;
}
