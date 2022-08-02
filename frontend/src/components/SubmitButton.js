export default function SubmitButton(props) {
  return (
    <button
      type='submit'
      className={`${props.className} text-xl font-bold my-4 px-4 py-2 rounded-full bg-yellow-300 shadow-sm`}
    >
      {props.title}
    </button>
  );
}
