import styles from "./styles.module.css";

type SelectProps = {
  label: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Select = ({ label, options, onChange }: SelectProps) => {
  return (
    <label className={styles.select}>
      {label}
      <select onChange={onChange} className={styles.select__input}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};