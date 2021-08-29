import Star from '../icons/Star'
import styles from './Rating.module.scss'

const Rating = () => (
  <div className={styles.rating}>
    <Star />
    <Star />
    <Star />
    <Star />
    <Star />
    <div className={styles.rating__count}>36 reviews</div>
  </div>
)

export default Rating
