interface IError {
  error: { title: string; message: string };
}

export default function Error({ error: { title, message } }: IError) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}
