import { createFileRoute } from '@tanstack/react-router'

import {
  InternalLink,
  LegalLink,
  LegalList,
  LegalSection,
  LegalShell,
  MailLink,
  Term,
} from '@/components/social/legal-shell'
import { socialLegalConfig } from '@/lib/social-legal'

const {
  productName,
  operatorShortName,
  operatorLegalName,
  privacyContactEmail,
  legalContactEmail,
} = socialLegalConfig

export const Route = createFileRoute('/social/privacy')({
  head: () => ({
    meta: [
      { title: `Privacy Policy | ${productName}` },
      {
        name: 'description',
        content: `How ${operatorLegalName} processes personal data for ${productName}, including TikTok and other social platform integrations.`,
      },
    ],
  }),
  component: SocialPrivacyPage,
})

function SocialPrivacyPage() {
  return (
    <LegalShell
      title='Privacy Policy'
      sibling={{ to: '/social/terms', label: 'Read the Terms of Service' }}
    >
      <p>
        This Privacy Policy describes how {operatorLegalName} (&ldquo;{operatorShortName}&rdquo;,
        &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;) processes personal data when you
        use {productName} (the &ldquo;Service&rdquo;), including when you connect third-party social
        accounts such as TikTok. We operate the Service on infrastructure we control. Read it
        together with our <InternalLink to='/social/terms'>Terms of Service</InternalLink>.
      </p>

      <LegalSection n={1} title='Who is responsible for your data?'>
        <p>
          {operatorLegalName} is the primary controller of personal data processed through the
          Service — including account data, integration tokens you store here, content you submit
          for scheduling, and logs we collect to run and secure the Service.
        </p>
        <p>
          If your organisation shares access with its own vendors, those parties may also act as
          controllers or processors as described in your agreement with them. This Policy covers
          processing carried out by {operatorShortName} for the Service made available at the site
          where you are reading this notice.
        </p>
      </LegalSection>

      <LegalSection n={2} title='Personal data we collect'>
        <p>We may collect and process categories of personal data such as:</p>
        <LegalList>
          <li>
            <Term>Account and profile data</Term> — name, email address, organisation, role,
            preferences, security settings and similar information you provide when you register or
            update your account.
          </li>
          <li>
            <Term>Authentication and integration data</Term> — OAuth tokens, refresh tokens, channel
            identifiers, profile handles and permissions data needed to connect and maintain linked
            social accounts (including TikTok).
          </li>
          <li>
            <Term>Content and usage data</Term> — posts, media, captions, schedules, drafts,
            comments, prompts you submit to the Service, and metadata generated in connection with
            scheduling, publishing and collaboration features.
          </li>
          <li>
            <Term>Technical and log data</Term> — IP address, device and browser type, approximate
            location derived from IP, timestamps, diagnostic logs, crash data and similar
            information used to secure and operate the Service.
          </li>
          <li>
            <Term>Billing data</Term> — where we charge for access, subscription or transaction
            references and limited billing contact details processed by our payment processors (we
            do not store full payment card numbers on our application servers).
          </li>
          <li>
            <Term>Communications</Term> — messages you send to support, feedback you provide, and
            records of marketing preferences.
          </li>
          <li>
            <Term>Cookies and similar technologies</Term> — as described in section 8.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection n={3} title='How we use personal data'>
        <p>We use personal data to:</p>
        <LegalList>
          <li>provide, operate, maintain and improve the Service;</li>
          <li>authenticate you and manage workspaces, teams and permissions;</li>
          <li>
            schedule, publish and retrieve content on connected platforms (including TikTok) in
            accordance with your instructions;
          </li>
          <li>provide analytics, previews, notifications and in-product experiences;</li>
          <li>
            operate AI-assisted features where enabled, including sending prompts and related inputs
            to model providers as described in the Terms and below;
          </li>
          <li>
            process payments where applicable, detect fraud and comply with tax and accounting
            obligations;
          </li>
          <li>secure the Service, monitor abuse, enforce our Terms and comply with law;</li>
          <li>
            communicate with you about the Service, security, policy updates and (where permitted)
            marketing; and
          </li>
          <li>exercise or defend legal claims and manage corporate transactions.</li>
        </LegalList>
        <p>
          Where the GDPR or similar laws apply, we rely on appropriate legal bases such as
          performance of a contract, legitimate interests (for example, securing our services and
          improving features, balanced against your rights), consent where required (for example,
          certain cookies or marketing), and legal obligation.
        </p>
      </LegalSection>

      <LegalSection n={4} title='TikTok and other third-party platforms'>
        <p>
          When you connect TikTok or other networks, those platforms receive and process information
          in accordance with their own terms and privacy policies. By connecting an account, you
          acknowledge that your use of the platform is also governed by that platform&apos;s rules —
          for TikTok, see the{' '}
          <LegalLink href='https://www.tiktok.com/legal/terms-of-service'>
            TikTok Terms of Service
          </LegalLink>{' '}
          and{' '}
          <LegalLink href='https://www.tiktok.com/legal/privacy-policy'>
            TikTok Privacy Policy
          </LegalLink>
          .
        </p>
        <p>
          {operatorShortName} does not control how platforms store, moderate or display content. You
          can disconnect a platform at any time from your settings or the platform&apos;s app
          permissions page; disconnection stops future publishing through the Service but does not
          erase data already held by the platform.
        </p>
      </LegalSection>

      <LegalSection n={5} title='AI providers and subprocessors'>
        <p>
          Where you use AI features, we may send prompts and related inputs to third-party model
          providers to generate outputs. We do not authorise those providers to use your inputs to
          train their models except where you opt in or where a provider&apos;s default policy
          applies — and where that is the case, we document it here or in product notices. We use
          subprocessors (such as hosting, email delivery, analytics and payment processors) to help
          run the Service. A current list may be provided on request.
        </p>
      </LegalSection>

      <LegalSection n={6} title='Sharing of personal data'>
        <p>We may share personal data with:</p>
        <LegalList>
          <li>
            service providers and subprocessors who assist us on our instructions and subject to
            appropriate terms;
          </li>
          <li>
            connected social platforms, to the extent needed to perform publishing and related API
            operations;
          </li>
          <li>
            professional advisers, regulators and law enforcement when required by law or to protect
            rights; and
          </li>
          <li>
            a successor entity in connection with a merger, acquisition or sale of assets involving{' '}
            {operatorShortName}, subject to this Policy or equivalent protections.
          </li>
        </LegalList>
        <p>We do not sell your personal data.</p>
      </LegalSection>

      <LegalSection n={7} title='International transfers'>
        <p>
          We may process and store personal data in the United States and other countries where we
          or our providers operate. Where we transfer personal data from the EEA, UK or Switzerland,
          we use appropriate safeguards such as Standard Contractual Clauses or equivalent
          mechanisms where required.
        </p>
      </LegalSection>

      <LegalSection n={8} title='Cookies and similar technologies'>
        <p>
          We use cookies and similar technologies for authentication, session management, security,
          preferences, analytics and (where permitted) marketing. You can control certain
          non-essential cookies through our cookie banner or browser settings. Essential cookies may
          be required for login and core functionality.
        </p>
      </LegalSection>

      <LegalSection n={9} title='Retention'>
        <p>
          We retain personal data for as long as needed to provide the Service, comply with legal
          obligations, resolve disputes and enforce our agreements. After you close your account, we
          may retain certain records for a limited period — for example, billing and security logs —
          where permitted or required by law.
        </p>
      </LegalSection>

      <LegalSection n={10} title='Security'>
        <p>
          We implement technical and organisational measures designed to protect personal data
          against unauthorised access, loss or alteration. No method of transmission over the
          Internet is completely secure; you should use strong passwords and protect your
          credentials.
        </p>
      </LegalSection>

      <LegalSection n={11} title='Your rights'>
        <p>
          Depending on your location, you may have rights to access, rectify, erase, restrict or
          object to certain processing, data portability, and to withdraw consent where processing
          is consent-based. You may also have the right to lodge a complaint with a supervisory
          authority. To exercise rights, contact us using the details below. We may need to verify
          your identity before responding.
        </p>
      </LegalSection>

      <LegalSection n={12} title='Children'>
        <p>
          The Service is not directed to children under 16 (or the higher age required in your
          jurisdiction), and we do not knowingly collect personal data from children. If you believe
          we have collected such data, contact us and we will take appropriate steps to delete it.
        </p>
      </LegalSection>

      <LegalSection n={13} title='Processor relationships and your end-users'>
        <p>
          Where you use the Service to process personal data about your own customers or audience on
          your instructions — for example, certain analytics scenarios — we may act as a processor
          and any Data Processing Addendum we provide governs that processing in addition to this
          Policy.
        </p>
      </LegalSection>

      <LegalSection n={14} title='Changes to this Policy'>
        <p>
          We may update this Privacy Policy from time to time. We will post the updated version on
          this page and adjust the &ldquo;Last updated&rdquo; date. Where changes are material, we
          will provide additional notice as required by law or as described in the Terms.
        </p>
      </LegalSection>

      <LegalSection n={15} title='Contact'>
        <p>
          Questions about this Privacy Policy or our data practices:{' '}
          <MailLink address={privacyContactEmail} />. General legal notices:{' '}
          <MailLink address={legalContactEmail} />.
        </p>
      </LegalSection>
    </LegalShell>
  )
}
