import { FormEvent, useRef, useState } from "react";
import { supabase } from "../../supabaseClient";
import Input from "../Form/Input";
import Error from "../Form/FormError";
import { usePasswordInput } from "../Form/Effects/usePasswordInput";
import { useEmailInput } from "../Form/Effects/useEmailInput";
import { useRequiredInput } from "../Form/Effects/useRequiredInput";
import { FormServerError } from "../Form/Constants";
import Button from "../Global/Button";
import { useAppDispatch } from "../../store/store";
import { setLoading } from "../../store/slices/loadingSlice";

const Registration = (): JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null);
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
    requiredValidationCallback: passwordConfRequiredValidationCallback,
  } = usePasswordInput(8, password);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;

    const isUsernameEmpty: boolean = usernameValidationCallback();
    const isEmailEmpty: boolean = requiredEmailValidationCallback();
    const isPasswordEmpty: boolean = requiredPasswordValidationCallback();
    const isPasswordConfEmpty: boolean =
      passwordConfRequiredValidationCallback();

    try {
      if (
        !isUsernameEmpty &&
        !isEmailEmpty &&
        !isPasswordEmpty &&
        !isPasswordConfEmpty &&
        !form?.querySelector(".border-red-700")
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
          console.log(user);
        }

        if (error) {
          console.log(error);
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
    <article className="bg-amber-400">
      <h1>Registracija</h1>
      {error.title && error.message && <Error error={error} />}
      <form onSubmit={handleSubmit} ref={formRef} autoComplete="off">
        <Input
          label="Korisnicko ime"
          value={username}
          id="username"
          name="username"
          ref={usernameRef}
          validationMsg={usernameValidationMsg}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label="Email"
          value={email}
          id="registration-email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          validationMsg={emailValidationMessage}
          ref={emailRef}
        />
        <Input
          label="Lozinka"
          value={password}
          id="registration-password"
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          validationMsg={passwordValidationMessage}
          ref={passwordRef}
        />
        <Input
          label="Potvrdi lozinku"
          value={passwordConfirmation}
          id="password-confirmation"
          name="passwordConfirmation"
          type="password"
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          validationMsg={passwordConfirmationValidationMessage}
          ref={passwordConfirmationRef}
        />
        <Button>Register</Button>
      </form>
    </article>
  );
};

export default Registration;
