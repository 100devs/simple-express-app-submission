export default function ClickButton(props) {
  return (
    <button
      className={`${props.className} text-xl font-bold my-4 px-4 py-2 rounded-full bg-yellow-300 shadow-sm`}
      onClick={props.handleClick}
    >
      {props.title}
    </button>
  );
}
