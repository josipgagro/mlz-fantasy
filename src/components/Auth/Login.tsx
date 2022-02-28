import { useState, FormEvent, MouseEventHandler } from "react";
import firebase from "../../firebaseConf";
import { signInWithEmailAndPassword } from "firebase/auth";
import Input from "../Form/Input";
import Error from "../Form/FormError";
import { usePasswordInput } from "../Form/Effects/usePasswordInput";
import { useEmailInput } from "../Form/Effects/useEmailInput";
import { FormServerError } from "../../Constants";
import { useAppDispatch } from "../../store/store";
import { setLoading } from "../../store/slices/loadingSlice";
import Button from "../Global/Button";
import { setUser } from "../../store/slices/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Heading from "../Global/Heading";
import { getDownloadURL, ref } from "firebase/storage";

const Login = ({
  showPasswordReset,
  showRegistration,
}: {
  showPasswordReset: MouseEventHandler<HTMLButtonElement>;
  showRegistration: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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
      const isEmailValid = requiredEmailValidationCallback();
      const isPasswordValid = requiredPasswordValidationCallback();

      if (isEmailValid && isPasswordValid) {
        dispatch(setLoading(true));
        const { user } = await signInWithEmailAndPassword(
          firebase.auth,
          email,
          password
        );

        if (user) {
          const { uid, displayName, email } = user;

          const photoURL = user.photoURL
            ? await getDownloadURL(ref(firebase.imagesRef, uid))
            : await getDownloadURL(ref(firebase.imagesRef, "300.png"));

          dispatch(setUser({ uid, displayName, email, photoURL }));

          const state = location.state as { from: Location };
          const from = state?.from?.pathname || "/";
          navigate(from, { replace: true });
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
    <article className="h-full p-5 md:p-8 flex flex-col justify-between">
      <Heading>Login</Heading>
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
            <Button variant="secondary" className="mb-3 md:mb-0">
              Login
            </Button>
            <Button
              variant="ternary"
              className="md:hidden"
              onClick={showRegistration}
            >
              Registration
            </Button>
          </div>
        </form>
      </div>
    </article>
  );
};

export default Login;
