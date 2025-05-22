import '../../App.css';
const File = ({name, onChange, onClick, style}) => {
  return (
        <input type='file' className={style} name={name} onChange={(e) => onChange(e.target.files)} multiple onClick={onClick}/>
  );
}
export default File;