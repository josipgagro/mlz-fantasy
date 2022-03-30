import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { setLoading } from "../../store/slices/loadingSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import firebase from "../../firebaseConf";
import Heading from "../Global/Heading";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updatePassword, updateProfile, User } from "firebase/auth";
import { updateAvatar, updateUsername } from "../../store/slices/userSlice";
import CameraIcon from "../Global/Icons/CameraIcon";
import Input from "../Form/Input";
import { usePasswordInput } from "../Form/Effects/usePasswordInput";
import Button from "../Global/Button";
import Container from "../Global/Container";
import EditableForm from "../Form/EditableForm";

export default function UserProfile(): JSX.Element {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [username, setUsername] = useState<string>(user?.displayName || "");
  const [formError, setFormError] = useState({ title: "", message: "" });
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

  const userData = useMemo(() => {
    return [
      { label: "Username", value: user?.displayName || "" },
      { label: "Email", value: user?.email || "" },
    ];
  }, [user?.displayName, user?.email]);

  const changeImg = (): void => {
    fileRef.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  useEffect(() => {
    (async () => {
      if (file !== null) {
        if (
          file.type === "image/png" ||
          file.type === "image/jpg" ||
          file.type === `image/jpeg`
        ) {
          try {
            dispatch(setLoading(true));
            const userRef = ref(firebase.imagesRef, user?.uid);
            await uploadBytes(userRef, file);
            const photoURL = await getDownloadURL(userRef);

            dispatch(updateAvatar(photoURL));

            if (firebase.auth.currentUser) {
              await updateProfile(firebase.auth.currentUser, {
                photoURL,
              });
            }
          } catch (error) {
            console.error(error);
          } finally {
            dispatch(setLoading(false));
          }
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const handleProfileDataChange = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      if (username.length > 0 && username !== user?.displayName) {
        dispatch(setLoading(true));
        await updateProfile(firebase.auth.currentUser as User, {
          displayName: username,
        });

        dispatch(updateUsername(username));
      }

      if (password.length > 0 && passwordConfirmation.length > 0) {
        const isPasswordLegit = requiredPasswordValidationCallback();
        const isPasswordConfLegit = passwordConfValidationCallback();

        if (isPasswordLegit && isPasswordConfLegit) {
          dispatch(setLoading(true));
          await updatePassword(firebase.auth.currentUser as User, password);
          setPassword("");
          setPasswordConfirmation("");
        }
      }
    } catch (error) {
      console.error(error);
      setFormError({
        title: "Someting went wrong!",
        message: "Please try again later.",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Container>
      <Heading className="text-center md:text-left">Profile</Heading>
      <div className="flex justify-between flex-col md:flex-row h-">
        <div className="md:mr-20">
          <div className="mb-5 mx-auto md:mx-0 w-48 h-48 relative before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:bg-slate-400 before:rounded-[4.5rem]">
            {user?.photoURL && (
              <>
                <img
                  src={user.photoURL}
                  alt="avatar"
                  className="rounded-[4.5rem] w-full h-full relative shadow-lg "
                />
                <button
                  onClick={changeImg}
                  type="button"
                  className="bg-omega-100 rounded-full p-[0.37rem] fill-gray-800 absolute right-2 bottom-2 hover:bg-omega-200 transition-colors duration-200 "
                >
                  <CameraIcon className="!w-4 !h-4" />
                </button>
                <form className="hidden">
                  <input
                    type="file"
                    name="file-input"
                    id="file-input"
                    ref={fileRef}
                    onChange={handleChange}
                  />
                </form>
              </>
            )}
          </div>
        </div>
        <div className="flex-1">
          <EditableForm
            onSubmit={handleProfileDataChange}
            dataToEdit={userData}
            error={{ formError, setFormError }}
          >
            <Input
              value={username}
              className="mb-5"
              onChange={(e) => setUsername(e.target.value)}
              label="Username"
            />
            <Input
              value={user?.email ? user.email : ""}
              className="mb-5"
              label="Email"
              onChange={(e) => e.preventDefault()}
              disabled
            />
            <Input
              value={password}
              className="mb-5"
              label="New password"
              ref={passwordRef}
              type="password"
              validationMsg={passwordValidationMessage}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              value={passwordConfirmation}
              className="mb-5"
              label="Confrim password"
              ref={passwordConfirmationRef}
              type="password"
              validationMsg={passwordConfirmationValidationMessage}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <div className="flex items-center justify-end">
              <Button
                variant="secondary"
                className="inline-block ml-auto"
                type="submit"
              >
                Update
              </Button>
            </div>
          </EditableForm>
        </div>
      </div>
    </Container>
  );
}
