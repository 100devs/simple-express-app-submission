import ClickButton from './ClickButton';
import serverIssues from '../images/server-issues.svg';

export default function DeleteModal(props) {
  return (
    <>
      <div className='absolute inset-0 backdrop-blur'>
        <div className='flex flex-col justify-between fixed inset-y-[20%] inset-x-[5%] bg-white border-2 border-yellow-300 rounded-3xl shadow-lg p-6'>
          <img className='p-6' src={serverIssues} alt='Error Illustration' />
          <h2 className='text-3xl font-light'>
            Are you sure you want to delete this item from your database?
          </h2>
          <p className='text-xl font-semibold'>{props.itemName}</p>
          <ClickButton handleClick={props.cancelClick} title='Cancel' />
          <ClickButton handleClick={props.confirmClick} title='Confirm' />
        </div>
      </div>
    </>
  );
}
