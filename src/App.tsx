import Auth from "./components/Auth/Auth";
import { Loading } from "./components/Global/Loading";
import { useAppSelector } from "./store/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Global/Navigation";
import UserProfile from "./components/User/UserProfile";
import Home from "./components/Home/Home";
import RequireAuth from "./components/Auth/RequireAuth";

function App() {
  const isLoading = useAppSelector((state) => state.loading.isLoading);

  return (
    <div className="App relative w-screen h-screen bg-[#D2D3CD]">
      {isLoading && <Loading />}
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/user-profile"
            element={
              <RequireAuth>
                <UserProfile />
              </RequireAuth>
            }
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
