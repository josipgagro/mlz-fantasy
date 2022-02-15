import { useState } from "react";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Registration from "./Registration";
import Button from "../Global/Button";

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
    <section className="h-screen flex flex-col justify-center items-center bg-background">
      <div className="h-4/6 w-7/12 flex rounded-xl bg-white drop-shadow-2xl">
        <div className="flex-auto w-2/4">
          {navCases.login === navigationCase && (
            <Login showPasswordReset={showPasswordReset} />
          )}
          {navCases.registration === navigationCase && <Registration />}
          {navCases.passwordReset === navigationCase && <ForgotPassword />}
        </div>
        <div className="rounded-xl bg-alfa-200 flex-auto w-2/4">
          <Button
            variant="secondary"
            onClick={() =>
              navigationCase === navCases.login
                ? setNavigationCase(navCases.registration)
                : setNavigationCase(navCases.login)
            }
          >
            Change nav
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Auth;
