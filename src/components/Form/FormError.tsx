export default function Error({
  error: { title, message },
}: {
  error: {
    title: string;
    message: string;
  };
}) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}
