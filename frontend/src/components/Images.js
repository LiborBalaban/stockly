import '../App.css';
import DeleteButton from '../Images/delete.png';
import EditButton from '../Images/edit.png';
import { Link } from 'react-router-dom';
import img from '../Images/delete_x.png';
import { useUser } from '../context/UserContext';
import Button from './button';
const Image = ({url, onClick, onDelete}) => {
  const {role} = useUser();
  return (
    <div className='flex' onClick={()=>onClick(url)}>
    <img src={url}/>
    {role === 3 && (<Button label={'x'} style={'flex deleteImageButton'} onClick={onDelete}/>)}
    </div>
  );
}

export default Image;