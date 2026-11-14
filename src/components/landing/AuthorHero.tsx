import type { ReactNode } from 'react'
import { Mail, MessageSquare, Phone } from 'lucide-react'
import type { AuthorProfile } from '../../data/landing'
import { LinkedInIcon } from '../icons/BrandIcons'

const pillClassName =
  'inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-xs text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'

function ContactPill({ href, children }: { href: string; children: ReactNode }) {
  const isExternal = href.startsWith('http')
  return (
    <a
      href={href}
      className={pillClassName}
      {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

/** Opens a new Gmail message with the recipient pre-filled. */
function gmailComposeUrl(to: string) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}`
}

export function AuthorHero({ author }: { author: AuthorProfile }) {
  const { contact } = author

  return (
    <section className="py-12 lg:py-16">
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12 lg:gap-16">
        {/* Portrait */}
        <div className="flex w-full max-w-sm flex-col md:col-span-5 md:max-w-none">
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
            <img
              src={author.avatarUrl}
              alt={`Portrait of ${author.name}`}
              className="size-full object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-background/95 via-background/55 to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-6 bottom-5 h-4 rounded-full border border-white/80 bg-background/90 shadow-[0_2px_8px_rgba(0,0,0,0.06)] backdrop-blur-md sm:inset-x-8"
            />
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold text-foreground">{author.name}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{author.role}</p>
          </div>
        </div>

        {/* Bio & contact */}
        <div className="flex flex-col md:col-span-7">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-[11px] font-semibold tracking-wider text-amber-700/80 uppercase">
              Authorial Focus
            </span>
            <span aria-hidden="true" className="h-px w-12 bg-amber-200" />
          </div>

          <h1 className="mb-6 font-serif text-3xl leading-snug font-normal tracking-tight text-balance text-foreground lg:text-4xl">
            {author.focusTitle}
            <em className="italic">{author.focusTitleItalic}</em>
            {author.focusTitleEnd}
          </h1>

          <div className="mb-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
            {author.bioParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold tracking-wider text-muted-foreground/80 uppercase">
              Direct Inquiries &amp; Corroboration
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <ContactPill href={gmailComposeUrl(contact.email)}>
                <Mail aria-hidden="true" className="size-3 text-muted-foreground" />
                <span className="font-mono text-[11px]">{contact.email}</span>
              </ContactPill>

              <ContactPill href={`tel:${contact.phone.replace(/\s+/g, '')}`}>
                <Phone aria-hidden="true" className="size-3 text-muted-foreground" />
                <span className="font-mono text-[11px]">{contact.phone}</span>
              </ContactPill>

              <ContactPill href={contact.whatsappUrl}>
                <MessageSquare aria-hidden="true" className="size-3 text-muted-foreground" />
                <span>WhatsApp</span>
              </ContactPill>

              <ContactPill href={contact.linkedinUrl}>
                <LinkedInIcon className="size-3 text-muted-foreground" />
                <span>LinkedIn</span>
              </ContactPill>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
