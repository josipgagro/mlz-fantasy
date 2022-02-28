import { useState } from "react";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Registration from "./Registration";
import Button from "../Global/Button";

enum NAVIGATION_CASES {
  login,
  registration,
  passwordReset,
}

type navTextObj = {
  title: string;
  text: string;
  button: string;
};

const NAVIGATION_TEXT: navTextObj[] = [
  {
    title: "New here?",
    text: "Create account to use the app.",
    button: "Create account",
  },
  {
    title: "Not new?",
    text: "Go back to login in the app.",
    button: "Login",
  },
  {
    title: "Oh, you remebered?",
    text: "Go back to login in the app.",
    button: "Login",
  },
];

const Auth = (): JSX.Element => {
  const [navigationCase, setNavigationCase] = useState<number>(
    NAVIGATION_CASES.login
  );

  const showPasswordReset = (): void => {
    setNavigationCase(NAVIGATION_CASES.passwordReset);
  };

  const showRegistration = (): void => {
    setNavigationCase(NAVIGATION_CASES.registration);
  };

  const showLogin = (): void => {
    setNavigationCase(NAVIGATION_CASES.login);
  };

  const notLogin =
    NAVIGATION_CASES.registration === navigationCase ||
    NAVIGATION_CASES.passwordReset === navigationCase;

  return (
    <section className="h-screen p-2 flex flex-col justify-center items-center relative">
      <div className="w-full h-[95vh] lg:h-[700px] lg:w-[1000px] flex flex-col md:flex-row rounded-xl bg-white drop-shadow-2xl">
        <div className={`h-full md:w-2/4 ${notLogin ? "md:ml-auto" : null}`}>
          {NAVIGATION_CASES.login === navigationCase && (
            <Login
              showPasswordReset={showPasswordReset}
              showRegistration={showRegistration}
            />
          )}
          {NAVIGATION_CASES.registration === navigationCase && (
            <Registration showLogin={showLogin} />
          )}
          {NAVIGATION_CASES.passwordReset === navigationCase && (
            <ForgotPassword showLogin={showLogin} />
          )}
        </div>
        <div
          className={`hidden p-8 rounded-xl bg-alfa-200 w-2/4 absolute bottom-0 top-0 transition-[left] duration-700 text-white md:flex flex-auto flex-col justify-center items-center text-center before:absolute before:content-[''] before:top-4 before:right-4 before:left-4 before:bottom-4 before:border-2 before:rounded-xl before:block before:border-beta-300 ${
            notLogin
              ? "left-0 rounded-tr-none rounded-br-none"
              : "left-1/2 rounded-tl-none rounded-bl-none"
          }`}
        >
          <p className="text-5xl font-bold mb-5">
            {NAVIGATION_TEXT[navigationCase].title}
          </p>
          <p className="text-2xl mb-8">
            {NAVIGATION_TEXT[navigationCase].text}
          </p>
          <Button
            variant="secondary"
            type="button"
            className="w-52 mx-auto"
            onClick={
              navigationCase === NAVIGATION_CASES.login
                ? showRegistration
                : showLogin
            }
          >
            {NAVIGATION_TEXT[navigationCase].button}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Auth;
