import NextHead from 'next/head'

type Props = { title: string }

const Head: React.FC<Props> = ({ title }) => (
  <NextHead>
    <title>Cuteel | {title}</title>
  </NextHead>
)

export default Head
