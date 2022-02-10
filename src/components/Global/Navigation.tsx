import { Link } from "react-router-dom";

export default function Navigation(): JSX.Element {
  return (
    <nav>
      <Link to="/auth">Login</Link>
    </nav>
  );
}
