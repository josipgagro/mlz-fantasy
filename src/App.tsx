import Auth from "./components/Auth/Auth";
import { Loading } from "./components/Global/Loading";
import { useAppSelector } from "./store/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const isLoading = useAppSelector((state) => state.loading.isLoading);

  return (
    <div className="App relative">
      {isLoading && <Loading />}
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
