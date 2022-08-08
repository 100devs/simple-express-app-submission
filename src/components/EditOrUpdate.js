import { FaEdit } from "react-icons/fa"

const EditOrUpdate = ( {id, onUpdate} ) => {
  return (
    <div>
      <FaEdit
        style={{ color: "grey", cursor: "pointer"}} onClick={() => onUpdate(id)}
      ></FaEdit>
    </div>
  )
}

export default EditOrUpdate