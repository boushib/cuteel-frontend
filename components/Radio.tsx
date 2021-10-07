import styles from './Radio.module.sass'

type Props = {
  name: string
  label?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  checked?: boolean
}

const Radio = ({ name, label, value, checked, onChange }: Props) => {
  return (
    <label className={styles.radio__container}>
      <input
        type="radio"
        name={name}
        onChange={onChange}
        value={value}
        checked={checked}
      />
      <div className={styles.radio}></div>
      {label}
    </label>
  )
}

export default Radio
