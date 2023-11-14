import classes from '@/components/Footer.module.css'
import config from '@/lib/config'
import {IconBrandGithub} from '@tabler/icons-react'

/**
 * Footer component.
 */
export default function Footer() {
  return (
    <footer className={classes.footer}>
      <p>
        <a
          aria-label={`Visit ${config.siteAuthor} website`}
          href={config.authorUrl}
          rel="author"
        >
          {config.siteAuthor}
        </a>
      </p>
      <p>
        <a
          aria-label="View source code on github"
          href={config.githubUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <IconBrandGithub />
        </a>
      </p>
    </footer>
  )
}
