import { FormEvent, MouseEventHandler, useState } from "react";
import { supabase } from "../../supabaseClient";
import { FormServerError } from "../../Constants";
import { useEmailInput } from "../Form/Effects/useEmailInput";
import Input from "../Form/Input";
import Button from "../Global/Button";
import Error from "../Form/FormError";
import Heading from "../Global/Heading";
import { useAppDispatch } from "../../store/store";
import { setLoading } from "../../store/slices/loadingSlice";

export default function ForgotPassword({
  showLogin,
}: {
  showLogin: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element {
  const {
    value: email,
    setValue: setEmail,
    validationMessage: emailValidationMessage,
    inputRef: emailRef,
    requiredValidationCallback: requiredEmailValidationCallback,
  } = useEmailInput();
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [error, setError] = useState<FormServerError>({
    title: "",
    message: "",
  });
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const isEmailValid = requiredEmailValidationCallback();

    if (isEmailValid) {
      try {
        dispatch(setLoading(true));
        const { data, error } = await supabase.auth.api.resetPasswordForEmail(
          email
        );

        if (data) {
          setStatusMessage("Request for password message has been sent.");
        }

        if (error) {
          setError({
            title: "Someting went wrong!",
            message: "Please try again later.",
          });
        }
      } catch (error) {
        console.error(error);
        setError({
          title: "Someting went wrong!",
          message: "Please try again later.",
        });
      } finally {
        setEmail("");
        dispatch(setLoading(false));
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full p-5 md:p-8 flex flex-col justify-between"
    >
      <Heading className="mt-2 md:mt-0">Reset password</Heading>
      <div>
        {error.title && error.message && <Error error={error} />}
        <p>{statusMessage}</p>
        <Input
          label="Email"
          className="mb-5"
          value={email}
          id="forget-pw-email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          validationMsg={emailValidationMessage}
          ref={emailRef}
        />
        <div>
          <Button variant="secondary" className="mb-3 md:mb-0">
            Reset password
          </Button>
          <Button variant="ternary" className="md:hidden" onClick={showLogin}>
            Go to Login
          </Button>
        </div>
      </div>
    </form>
  );
}
