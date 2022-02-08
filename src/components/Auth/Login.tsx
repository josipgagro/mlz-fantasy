import { useState, FormEvent, useRef, MouseEventHandler } from "react";
import { supabase } from "../../supabaseClient";
import Input from "../Form/Input";
import Error from "../Form/FormError";
import { usePasswordInput } from "../Form/Effects/usePasswordInput";
import { useEmailInput } from "../Form/Effects/useEmailInput";
import { FormServerError } from "../Form/Constants";
import { useAppDispatch } from "../../store/store";
import { setLoading } from "../../store/slices/loadingSlice";
import Button from "../Global/Button";
import { setUser } from "../../store/slices/userSlice";

const Login = ({
  showPasswordReset,
}: {
  showPasswordReset: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();

  const {
    value: email,
    setValue: setEmail,
    validationMessage: emailValidationMessage,
    inputRef: emailRef,
    requiredValidationCallback: requiredEmailValidationCallback,
  } = useEmailInput();

  const {
    value: password,
    setValue: setPassword,
    validationMessage: passwordValidationMessage,
    inputRef: passwordRef,
    requiredValidationCallback: requiredPasswordValidationCallback,
  } = usePasswordInput();

  const [error, setError] = useState<FormServerError>({
    title: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const form = formRef.current;

      const isEmailEmpty = requiredEmailValidationCallback();
      const isPasswordEmpty = requiredPasswordValidationCallback();

      if (
        isEmailEmpty &&
        isPasswordEmpty &&
        !form?.querySelector(".border-red-700")
      ) {
        dispatch(setLoading(true));
        const { user, error } = await supabase.auth.signIn({
          email,
          password,
        });

        if (user) {
          dispatch(setUser(user));
        }

        if (error) {
          setError({
            title: "Someting went wrong!",
            message: "You entered wrong data.",
          });
        }
      }
    } catch (error) {
      setError({
        title: "Someting went wrong!",
        message: "Please try again later.",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <article className="bg-slate-800 text-gray-50">
      <h1>Login</h1>
      {error.title && error.message && <Error error={error} />}
      <form onSubmit={handleSubmit} ref={formRef} autoComplete="off">
        <Input
          label="Email"
          type="text"
          name="email"
          id="email"
          validationMsg={emailValidationMessage}
          value={email}
          required={true}
          ref={emailRef}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Lozinka"
          type="password"
          value={password}
          name="password"
          id="password"
          validationMsg={passwordValidationMessage}
          ref={passwordRef}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={showPasswordReset} btnStyle={"link"}>
          Forgot password?
        </Button>
        <div>
          <Button disabled={email.length === 0 || password.length === 0}>
            Login
          </Button>
        </div>
      </form>
    </article>
  );
};

export default Login;
