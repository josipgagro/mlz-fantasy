import { FormServerError } from "../../Constants";
import Heading from "../Global/Heading";

interface IError {
  error: FormServerError;
}

export default function Error({ error: { title, message } }: IError) {
  return (
    <div className="mb-5">
      <Heading variant="small" className="!text-red-700">
        {title}
      </Heading>
      <p className="text-red-700">{message}</p>
    </div>
  );
}
