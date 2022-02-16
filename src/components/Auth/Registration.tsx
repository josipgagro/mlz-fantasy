import { FormEvent, useState } from "react";
import { supabase } from "../../supabaseClient";
import Input from "../Form/Input";
import Error from "../Form/FormError";
import { usePasswordInput } from "../Form/Effects/usePasswordInput";
import { useEmailInput } from "../Form/Effects/useEmailInput";
import { useRequiredInput } from "../Form/Effects/useRequiredInput";
import { FormServerError } from "../../Constants";
import Button from "../Global/Button";
import { useAppDispatch } from "../../store/store";
import { setLoading } from "../../store/slices/loadingSlice";
import { setUser } from "../../store/slices/userSlice";
import Heading from "../Global/Heading";

const Registration = (): JSX.Element => {
  const [error, setError] = useState<FormServerError>({
    title: "",
    message: "",
  });
  const dispatch = useAppDispatch();

  const {
    value: username,
    setValue: setUsername,
    validationMessage: usernameValidationMsg,
    inputRef: usernameRef,
    requiredValidationCallback: usernameValidationCallback,
  } = useRequiredInput();

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

  const {
    value: passwordConfirmation,
    setValue: setPasswordConfirmation,
    validationMessage: passwordConfirmationValidationMessage,
    inputRef: passwordConfirmationRef,
    samePasswordValidationCallback: passwordConfValidationCallback,
  } = usePasswordInput(8, password);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const isUsernameEmpty: boolean = usernameValidationCallback();
    const isEmailValid: boolean = requiredEmailValidationCallback();
    const isPasswordEmpty: boolean = requiredPasswordValidationCallback();
    const isPasswordConfValid: boolean = passwordConfValidationCallback();

    try {
      if (
        !isUsernameEmpty &&
        isEmailValid &&
        !isPasswordEmpty &&
        isPasswordConfValid
      ) {
        dispatch(setLoading(true));
        const { user, error } = await supabase.auth.signUp(
          {
            email,
            password,
          },
          {
            data: {
              username,
            },
          }
        );

        if (user) {
          dispatch(setUser(user));
        }

        if (error) {
          setError({
            title: "Someting went wrong!",
            message: "Please try again later.",
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
  }

  return (
    <article className="h-full p-8 flex flex-col justify-between">
      <Heading>Registration</Heading>
      <div>
        {error.title && error.message && <Error error={error} />}
        <form onSubmit={handleSubmit} autoComplete="off">
          <Input
            className="mb-5"
            label="Username"
            value={username}
            id="username"
            name="username"
            ref={usernameRef}
            validationMsg={usernameValidationMsg}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            label="Email"
            className="mb-5"
            value={email}
            id="registration-email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            validationMsg={emailValidationMessage}
            ref={emailRef}
          />
          <Input
            label="Password"
            className="mb-5"
            value={password}
            id="registration-password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            validationMsg={passwordValidationMessage}
            ref={passwordRef}
          />
          <Input
            label="Repeat password"
            className="mb-3"
            value={passwordConfirmation}
            id="password-confirmation"
            name="passwordConfirmation"
            type="password"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            validationMsg={passwordConfirmationValidationMessage}
            ref={passwordConfirmationRef}
          />
          <Button className="mt-5" variant="secondary">
            Register
          </Button>
        </form>
      </div>
    </article>
  );
};

export default Registration;
