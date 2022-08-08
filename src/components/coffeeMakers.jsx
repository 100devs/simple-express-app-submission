
const CoffeeMakers = ({ coffeeMakers }) => {
  return(
    <>
      {coffeeMakers.map((maker) => (
        <li>{maker['Name']}</li>
      ))}
    </>
  );
}

export default CoffeeMakers
