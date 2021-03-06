type Props = {
  size?: number
  color?: string
}

const Invoice: React.FC<Props> = ({ size = 20, color = '#fff' }) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
    style={{ width: size, height: size }}
  >
    <rect fill={color} x="180" y="340" width="122" height="40" />
    <rect fill={color} x="180" y="260" width="232" height="40" />
    <path
      fill={color}
      d="M452,80h-20V60c0-33.084-26.916-60-60-60H60C26.916,0,0,26.916,0,60v312c0,33.084,26.916,60,60,60h20v20
				c0,33.084,26.916,60,60,60h229.828L512,369.145V140C512,106.916,485.084,80,452,80z M80,140v252H60c-11.028,0-20-8.972-20-20V60
				c0-11.028,8.972-20,20-20h312c11.028,0,20,8.972,20,20v20H140C106.916,80,80,106.916,80,140z M381.889,443.177v-42.288
				c0-11.028,8.972-20,20-20h41.99L381.889,443.177z M472,340.889h-70.111c-33.084,0-60,26.916-60,60V472H140
				c-11.028,0-20-8.972-20-20V140c0-11.028,8.972-20,20-20h312c11.028,0,20,8.972,20,20V340.889z"
    />
    <rect fill={color} x="180" y="180" width="232" height="40" />
  </svg>
)

export default Invoice
