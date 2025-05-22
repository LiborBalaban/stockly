import '../App.css';
const Position = ({name, quantity}) => {
  return (
   <div className='flex position'>
    <span>Pozice: {name}</span>
    <span>→</span>
    <span>Množství: {quantity}</span>
   </div>
  );
}
export default Position;