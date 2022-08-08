const Timer = (props) => {
  // return(
  //   <div className="timer">
  //     <span className="digits">
  //       {("0" + Math.floor((props.time/60000) % 60)).slice(-2)}:
  //     </span>
  //     <span className="digits">
  //       {("0" =Math.floor((props.time/1000) % 60)).slice(-2)}.
  //     </span>
  //     <span className="digits mili-sec">
  //       {("0" + ((props.time / 10) % 10)).slice(-2)}
  //     </span>
  //   </div>
  // );
  return (
    <div className="timer">
      <span className="digits">
        {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
      </span>
      <span className="digits">
        {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}.
      </span>
      <span className="digits mili-sec">
        {("0" + ((props.time / 10) % 100)).slice(-2)}
      </span>
    </div>
  );
}

export default Timer