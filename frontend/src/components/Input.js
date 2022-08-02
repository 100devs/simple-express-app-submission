export default function Input(props) {
  return (
    <div className='flex flex-col'>
      <label htmlFor={props.name} className='pl-2 self-start text-xl'>
        {props.label}
      </label>
      <input
        className='px-3 py-2 border-2 border-indigo-100 rounded-full focus:outline-indigo-800 text-xl'
        onChange={props.handleChange}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        type={props.type}
      />
    </div>
  );
}
