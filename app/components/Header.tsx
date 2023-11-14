import classes from '@/components/Header.module.css'
import {Title} from '@mantine/core'
import Image from 'next/image'

/**
 * Header component.
 */
export default function Header() {
  return (
    <>
      <header className={classes.header}>
        <Title className={classes.title} order={1}>
          Sora <Image src="/2601.svg" height={32} width={32} alt="cloud" /> Sora
        </Title>
      </header>
    </>
  )
}
