type Props = {
  size?: number
}

const Delete = ({ size = 24 }: Props) => (
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
    <path
      fill="#fff"
      d="M491.9,417.3c20.9,21,20.9,54.9,0,75.9c-10.4,10.5-24.1,15.7-37.7,15.7c-13.7,0-27.3-5.3-37.7-15.7L256,331.9
	L95.6,493.3C85.2,503.7,71.6,509,57.9,509c-13.7,0-27.3-5.3-37.7-15.7c-20.9-21-20.9-54.9,0-75.9L180.5,256L20.1,94.7
	c-20.9-21-20.9-54.9,0-75.9c20.9-21,54.6-21,75.5,0L256,180.1L416.4,18.7c20.9-21,54.6-21,75.5,0c20.9,21,20.9,54.9,0,75.9
	L331.5,256L491.9,417.3z"
    />
  </svg>
)

export default Delete
