import { useAppSelector } from "../../store/store";
import Heading from "../Global/Heading";

export default function UserProfile(): JSX.Element {
  const user = useAppSelector((state) => state.user.user);

  return (
    <section>
      <Heading>User profile</Heading>
      <p>{user?.email}</p>
    </section>
  );
}
