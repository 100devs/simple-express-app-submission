import { useEffect, useState } from "react"

const Slider = ({max, min, rec, getSliderValue}) => {
  // console.log({max})

  const [value, onChange] = useState('');
  let x = (value - min)/(max-min)*100
  let background = `linear-gradient(90deg, aquamarine ${x}%, gainsboro ${x}%)`

  useEffect(() => {
    onChange(rec);
  }, [rec])

  const onRelease = () => {
    getSliderValue(value)
  }

  return(
    <div className="slide">
      <input type="range" min={min} max={max} value={value} className="slider" style={{background: background}}
      onChange={({target: { value: radius }}) => {onChange(radius)}} onClick={() => onRelease()}/>
      <p><span className="value">{value}</span></p>
      <p><span className="min">{min}</span></p>
      <p><span className="max">{max}</span></p>
    </div>
  )
}

export default Slider