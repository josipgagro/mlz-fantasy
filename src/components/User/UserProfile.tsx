import { ChangeEvent, useEffect, useRef, useState } from "react";
import { setLoading } from "../../store/slices/loadingSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import firebase from "../../firebaseConf";
import Button from "../Global/Button";
import Heading from "../Global/Heading";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { updateAvatar } from "../../store/slices/userSlice";

export default function UserProfile(): JSX.Element {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

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
            const photoURL = await getDownloadURL(
              ref(firebase.imagesRef, user?.uid)
            );

            dispatch(updateAvatar(photoURL));

            if (firebase.user) {
              await updateProfile(firebase.user, { photoURL });
            }
          } catch (error) {
            console.log(error);
          } finally {
            dispatch(setLoading(false));
          }
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <section>
      <Heading>User profile</Heading>
      {user?.photoURL && <img src={user.photoURL} alt="avatar" />}
      <p>{user?.displayName}</p>
      <form>
        <Button variant="primary" onClick={changeImg} type="button">
          Izaberi sliku
        </Button>
        <input
          type="file"
          name="file-input"
          id="file-input"
          ref={fileRef}
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </form>
    </section>
  );
}
