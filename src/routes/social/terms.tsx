import { createFileRoute } from '@tanstack/react-router'

import {
  InternalLink,
  LegalLink,
  LegalList,
  LegalSection,
  LegalShell,
  MailLink,
} from '@/components/social/legal-shell'
import { socialLegalConfig } from '@/lib/social-legal'

const {
  productName,
  operatorShortName,
  operatorLegalName,
  legalContactEmail,
  governingLawRegion,
  exclusiveJurisdictionCourts,
} = socialLegalConfig

export const Route = createFileRoute('/social/terms')({
  head: () => ({
    meta: [
      { title: `Terms of Service | ${productName}` },
      {
        name: 'description',
        content: `${operatorLegalName} operates ${productName}, a social media scheduling and publishing service. These Terms govern accounts, content, connected platforms, fees and liability.`,
      },
    ],
  }),
  component: SocialTermsPage,
})

function SocialTermsPage() {
  return (
    <LegalShell
      title='Terms of Service'
      sibling={{ to: '/social/privacy', label: 'Read the Privacy Policy' }}
    >
      <p>
        Welcome to {productName} (the &ldquo;Service&rdquo;), a social media scheduling, publishing,
        analytics and team-collaboration platform operated by {operatorLegalName} (&ldquo;
        {operatorShortName}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;). The
        website and application URLs where you access the Service and these legal pages
        (collectively, the &ldquo;Site&rdquo;) are controlled by us. These Terms of Service
        (&ldquo;Terms&rdquo;) govern your access to and use of the Site and the Service. By creating
        an account, accessing, or using the Service you agree to be bound by these Terms. If you do
        not agree, do not use the Service.
      </p>

      <LegalSection n={1} title='The company operating the Service'>
        <p>
          The Service is operated by {operatorLegalName}, the contracting party under these Terms.
          References in these Terms to &ldquo;{operatorShortName}&rdquo;, &ldquo;we&rdquo;,
          &ldquo;us&rdquo; or &ldquo;our&rdquo; mean {operatorLegalName}, except where another
          entity is expressly named (for example, an open-source licence or a third-party platform).
        </p>
        <p>
          The Service includes software components that may be licensed under open-source licences;
          your rights under those licences are not limited by these Terms except as the law allows.
        </p>
      </LegalSection>

      <LegalSection n={2} title='Eligibility and accounts'>
        <p>
          You must be at least 18 years old, or the age of majority in your jurisdiction, and
          capable of entering into a binding contract to use the Service. If you use the Service on
          behalf of an organisation, you represent that you have authority to bind that
          organisation, and &ldquo;you&rdquo; in these Terms refers to both you individually and
          that organisation.
        </p>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials, for
          all activity that occurs under your account, and for keeping your account information
          accurate and current. You must notify us promptly at{' '}
          <MailLink address={legalContactEmail} /> of any unauthorised use of your account.
        </p>
      </LegalSection>

      <LegalSection n={3} title='The Service'>
        <p>
          {productName} provides tools to schedule, publish, analyse, manage and collaborate on
          content across many social-media and chat channels, including without limitation: a
          calendar and scheduling engine, a media library, analytics, AI-assisted content generation
          where enabled, team and workspace management, and integrations with third-party platforms.
          Specific features, channels and limits depend on how we configure the Service, the
          integrations we enable, and any separate agreement between you and us.
        </p>
        <p>
          We may add, remove, modify, suspend or discontinue any feature, integration or channel at
          any time, including where a third-party platform changes or revokes API access. We will
          use commercially reasonable efforts to give notice of material changes that adversely
          affect you where practicable.
        </p>
      </LegalSection>

      <LegalSection n={4} title='Fees and billing'>
        <p>
          If we charge fees for access to or use of the Service, those fees are charged by{' '}
          {operatorLegalName} (or its designated payment processor) on the terms presented at
          purchase or in a separate order form. Unless we tell you otherwise or applicable law
          requires, subscriptions renew on the cycle you select until cancelled.
        </p>
        <p>
          Except where required by applicable law or expressly stated otherwise in a written refund
          policy on the Site, fees may be non-refundable, including for partially used periods.
          Cancelling paid access stops future renewals; it may not entitle you to a pro-rata refund
          of the current period.
        </p>
        <p>
          Fees are exclusive of taxes, duties and similar government charges, all of which are your
          responsibility where applicable. Card and wallet payments are handled by third-party
          processors; their terms and privacy notices apply to payment data they process.
        </p>
        <p>
          We may change pricing for new billing periods on reasonable advance notice by email or
          in-product notice. Continued use after a change takes effect may constitute acceptance of
          the new price.
        </p>
      </LegalSection>

      <LegalSection n={5} title='Free access, trials and beta features'>
        <p>
          We may offer free access, trials, or features marked as &ldquo;beta&rdquo;,
          &ldquo;preview&rdquo; or similar. Such offerings are provided &ldquo;as is&rdquo;, may be
          subject to additional limits, and may be modified or discontinued at any time without
          notice. We make no warranties of any kind in respect of free or beta features beyond what
          the law requires.
        </p>
      </LegalSection>

      <LegalSection n={6} title='Your content'>
        <p>
          &ldquo;Your Content&rdquo; means any text, images, video, audio, links, metadata,
          schedules, prompts, configurations and other materials you upload to, generate within, or
          transmit through the Service. As between you and {operatorShortName}, you retain all
          ownership and intellectual-property rights in Your Content.
        </p>
        <p>
          You grant {operatorLegalName} a worldwide, non-exclusive, royalty-free licence to host,
          store, reproduce, transmit, display, adapt and distribute Your Content solely for the
          purposes of operating, providing, securing and improving the Service, including
          transmitting Your Content to the third-party social-media platforms you have connected,
          and generating analytics, previews and related outputs.
        </p>
        <p>
          You represent and warrant that you own, or have all necessary rights, licences and
          permissions in, Your Content; that Your Content and its publication via the connected
          platforms do not infringe any third-party right; and that Your Content complies with these
          Terms, applicable law and the terms of every third-party platform to which it is
          published.
        </p>
      </LegalSection>

      <LegalSection n={7} title='Acceptable use'>
        <p>You agree not to use the Service to, and not to allow any third party to:</p>
        <LegalList>
          <li>
            publish, distribute or store content that is unlawful, defamatory, harassing, hateful,
            threatening, sexually exploitative of minors, or that infringes intellectual-property,
            privacy or publicity rights;
          </li>
          <li>
            send spam, engage in coordinated inauthentic behaviour, run undisclosed bots,
            mass-create fake engagement, or otherwise violate the platform rules of any connected
            third-party network;
          </li>
          <li>
            circumvent rate limits, technical restrictions or access controls of the Service or of
            any connected third-party platform;
          </li>
          <li>
            reverse engineer, decompile, scrape, or attempt to derive the source code of the Service
            except to the extent expressly permitted by applicable law or by an open-source licence
            covering specific components;
          </li>
          <li>
            resell, sublicense, white-label or otherwise commercialise the Service except under a
            written agreement with {operatorLegalName};
          </li>
          <li>
            upload malware, attempt to gain unauthorised access to the Service, or interfere with
            the integrity or performance of the Service or its underlying infrastructure.
          </li>
        </LegalList>
        <p>
          We may suspend or terminate accounts that violate this section, with or without notice,
          and may remove offending content. We may also be required to disclose violations to
          affected third-party platforms.
        </p>
      </LegalSection>

      <LegalSection n={8} title='Third-party platforms and integrations'>
        <p>
          The Service&apos;s core function is to publish Your Content to third-party platforms
          (including, without limitation, X / Twitter, Meta Platforms (Facebook, Instagram,
          Threads), LinkedIn, YouTube, TikTok, Pinterest, Reddit, Bluesky, Mastodon, Discord, Slack,
          Telegram and others). To do so, you authenticate your accounts on those platforms and
          authorise the Service to act on your behalf.
        </p>
        <p>
          The developer applications, OAuth registrations and platform agreements that enable these
          integrations are held by {operatorLegalName} (or our affiliates, as disclosed to you).
          Your use of any third-party platform through the Service is also governed by that
          platform&apos;s terms and privacy policy, including, by way of example:
        </p>
        <LegalList>
          <li>
            YouTube — by connecting a YouTube account you agree to the YouTube Terms of Service at{' '}
            <LegalLink href='https://www.youtube.com/t/terms'>
              https://www.youtube.com/t/terms
            </LegalLink>
            , and acknowledge Google&apos;s Privacy Policy at{' '}
            <LegalLink href='https://policies.google.com/privacy'>
              https://policies.google.com/privacy
            </LegalLink>
            . The Service may use YouTube API Services.
          </li>
          <li>
            X / Twitter — the X Terms at{' '}
            <LegalLink href='https://x.com/en/tos'>https://x.com/en/tos</LegalLink>.
          </li>
          <li>
            Meta Platforms — the Meta Terms of Service and Platform Terms at{' '}
            <LegalLink href='https://www.facebook.com/legal/terms'>
              https://www.facebook.com/legal/terms
            </LegalLink>
            .
          </li>
          <li>
            LinkedIn — the LinkedIn User Agreement at{' '}
            <LegalLink href='https://www.linkedin.com/legal/user-agreement'>
              https://www.linkedin.com/legal/user-agreement
            </LegalLink>
            .
          </li>
          <li>
            TikTok — the TikTok Terms of Service at{' '}
            <LegalLink href='https://www.tiktok.com/legal/terms-of-service'>
              https://www.tiktok.com/legal/terms-of-service
            </LegalLink>
            .
          </li>
        </LegalList>
        <p>
          You can revoke the Service&apos;s access to any connected platform at any time from your
          account settings or directly from that platform&apos;s app/permissions page. Revoking
          access will stop future scheduled posts to that platform.
        </p>
        <p>
          {operatorShortName} is not responsible for the availability, behaviour, policies, fees,
          content moderation decisions, account suspensions, rate-limit changes or removal of
          features of any third-party platform. Where a third-party platform changes its API,
          terminates its developer programme, or modifies its terms in a way that affects the
          Service, we may modify or discontinue the affected integration without liability.
        </p>
      </LegalSection>

      <LegalSection n={9} title='AI features'>
        <p>
          The Service may offer AI-assisted features that generate text, images, video, captions,
          hashtags, summaries or analytics (&ldquo;AI Output&rdquo;). AI Output is generated
          probabilistically and may be inaccurate, incomplete or unsuitable for your purpose. You
          are solely responsible for reviewing AI Output before publishing it, ensuring that it
          complies with applicable law, third-party platform rules and the rights of any persons
          depicted, and disclosing AI involvement where required.
        </p>
        <p>
          To provide AI features we may transmit your prompts and selected inputs to third-party
          model providers. We do not authorise such providers to train their models on your inputs
          except where you opt in or where the provider&apos;s default policy requires it (and we
          will document such cases in the Privacy Policy).
        </p>
      </LegalSection>

      <LegalSection n={10} title='Intellectual property'>
        <p>
          The Service, the Site and all software, designs, text, graphics, logos, trademarks and
          other materials we make available to you in operating the Service (excluding Your Content
          and excluding components made available under their own open-source licences) are the
          property of {operatorLegalName} or its licensors and are protected by
          intellectual-property laws. Subject to your compliance with these Terms, we grant you a
          limited, non-exclusive, non-transferable, revocable licence to access and use the Service
          for its intended purpose for as long as we make the Service available to you.
        </p>
        <p>
          Open-source components of the Service are governed by the licences distributed with them;
          nothing in these Terms restricts your rights under those licences in respect of the
          relevant components.
        </p>
      </LegalSection>

      <LegalSection n={11} title='Feedback'>
        <p>
          If you provide feedback, suggestions or ideas about the Service, you grant{' '}
          {operatorLegalName} a perpetual, irrevocable, worldwide, royalty-free licence to use them
          for any purpose, without obligation or compensation to you.
        </p>
      </LegalSection>

      <LegalSection n={12} title='Privacy and data protection'>
        <p>
          Our processing of personal data in connection with the Service is described in our{' '}
          <InternalLink to='/social/privacy'>Privacy Policy</InternalLink>, which is incorporated
          into these Terms by reference. Where we process personal data on your behalf in respect of
          your end-users (for example, audience analytics), we do so as a processor and any Data
          Processing Addendum we provide applies.
        </p>
      </LegalSection>

      <LegalSection n={13} title='Suspension and termination'>
        <p>
          You may terminate your account at any time from your account settings where available. We
          may suspend or terminate your access to the Service immediately if you breach these Terms,
          fail to pay fees when due, use the Service in a way that exposes {operatorShortName} or
          any third-party platform to legal, security or reputational risk, or where required by
          law.
        </p>
        <p>
          On termination your right to access the Service ends. We may delete Your Content and
          account data after a reasonable retention period as described in the Privacy Policy.
          Provisions that by their nature should survive termination (including sections on Your
          Content licence, intellectual property, fees already accrued, disclaimers, limitation of
          liability, indemnification, governing law and dispute resolution) survive.
        </p>
      </LegalSection>

      <LegalSection n={14} title='Disclaimers'>
        <p>
          To the maximum extent permitted by law, the Service and the Site are provided &ldquo;as
          is&rdquo; and &ldquo;as available&rdquo;, without warranties of any kind, whether express,
          implied or statutory, including warranties of merchantability, fitness for a particular
          purpose, non-infringement, accuracy and uninterrupted or error-free operation. We do not
          warrant that scheduled posts will always be delivered on time, that connected platforms
          will accept them, or that analytics returned by third-party platforms will be accurate or
          complete.
        </p>
      </LegalSection>

      <LegalSection n={15} title='Limitation of liability'>
        <p>
          To the maximum extent permitted by law, in no event shall {operatorLegalName}, its
          affiliates, officers, directors, employees, agents or licensors be liable for any
          indirect, incidental, special, consequential, exemplary or punitive damages, or for any
          loss of profits, revenue, data, goodwill, business opportunity or anticipated savings,
          arising out of or in connection with these Terms, the Site or the Service, whether based
          in contract, tort (including negligence), strict liability or otherwise, even if advised
          of the possibility of such damages.
        </p>
        <p>
          The aggregate liability of {operatorLegalName} arising out of or in connection with these
          Terms, the Site or the Service shall not exceed the greater of (a) the total fees actually
          paid by you to {operatorLegalName} for the Service in the twelve (12) months immediately
          preceding the event giving rise to the claim, and (b) USD 100. If you have not paid fees,
          clause (a) is deemed zero.
        </p>
      </LegalSection>

      <LegalSection n={16} title='Indemnification'>
        <p>
          You agree to indemnify, defend and hold harmless {operatorLegalName} and its affiliates,
          officers, directors, employees, agents and licensors from and against any claims,
          liabilities, damages, losses and expenses (including reasonable legal fees) arising out of
          or in connection with: (a) Your Content; (b) your use of the Service; (c) your breach of
          these Terms; (d) your violation of any applicable law or any third-party right (including
          any third-party platform&apos;s terms); or (e) any dispute between you and a third party
          related to content you published through the Service.
        </p>
      </LegalSection>

      <LegalSection n={17} title='Newsletter and marketing communications'>
        <p>
          If you subscribe to our newsletter or opt in to marketing communications, you agree to
          receive product, promotional and educational emails from {operatorShortName}. You can
          unsubscribe at any time using the &ldquo;unsubscribe&rdquo; link in any such email.
          Transactional and account-related emails (for example billing receipts, security alerts
          and service notices) may not be optional while your account is active.
        </p>
      </LegalSection>

      <LegalSection n={18} title='Cookies'>
        <p>
          We use cookies and similar technologies on the Site for authentication, preferences,
          security, analytics and marketing where permitted, as described in our Privacy Policy. By
          using the Site you consent to our use of cookies in accordance with that policy and any
          cookie preferences you have set.
        </p>
      </LegalSection>

      <LegalSection n={19} title='Changes to the Terms'>
        <p>
          We may update these Terms from time to time. If a change is material we will give
          reasonable advance notice by email or in-product notice where practicable. Changes are
          effective on the date stated at the top of the updated Terms; your continued use of the
          Service after that date constitutes acceptance.
        </p>
      </LegalSection>

      <LegalSection n={20} title='Governing law and dispute resolution'>
        <p>
          These Terms and any non-contractual obligations arising out of or in connection with them
          are governed by the laws of {governingLawRegion}, without regard to conflict-of-laws
          principles that would apply another jurisdiction&apos;s laws.{' '}
          {exclusiveJurisdictionCourts} have exclusive jurisdiction over any dispute arising out of
          or in connection with these Terms or the Service, save that {operatorShortName} may bring
          proceedings in any jurisdiction where you are located or where infringement of its
          intellectual property is occurring.
        </p>
        <p>
          Nothing in this section limits any non-waivable consumer rights you may have under the
          mandatory law of your country of residence.
        </p>
      </LegalSection>

      <LegalSection n={21} title='General'>
        <p>
          These Terms, together with the Privacy Policy, any Data Processing Addendum (where
          applicable) and any order form or plan-specific terms you accept, constitute the entire
          agreement between you and {operatorLegalName} in respect of the Service. If any provision
          is held invalid or unenforceable, the remaining provisions remain in full force. Our
          failure to enforce any right or provision is not a waiver of that right or provision. You
          may not assign these Terms without our prior written consent; we may assign these Terms to
          an affiliate or in connection with a merger, acquisition or sale of assets.
        </p>
      </LegalSection>

      <LegalSection n={22} title='Contact'>
        <p>
          Questions about these Terms: <MailLink address={legalContactEmail} />. Questions about
          personal data: see the Privacy Policy and contact the email address listed there.
        </p>
      </LegalSection>
    </LegalShell>
  )
}
