export default function SectionButton(props) {
  return (
    <button
      onClick={() => props.updateSection(props.title.toLowerCase())}
      className={`grow py-2 ${
        props.currentSection === props.title.toLowerCase() ? 'menu-section' : ''
      }`}
    >
      {props.title}
    </button>
  );
}
