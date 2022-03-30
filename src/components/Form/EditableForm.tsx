import { HTMLProps, useEffect, useState } from "react";
import { FormServerError } from "../../Constants";
import PenIcon from "../Global/Icons/PenIcon";
import FormError from "./FormError";

interface IEditableForm extends HTMLProps<HTMLFormElement> {
  error?: {
    formError: FormServerError;
    setFormError: ({
      title,
      message,
    }: {
      title: string;
      message: string;
    }) => void;
  };
  dataToEdit: { label: string; value: string }[];
}

export default function EditableForm(props: IEditableForm) {
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setIsEdit(false);
  }, [props.dataToEdit]);

  const toggleEdit = (): void => {
    setIsEdit(!isEdit);

    const { error } = props;
    if (error && error.formError.title.length > 0) {
      error.setFormError({
        title: "",
        message: "",
      });
    }
  };

  return (
    <>
      {props.error?.formError.message && props.error?.formError.title && (
        <FormError error={props.error.formError}></FormError>
      )}
      <div className="w-full flex justify-end border-b-2 border-gray-200 mb-5">
        <button onClick={toggleEdit} title="Edit">
          <PenIcon className="fill-gray-400 w-4 h-4 mb-2 hover:fill-omega-300 hover:cursor-pointer transition-colors" />
        </button>
      </div>
      {isEdit && <form onSubmit={props.onSubmit}>{props.children}</form>}
      {!isEdit && (
        <ul>
          {props.dataToEdit.map((child) => {
            const { value, label } = child;
            return value?.length > 0 ? (
              <li className="mb-5 flex justify-between items-baseline">
                <p className="mb-1">{label}:</p>
                <strong>{value}</strong>
              </li>
            ) : null;
          })}
        </ul>
      )}
    </>
  );
}
