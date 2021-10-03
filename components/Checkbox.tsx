import styles from './Checkbox.module.sass'

type Props = {
  onChange: (checked: boolean) => void
  checked?: boolean
}

const Checkbox: React.FC<Props> = ({ onChange, checked, children }) => {
  return (
    <label className={styles.checkbox}>
      <input
        type="checkbox"
        onChange={(e) => onChange(e.target.checked)}
        checked={checked}
      />
      <span className={styles.checkbox__checkmark}></span>
      {children}
    </label>
  )
}

export default Checkbox
