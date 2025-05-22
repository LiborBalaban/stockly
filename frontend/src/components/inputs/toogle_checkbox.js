import '../../App.css';
const ToggleCheckbox = ({ checked, onToggle }) => {
  return (
    <div className="toggle-container">
      <label className="toggle-label">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onToggle(e.target.checked)}
        />
        Očekávané naskladnění
      </label>
    </div>
  );
};

export default ToggleCheckbox;