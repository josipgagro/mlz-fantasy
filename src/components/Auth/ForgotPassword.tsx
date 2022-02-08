import { FormEvent, useState } from "react";
//@ts-ignore
import { supabase } from "../../supabaseClient";
import { useEmailInput } from "../Form/Effects/useEmailInput";
import Input from "../Form/Input";
import Button from "../Global/Button";

export default function ForgotPassword(): JSX.Element {
  const {
    value: email,
    setValue: setEmail,
    validationMessage: emailValidationMessage,
    inputRef: emailRef,
    requiredValidationCallback: requiredEmailValidationCallback,
  } = useEmailInput();
  const [statusMessage, setStatusMessage] = useState<string>("");

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
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setEmail("");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>{statusMessage}</p>
      <Input
        label="Email"
        value={email}
        id="forget-pw-email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        validationMsg={emailValidationMessage}
        ref={emailRef}
      />
      <Button>Reset password</Button>
    </form>
  );
}
