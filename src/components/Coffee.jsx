import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Slider from "./Slider";
import StopWatch from "./StopWatch";
import Form from "./Form";
import { useAuth } from "../contexts/AuthContext"
// import Nav from "./Nav";
// import Selection from "./Selection";

const Coffee = ({maker}) => {
  const [name, setName] = useState('');
  const [max, setMax] = useState('');
  const [min, setMin] = useState('');
  const [rec, setRec] = useState('');
  const [recWater, setRecWater] = useState('');
  const [ratio, setRatio] = useState(1/14);
  const [value, setValue] = useState('');
  const [time, setTime] = useState('0');
  // const {currentUser} = useAuth()

  useEffect(() => {
    const fetchApi = async () => {
      const res = await fetch(
        `http://localhost:3001/api/${sessionStorage.getItem("selection")}`
      );
      
      // const res = await fetch(
      //   `http://localhost:3001/api/${maker}}`
      // );
      const data = await res.json();
      console.log(data);
      setName(data['Name'])
      setMax(data['Maximum Coffee (g)']);
      setMin(data['Minimum Coffee (g)']);
      setRec(data['Recommended Coffee (g)']);   
      
    };

    fetchApi();
  }, []);

  useEffect(() => {
    setValue(rec)
  }, [rec])


  useEffect(() => {
    setRecWater(1/ratio*value)
  }, [value,ratio])

  // const getSliderValue = (value) => {
  //   setValue(value)
  // }

  const getSliderValue = (value) => {
    setValue(value)
  }

  const getTime = (value) => {
    setTime(value)
  }


  return (
    <div>
      {/* <Nav /> */}
      <h4>{name}</h4>
      {/* <h2>{JSON.stringify(currentUser.uid)}</h2> */}
      <select>
        <option onClick={() => setRatio(1/14)} value="1/14">1/14 ml</option>
        <option onClick={() => setRatio(1/15)} value="1/14">1/15 ml</option>
        <option onClick={() => setRatio(1/16)} value="1/14">1/16 ml</option>
        <option onClick={() => setRatio(1/17)} value="1/14">1/17 ml</option>
      </select>
      <Slider max={max} min={min} rec={rec} getSliderValue={(value) => getSliderValue(value)}/>
      <h6>{recWater}</h6>
      <StopWatch getTime={(value) => getTime(value)}/>
      <Form slider={value} ratio={ratio} recWater={recWater} time={time}/>
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default Coffee;
