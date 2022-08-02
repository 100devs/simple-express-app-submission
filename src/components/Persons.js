import { FaTrashAlt} from 'react-icons/fa'

const PhoneBook = ({name, number, removeOne}) => {
  return (
    <>
      <p>Name: {name} | Number: {number} <button onClick={removeOne}><FaTrashAlt/></button></p>
    </>
  )
}

export default PhoneBook