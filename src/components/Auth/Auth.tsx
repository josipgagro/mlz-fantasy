import { useState } from "react";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Registration from "./Registration";

enum navCases {
  login = 1,
  registration,
  passwordReset,
}

const Auth = (): JSX.Element => {
  const [navigationCase, setNavigationCase] = useState<number>(1);

  const showPasswordReset = (): void => {
    setNavigationCase(3);
  };

  return (
    <section>
      {navCases.login === navigationCase && (
        <Login showPasswordReset={showPasswordReset} />
      )}
      {navCases.registration === navigationCase && <Registration />}
      {navCases.passwordReset === navigationCase && <ForgotPassword />}
      <button
        onClick={() =>
          navigationCase === navCases.login
            ? setNavigationCase(navCases.registration)
            : setNavigationCase(navCases.login)
        }
      >
        Change nav
      </button>
    </section>
  );
};

export default Auth;
