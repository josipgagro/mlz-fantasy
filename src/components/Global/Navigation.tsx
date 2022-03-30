import { Link, useLocation, useNavigate } from "react-router-dom";
import { setLoading } from "../../store/slices/loadingSlice";
import { setUser } from "../../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import firebase from "./../../firebaseConf";
import { signOut } from "firebase/auth";
import BarsIcon from "./Icons/BarsIcon";
import { useEffect, useState } from "react";

const itemSyle = "border-beta-200 lg:ml-5 lg:border-none";
const linkStyle = "py-4 pl-4 md:pl-12 lg:p-0";

export default function Navigation(): JSX.Element | null {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (isActive) {
      setIsActive(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleLogout = async (): Promise<void> => {
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

  const toggleActive = (): void => {
    setIsActive(!isActive);
  };

  const navigation =
    location.pathname !== "/auth" ? (
      <nav className="py-4 px-4 md:px-12 lg:px-20 md:mx-3 lg:w-5/6 min-h-full lg:mx-auto bg-alfa-200 text-white flex justify-end relative">
        {!user && <Link to="/auth">Login</Link>}
        {user && (
          <ul className="lg:flex">
            <li>
              <button
                onClick={toggleActive}
                className="p-1 border-2 border-white rounded-md lg:hidden"
              >
                <BarsIcon className=" fill-white" />
              </button>
            </li>
            <li
              className={`absolute ${
                isActive ? "top-full" : "top-[-1000px]"
              } left-0 right-0 z-10 lg:relative lg:top-0`}
            >
              <ul className="w-full bg-alfa-300 lg:flex border-t-2 border-beta-200 lg:bg-transparent lg:border-none">
                <li className="border-b border-beta-200 lg:border-none">
                  <Link to="/" className={`block ${linkStyle}`}>
                    Home
                  </Link>
                </li>
                <li className={`border-b ${itemSyle}`}>
                  <Link to="/user-profile" className={`block ${linkStyle}`}>
                    User
                  </Link>
                </li>
                <li className={`border-b-2 ${itemSyle}`}>
                  <button
                    onClick={handleLogout}
                    type="button"
                    className={`${linkStyle} w-full text-left`}
                  >
                    Log out
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        )}
      </nav>
    ) : null;

  return navigation;
}
