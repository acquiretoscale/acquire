import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Acquire To Scale. Learn how we collect, use, and protect your personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero */}
      <section className="border-b border-[var(--border)] py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-base font-medium uppercase tracking-wider text-[var(--muted)]">
            Legal
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Privacy Policy
          </h1>
          <div className="mt-4 h-1 w-12 rounded-full bg-[var(--accent)]" aria-hidden />
          <p className="mt-6 text-[var(--muted)]">
            Effective date: August 1, 2025
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <article className="mx-auto max-w-3xl px-4 prose max-w-none prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline">
          <div className="space-y-10 text-[var(--muted)] leading-relaxed">
            <p>
              Quantum Humans Lab LTD (&quot;company&quot;, &quot;I&quot;, &quot;we&quot; or
              &quot;us&quot;) is dedicated to respecting the privacy of your personal
              information, and this privacy policy describes what information is
              collected from you on{" "}
              <a
                href="https://www.acquiretoscale.com/"
                className="text-[var(--accent)] hover:underline"
              >
                https://www.acquiretoscale.com/
              </a>{" "}
              (hereinafter the &quot;website&quot;) and how it is used. The term
              &quot;you&quot; refers to anyone who uses, visits, and/or views the
              website.
            </p>
            <p>
              By visiting and using the website, you accept and agree to be bound
              by this privacy policy. Your continued use of the website after
              posting of any changes to our Privacy Policy constitutes your
              acceptance of those changes and updates. You must not access or use
              the website if you do not wish to be bound by this Privacy Policy.
            </p>

            <h2 className="mt-12 text-xl font-bold text-[var(--foreground)] md:text-2xl">
              Children&apos;s Privacy
            </h2>
            <p>
              We respect the privacy of children and &quot;child&quot; means an
              individual under the age of 13. All information and content on this
              website is intended for individuals over the age of 18. Children
              under the age of 13 are prohibited from using this website. We do
              not knowingly collect, use or disclose personal information from
              children under the age of 13 without prior parental or guardian
              consent. If you believe any personal information is collected from
              someone under the age of 13 without parental or guardian consent,
              then please contact us to have that information deleted.
            </p>

            <h2 className="mt-12 text-xl font-bold text-[var(--foreground)] md:text-2xl">
              What Information We Collect and How It Is Used
            </h2>
            <p>
              When you access the website, you may provide certain personally
              identifiable information including but not limited to your name,
              email address, phone number, address, avatar image, and credit card
              information when you make a purchase on the website.
            </p>
            <p>
              This information is collected when you register on the site, place
              an order, subscribe to a newsletter, contact us, use the search
              feature on the website, provide comments or any other feedback,
              fill out a form or use the live chat or enter any other information
              on the website to communicate with us. From time to time, we may
              also collect information that you submit when you participate in any
              online surveys that we may post on our website. Moreover, our
              information collection may include using cookies on a
              computer/handheld device or using or touching information in any
              way, including, but not limited to, collecting, storing, deleting,
              using, combining and disclosing information, all of which activities
              will take place in the United States. If you reside outside the
              United States your information may be transferred, processed and
              stored there under United States privacy standards.
            </p>
            <p>
              Your personal information is used to personalize your experience,
              improve the website to better serve you, provide customer service
              support, efficiently process your requests or transactions, tailor
              advertisements to you, elicit reviews of services or products,
              provide you offers, promotions and to follow up with you through
              correspondence (email, live chat, or phone). We may also use this
              information to provide you offers and promotions from our partners
              and/or our affiliates in exchange for a commission without
              additional cost to you.
            </p>
            <p>
              Please be advised we DO NOT SELL YOUR PERSONAL INFORMATION to third
              parties and have never sold your personal information. We do not
              intend to sell your personal information in the future either.
            </p>
            <p>
              Additionally, like other websites, this website automatically
              collects certain information about you through Log Data and Google
              Analytics. Log Data is information about your computer&apos;s
              Internet Protocol Address, which is your &quot;IP&quot; address,
              browser information, Internet Service Provider&apos;s information,
              your operating system, and your browser type. Similarly, Google
              Analytics collects certain information about your location,
              browsing history, the pages you visit, the equipment you used to
              access the website, traffic patterns, and other general patterns
              related to your use of the website.
            </p>
            <p>
              This information is used to analyze website statistics related to
              user behavior and interests, improve our performance and your use of
              the website and to further enhance our products and services
              offered to you.
            </p>

            <h2 className="mt-12 text-xl font-bold text-[var(--foreground)] md:text-2xl">
              Comments and Social Media
            </h2>
            <p>
              If you leave a comment, the comment and its metadata are retained
              indefinitely. This is so we can recognize and approve any follow-up
              comments automatically instead of holding them in a moderation
              queue. When you leave a comment, your name, email address, and
              website/organization name is not shared with a third party and may
              be used to communicate with you.
            </p>
            <p>
              Social media accounts and sharing options are available on this
              website. Social media sites (Facebook, Twitter, YouTube, and so
              forth) can track your personal information. Should you choose to
              interact with us on social media, please note that you will be
              voluntarily disclosing that personal information. This information
              is no longer private. It becomes public information and can be
              collected and used by others. We have no control over and take no
              responsibility for the use, storage or dissemination of such
              publicly-disclosed personal information by you.
            </p>
            <p>
              Any such interactions via comments and social media with us do not
              subject us to any kind of liability related to misuse of your
              information by others.
            </p>

            <h2 className="mt-12 text-xl font-bold text-[var(--foreground)] md:text-2xl">
              Use of Cookies
            </h2>
            <p>
              The website may use cookies to facilitate your use of the website.
              Cookies are files with small amounts of data including an anonymous
              unique identifier that a website sends to your computer&apos;s hard
              drive when you are viewing the website. Just like other websites, we
              automatically collect some non-personally identifiable information
              including but not limited to your IP address, geographic location,
              language preference, date and time of visitors.
            </p>
            <p>
              When you leave a comment on our website, you may opt-in to saving
              your name, email address and website in cookies. These are for your
              convenience so that you do not have to fill in your details again
              when you leave another comment.
            </p>
            <p>
              If you have an account and you log in to this website, we will set a
              temporary cookie to determine if your browser accepts cookies. This
              cookie contains no personal data and is discarded when you close
              your browser.
            </p>
            <p>
              We may use cookies for various reasons such as optimizing and
              personalizing your browsing experience, checking our website
              analytics, saving your preferences and settings for future use,
              serving ads based on your liking and interests, affiliate marketing
              and posting comments on our website.
            </p>
            <p>
              This information is only collected to better serve and understand
              your user experience on the website. You have the option of turning
              off cookies on your computer should you wish to do so. If you
              choose to do that, you may not be able to view all the features and
              content of this website.
            </p>

            <h2 className="mt-12 text-xl font-bold text-[var(--foreground)] md:text-2xl">
              Use of Web Beacons and Pixels
            </h2>
            <p>
              In conjunction with the use of cookies, third parties may also use
              web beacons, which are also known as clear GIFs, web bugs or pixel
              tags to collect general information about your use of our website.
              They monitor user activity and are used to track customer behavior
              data. This information may be relevant to third parties such as the
              ad networks used on our website to tailor the advertising based on
              your behavior and interests.
            </p>
            <p>
              We may use social media pixels to track and collect general
              information about your use in compliance with different social
              media sites (Facebook, Twitter, etc) for the purpose of promoting
              products, tracking conversions, remarketing, running target
              advertisements and so forth.
            </p>
            <p>
              Third parties like Facebook may use their own cookies, web beacons
              and other technologies to collect and receive information from our
              website for the purpose of providing target advertisements. You may
              see our ads on Facebook after you have visited our website.
            </p>

            <h2 className="mt-12 text-xl font-bold text-[var(--foreground)] md:text-2xl">
              Third-Party Links and Use
            </h2>
            <p>
              We may include, offer or advertise third party links, products or
              services on the website. Once you click on a third-party link and
              leave this website, you are no longer bound by our Privacy Policy and
              Terms and Conditions.
            </p>
            <p>
              Articles on this website may include embedded content (e.g. videos,
              images, advertisements, etc.). Embedded content from other websites
              behaves in the exact same way as if the visitor has visited the
              other website. These websites may collect data about you, use
              cookies, embed additional third-party tracking, and monitor your
              interaction with that embedded content, including tracing your
              interaction with the embedded content if you have an account and are
              logged in to that website.
            </p>

            <h2 className="mt-12 text-xl font-bold text-[var(--foreground)] md:text-2xl">
              Service Providers
            </h2>
            <p>
              We may employ third party companies and individuals to facilitate
              this Website. These third parties may have access to some of your
              basic Personal Data only to perform specific tasks on our behalf and
              are obligated not to disclose or use it for any other purpose. Some
              of the third-party services and companies we use include, but are
              not limited to:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Google Analytics, Google AdWords and Google AdSense:</strong>{" "}
                For more information on the privacy practices of Google, please
                visit the Google Privacy & Terms web page:{" "}
                <a
                  href="https://policies.google.com/privacy?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:underline"
                >
                  https://policies.google.com/privacy?hl=en
                </a>
              </li>
              <li>
                <strong>Facebook:</strong> For more information on the privacy
                practices of Facebook, please visit Facebook&apos;s Data Policy:{" "}
                <a
                  href="https://www.facebook.com/privacy/explanation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:underline"
                >
                  https://www.facebook.com/privacy/explanation
                </a>
              </li>
              <li>
                <strong>Apple Pay:</strong> Their Privacy Policy can be viewed at{" "}
                <a
                  href="https://support.apple.com/en-us/HT203027"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:underline"
                >
                  https://support.apple.com/en-us/HT203027
                </a>{" "}
                and{" "}
                <a
                  href="https://www.apple.com/legal/privacy/en-ww/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:underline"
                >
                  https://www.apple.com/legal/privacy/en-ww/
                </a>
              </li>
              <li>
                <strong>Google Pay:</strong> Their Privacy Policy can be viewed
                at{" "}
                <a
                  href="https://payments.google.com/payments/apis-secure/u/0/get_legal_document?ldo=0&ldt=privacynotice&ldl=en-GB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:underline"
                >
                  https://payments.google.com/payments/apis-secure/u/0/get_legal_document?ldo=0&ldt=privacynotice&ldl=en-GB
                </a>{" "}
                and{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:underline"
                >
                  https://policies.google.com/privacy
                </a>
              </li>
              <li>
                <strong>Stripe:</strong> Their Privacy Policy can be viewed at{" "}
                <a
                  href="https://stripe.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:underline"
                >
                  https://stripe.com/privacy
                </a>
              </li>
              <li>
                <strong>PayPal:</strong> Their Privacy Policy can be viewed at{" "}
                <a
                  href="https://www.paypal.com/us/webapps/mpp/ua/privacy-full"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:underline"
                >
                  https://www.paypal.com/us/webapps/mpp/ua/privacy-full
                </a>
              </li>
            </ul>
            <p>
              We have no control over these third parties and they have their
              own privacy policies. Neither are we responsible for the activities
              and practices of these third parties. You should contact them
              directly and read their privacy policies for any questions. You
              also agree that your use of these third-party websites is solely at
              your risk.
            </p>

            <h2 className="mt-12 text-xl font-bold text-[var(--foreground)] md:text-2xl">
              Disclosure of Your Information
            </h2>
            <p>
              As a general rule, we do not disclose your personal information to
              third parties without your consent with the exception of the
              following circumstances:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                We may disclose your information to our trusted third parties
                that work with us such as our website hosting partners, email
                marketing service provider, other service providers that assist
                in the operation of the website, and any other affiliates and
                subsidiaries we rely upon to provide you products and services
                offered here.
              </li>
              <li>
                We may disclose your information in order to comply with state
                or federal regulations related to copyright infringement
                lawsuits or any other legal claims related to the website.
              </li>
              <li>
                We may disclose your information to our successor and/or
                acquiring party in the event of a merger, acquisition,
                restructuring, dissolution or partial sale in the future.
                However, your personal information will be transferred to the
                acquiring party in accordance with this privacy policy.
              </li>
            </ul>

            <h2 className="mt-12 text-xl font-bold text-[var(--foreground)] md:text-2xl">
              Email Marketing
            </h2>
            <p>
              You have the option of opting in or unsubscribing from our email
              list. By subscribing and opting in, you agree to receive
              newsletters, updates, messages, promotional materials and any
              other content related to this website. When you send an email, your
              email message along with email address and responses are saved for
              communication purposes with you. This information is kept
              confidential and we do not share, sell or trade your email
              information with third parties except as otherwise stated in this
              privacy policy.
            </p>
            <p>
              If you are in the European Union and opt-in to receive any of our
              free products or services and/or purchase any products or services
              through our website then you will be subscribed to receive our free
              email newsletter once you affirmatively consent to it. Please see
              the Opt-Out section below should you wish to &quot;unsubscribe&quot;
              and not receive any emails from us.
            </p>
            <p>
              But if you are NOT in the European Union then you will be
              automatically subscribed to receive our free email newsletter once
              you opt-in to receive any of our free products or services and/or
              purchase any products or services through our website. Please see
              the Opt-Out section below should you wish to &quot;unsubscribe&quot;
              and not receive any emails from us.
            </p>

            <h2 className="mt-12 text-xl font-bold text-[var(--foreground)] md:text-2xl">
              Opt-Out
            </h2>
            <p>
              We comply with the CAN-SPAM Act of 2003 and do not spam or send
              misleading information. Should you wish to no longer receive
              communication from us, you have the option of unsubscribing by
              clicking &quot;unsubscribe&quot; at the bottom of the email we send to you
              or by contacting us.
            </p>
            <p>
              As for third party websites, please contact them directly to
              unsubscribe and/or opt-out from their communications.
            </p>
            <p>
              We are in compliance with the GDPR along with the email marketing
              service we use to collect your data.
            </p>

            <h2 className="mt-12 text-xl font-bold text-[var(--foreground)] md:text-2xl">
              GDPR Visitor Rights
            </h2>
            <p>
              Under the GDPR, if you are within the European Union, you are
              entitled to certain rights and information listed below.
            </p>
            <p>We will retain any information you choose to provide to us until the earlier of:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                You ask us to delete the information by sending a request to{" "}
                <a
                  href="mailto:info@acquiretoscale.com"
                  className="text-[var(--accent)] hover:underline"
                >
                  info@acquiretoscale.com
                </a>
                . Please note that such requests may result in you no longer
                being able to access paid or free content previously provided to
                you.
              </li>
              <li>Our decision to cease using our existing data providers.</li>
              <li>
                The Company decides to no longer be in business or continue to
                offer the services.
              </li>
              <li>
                The data is no longer needed to provide you service, is too
                costly to maintain further retention, or the Company finds it
                outdated.
              </li>
            </ul>
            <ul className="list-disc space-y-2 pl-6">
              <li>You have the right to request access to your data that we store and have the ability to access your personal data.</li>
              <li>You have the right to either rectify or erase your personal data. You have the right to verify the accuracy of your personal data and have it corrected or removed completely.</li>
              <li>You have the right to seek restrictions on the processing of your data. When you restrict the processing of your data, we can store your data but cannot process it further.</li>
              <li>You have the right to object to the processing of your data in certain circumstances including but not limited to direct marketing, profiling, scientific or historical research purposes, statistical purposes, automated decision making and profiling and tasks based on legitimate interests or in the public interest/exercise of official authority.</li>
              <li>You have the right to the portability of your data. You have the right to request your personal data from us, receive it and transfer it to another controller.</li>
              <li>You have the right to withdraw consent at any time. If you have provided consent to the Company&apos;s processing of your personal data, you have the right to withdraw that consent any time without affecting the lawfulness of processing based upon consent that occurred prior to your withdrawal of consent.</li>
              <li>You have the right to lodge a complaint with a supervisory authority that has jurisdiction over issues related to the General Data Protection Regulation.</li>
            </ul>
            <p>
              We require only the information that is reasonably necessary to
              enter into a contract with you. We will not require you to provide
              consent for any unnecessary processing as a condition of entering
              into a contract with us.
            </p>

            <h2 className="mt-12 text-xl font-bold text-[var(--foreground)] md:text-2xl">
              Your Rights Under the California Online Privacy Protection Act (CalOPPA)
            </h2>
            <p>
              We do not support Do Not Track (&quot;DNT&quot;). Do Not Track is a
              preference you can set in your web browser to inform websites that
              you do not want to be tracked. You can enable or disable Do Not
              Track by visiting the Preferences or Settings page of your web
              browser. In addition to the rights as explained in this Policy,
              California residents who provide Personal Information (as defined
              in the statute) to obtain products or services for personal,
              family, or household use are entitled to request and obtain from us,
              once a calendar year, information about the Personal Information
              we shared, if any, with other businesses for marketing uses. If
              applicable, this information would include the categories of
              Personal Information and the names and addresses of those
              businesses with which we shared such personal information for the
              immediately prior calendar year (e.g., requests made in the
              current year will receive information about the prior year). To
              obtain this information please contact us.
            </p>
            <p>
              If you are a California resident, California law may provide you
              with additional rights regarding our use of your personal
              information. To learn more about your California privacy rights,
              visit{" "}
              <a
                href="https://oag.ca.gov/privacy/ccpa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                https://oag.ca.gov/privacy/ccpa
              </a>
              .
            </p>

            <h2 className="mt-12 text-xl font-bold text-[var(--foreground)] md:text-2xl">
              Security
            </h2>
            <p>
              The security of your personal information is important to us, and
              we strive to follow generally commercial industry standards to
              protect your personal information submitted to us voluntarily and
              automatically. However, no method of transmission over the
              Internet is 100% secure and we cannot guarantee the absolute
              security of your information. When you make a credit card purchase
              or purchase through any means on the website, you will be directed
              to a third-party vendor to complete the transaction. Any
              information you provide during the checkout process is not stored on
              our website but instead provided to the third-party vendor that
              completes the purchase transaction.
            </p>
            <p>
              By using this website, you agree to hold us harmless for any
              security breach and for any unauthorized use of your personal
              information by third parties. You also agree that we cannot be
              held responsible for any disclosure of your information through
              our website without our knowledge and consent.
            </p>

            <h2 className="mt-12 text-xl font-bold text-[var(--foreground)] md:text-2xl">
              Transfer of Data
            </h2>
            <p>
              Your information, including Personal Data, may be transferred to —
              and maintained on — computers located outside of your state,
              province, country or other governmental jurisdiction where the
              data protection laws may differ than those from your jurisdiction.
              If you are located outside United States and choose to provide
              information to us, please note that we may transfer the data,
              including Personal Data, to United States and process it there.
              Your consent to this Privacy Policy followed by your submission of
              such information represents your agreement to that transfer.
              Company will use commercially acceptable means to ensure that your
              data is treated securely and in accordance with this Privacy
              Policy and no transfer of your Personal Data will take place to an
              organization or a country unless there are adequate controls in
              place including the security of your data and other personal
              information.
            </p>

            <h2 className="mt-12 text-xl font-bold text-[var(--foreground)] md:text-2xl">
              Privacy Policy Updates
            </h2>
            <p>
              This privacy policy is effective as of August 1, 2025 and will be
              updated and modified as needed. You are responsible for visiting
              this page periodically to check for future updates to this
              policy. Any modifications to this privacy policy will be effective
              upon our publishing of the new terms, and your continued use of our
              website after the posting of any updates constitutes your
              acceptance of our modified privacy policy.
            </p>

            <h2 className="mt-12 text-xl font-bold text-[var(--foreground)] md:text-2xl">
              Contact
            </h2>
            <p>
              For any questions or comments regarding the privacy policy, please
              contact us at{" "}
              <a
                href="mailto:info@acquiretoscale.com"
                className="text-[var(--accent)] hover:underline"
              >
                info@acquiretoscale.com
              </a>
            </p>
          </div>
        </article>

        <div className="mx-auto mt-12 max-w-3xl px-4">
          <Link
            href="/"
            className="inline-block font-medium text-[var(--accent)] transition hover:underline"
          >
            ← Back to home
          </Link>
        </div>
      </section>
    </div>
  );
}
