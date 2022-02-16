import { useState, FormEvent, MouseEventHandler } from "react";
import { supabase } from "../../supabaseClient";
import Input from "../Form/Input";
import Error from "../Form/FormError";
import { usePasswordInput } from "../Form/Effects/usePasswordInput";
import { useEmailInput } from "../Form/Effects/useEmailInput";
import { FormServerError } from "../../Constants";
import { useAppDispatch } from "../../store/store";
import { setLoading } from "../../store/slices/loadingSlice";
import Button from "../Global/Button";
import { setUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import Heading from "../Global/Heading";

const Login = ({
  showPasswordReset,
}: {
  showPasswordReset: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      const isEmailEmpty = requiredEmailValidationCallback();
      const isPasswordEmpty = requiredPasswordValidationCallback();

      if (isEmailEmpty && isPasswordEmpty) {
        dispatch(setLoading(true));
        const { user, error } = await supabase.auth.signIn({
          email,
          password,
        });

        if (user) {
          dispatch(setUser(user));
          navigate("/");
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
    <article className="h-full p-8 flex flex-col justify-between">
      <Heading className="border-b-2 border-beta-300">Login</Heading>
      <div>
        {error.title && error.message && <Error error={error} />}
        <form onSubmit={handleSubmit} autoComplete="off">
          <Input
            label="Email"
            className="mb-5"
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
            label="Password"
            type="password"
            value={password}
            name="password"
            id="password"
            validationMsg={passwordValidationMessage}
            ref={passwordRef}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className="mb-5"
            variant={"link"}
            type="button"
            onClick={showPasswordReset}
          >
            Forgot password?
          </Button>
          <div>
            <Button variant="secondary">Login</Button>
          </div>
        </form>
      </div>
    </article>
  );
};

export default Login;
