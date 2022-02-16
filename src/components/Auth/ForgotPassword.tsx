import { FormEvent, useState } from "react";
import { supabase } from "../../supabaseClient";
import { FormServerError } from "../../Constants";
import { useEmailInput } from "../Form/Effects/useEmailInput";
import Input from "../Form/Input";
import Button from "../Global/Button";
import Error from "../Form/FormError";
import Heading from "../Global/Heading";

export default function ForgotPassword(): JSX.Element {
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const isEmailValid = requiredEmailValidationCallback();

    if (isEmailValid) {
      try {
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
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full p-8 flex flex-col justify-between"
    >
      <Heading className="border-b-2 border-beta-300">Reset password</Heading>
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
        <Button variant="secondary">Reset password</Button>
      </div>
    </form>
  );
}
