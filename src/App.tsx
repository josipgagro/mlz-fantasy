import Auth from "./components/Auth/Auth";
import { Loading } from "./components/Global/Loading";
import { useAppSelector } from "./store/store";

function App() {
  const isLoading = useAppSelector((state) => state.loading.isLoading);

  return (
    <div className="App relative">
      {isLoading && <Loading />}
      <Auth />
    </div>
  );
}

export default App;
