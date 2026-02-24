#!/usr/bin/env node
/**
 * Seed the Operators Playbook blog post into Supabase.
 * Run: node scripts/seed-operators-playbook.js
 * Requires ONE of:
 *   - SUPABASE_SERVICE_ROLE_KEY (Project Settings → API → service_role secret)
 *   - SUPABASE_DB_URL or DATABASE_URL (Project Settings → Database → Connection string)
 */
require("dotenv").config({ path: ".env.local" });
const { Client } = require("pg");
const { createClient } = require("@supabase/supabase-js");

const POST = {
  title: "The Operator's Playbook: A Due Diligence Checklist for Smaller Content Website Deals",
  slug: "operators-playbook-due-diligence-checklist",
  meta_description:
    "A fluff-free, battle-tested due diligence process for acquiring content websites in the small-deal range. Valuation, traffic analysis, P&L verification, and non-negotiables to avoid costly mistakes.",
  featured: true,
  status: "published",
  content: `<p>In the world of digital acquisitions, most beginners are obsessed with finding the next "perfect" deal. Seasoned operators, however, know the real game is about avoiding disasters.</p>
<p>I've seen buyers lose six-figure sums on "passive" content sites that imploded just 90 days after the deal closed. They bought the dream and inherited a nightmare.</p>
<p>This is my fluff-free, battle-tested due diligence process for acquiring content websites in the <strong>small-deal range</strong>. While this guide is tailored for <a href="/due-diligence/content-websites">content sites</a>—the most beginner-friendly digital asset, in my opinion—many of these principles apply to <a href="/due-diligence/saas-apps">SaaS</a>, YouTube channels, newsletters, and other online businesses. Let's dive in.</p>

<h2>Quick navigation</h2>
<ul>
<li><a href="#1-valuation-your-north-star-for-a-smart-acquisition">1. Valuation: Your North Star for a Smart Acquisition</a></li>
<li><a href="#2-traffic-analysis-separating-real-visitors-from-red-flags">2. Traffic Analysis: Separating Real Visitors from Red Flags</a></li>
<li><a href="#3-monetization--profit-and-loss-pl">3. Monetization & Profit and Loss (P&L)</a></li>
<li><a href="#4-operational-structure-can-you-run-this-business">4. Operational Structure: Can You Run This Business?</a></li>
<li><a href="#5-transferability-ensuring-a-smooth-handover">5. Transferability: Ensuring a Smooth Handover</a></li>
<li><a href="#6-scalability-your-vision-for-growth">6. Scalability: Your Vision for Growth</a></li>
<li><a href="#7-non-negotiables-protect-your-investment">7. Non-Negotiables: Protect Your Investment</a></li>
<li><a href="#8-readiness--infrastructure-are-you-prepared-to-operate">8. Readiness & Infrastructure: Are You Prepared to Operate?</a></li>
<li><a href="#acquisition-timeframes-what-to-expect">Acquisition Timeframes: What to Expect</a></li>
<li><a href="#conclusion">Conclusion</a></li>
</ul>

<hr>

<h2 id="1-valuation-your-north-star-for-a-smart-acquisition">1. Valuation: Your North Star for a Smart Acquisition</h2>
<p>Before you even think about due diligence, you need to understand valuation. It's your anchor in a sea of overpriced listings.</p>
<p>According to recent market data from <a href="https://flippa.com" rel="noopener noreferrer">Flippa</a>, content websites typically trade for a multiple of their annual net profit—ranging from 2.0x for smaller sites to over 4.0x for well-established ones with diversified assets like an email list or social media following.</p>
<p>So what does a "2.3x multiple" actually mean? In simple terms: if a website generated a verified net profit of $14,400 over the last twelve months (TTM), its baseline market value is $33,120 ($14,400 × 2.3). If you pay that price today, you can expect to earn back your initial investment in approximately 2.3 years, assuming the cash flow remains stable.</p>
<blockquote><strong>Key takeaway:</strong> Always calculate valuation based on <strong>net profit</strong>, not revenue. A site making $100,000 a month with $88,000 in expenses has a monthly profit of $12,000. That's the number that matters.</blockquote>

<h2 id="2-traffic-analysis-separating-real-visitors-from-red-flags">2. Traffic Analysis: Separating Real Visitors from Red Flags</h2>
<p>Traffic is the lifeblood of any content site, but not all traffic is created equal. Your job is to verify its quality, source, and sustainability.</p>

<h3>Organic vs. paid traffic</h3>
<p>A critical first step is to distinguish between organic and paid traffic. A heavy reliance on paid ads can be a red flag if the margins aren't sustainable. Scrutinize the traffic sources: if 80% of traffic originates from a single platform like Pinterest, a sudden algorithm change could decimate the site overnight.</p>
<p>Always request guest access to <strong>Google Analytics 4 (GA4)</strong> to independently verify acquisition channels.</p>

<h3>Red flags to watch for</h3>
<p>Be wary of inflated traffic numbers—a disproportionate amount (e.g., ~70%) listed as "direct" traffic in tools like SimilarWeb could indicate bot activity. The geographic quality of traffic is also crucial; ensure it aligns with the site's monetization strategy, as traffic from countries with low purchasing power may be difficult to monetize effectively.</p>
<p>Low engagement metrics, such as only a few seconds per visit, can further suggest bot traffic.</p>

<h3>Trends and seasonality</h3>
<p>Observe traffic trends: consistent growth is desirable, while random spikes driven by fleeting trends can lead to rapid declines. For seasonal businesses, demand at least two to three years of GA4 data to confirm predictable patterns.</p>

<h3>Other considerations</h3>
<p>Assess trademark risk—a domain name infringing on trademarks (e.g., "NikeDealsHub.com") can lead to severe penalties, including loss of ad/affiliate accounts or legal action. Prioritize established sites (12–24 months old or more); anything under 12 months is generally too new to provide reliable data.</p>
<p>A significant traffic concentration—where 40% or more of the site's traffic comes from just one or two articles—is a red flag that could reduce valuation. Finally, investigate backlink quality; a heavy reliance on Private Blog Networks (PBNs) or spammy links can trigger a Google penalty, wiping out organic traffic.</p>

<h2 id="3-monetization--profit-and-loss-pl">3. Monetization & Profit and Loss (P&L)</h2>
<p>Understanding how a content site truly makes money, and what it costs to operate, is paramount. Don't just take the seller's word for it—verify everything.</p>

<h3>Geographic restrictions and penalty history</h3>
<p>First, confirm the geographic restrictions of the primary monetization method; some affiliate programs have strict regional limitations. Investigate the penalty history of the site; if it has ever been banned from Google AdSense or an affiliate network, <strong>walk away</strong>—your own accounts could be at risk.</p>

<h3>Verifying earnings and expenses</h3>
<p>For earnings verification, request screen share or guest access to all affiliate, AdSense, and other monetization accounts. Screenshots are easily faked.</p>
<p>Beyond basic domain and hosting fees, identify all ongoing expenses: content production, virtual assistant (VA) hours, and premium tool subscriptions can significantly erode profit. Demand 12 months of detailed expense records—for example, a 10,000+ email list can cost around $150/month on platforms like GetResponse.</p>

<h3>P&L scrutiny</h3>
<p>Scrutinize the actual P&L statement to ensure the business is genuinely profitable and expenses are not understated. Analyze revenue trends for consistent, sustainable growth rather than anomalies or recent spikes. If revenue spikes in Q4, confirm this seasonality with at least two years of data to avoid buying into a dying trend.</p>

<h2 id="4-operational-structure-can-you-run-this-business">4. Operational Structure: Can You Run This Business?</h2>
<p>Even the most profitable site can become a burden if its operations are unsustainable or overly dependent on the seller.</p>
<p>Consider the content velocity: does the site demand dozens of new articles daily? If so, do you have a strategy to automate or efficiently manage this volume?</p>
<blockquote>A major red flag is <strong>owner dependency</strong>—where any critical function of the business is tied exclusively to the seller. You want a business that can run without constant intervention from its previous owner.</blockquote>
<p>Get a clear breakdown of all recurring operational costs. Secure team contacts for all freelancers, contractors, or team members before closing—their continued involvement can be crucial for a smooth transition.</p>
<p>Finally, realistically assess the time commitment. A seller claiming "5 hours/week" often translates to 15+ hours in reality.</p>

<h2 id="5-transferability-ensuring-a-smooth-handover">5. Transferability: Ensuring a Smooth Handover</h2>
<p>A successful acquisition hinges on a seamless transfer of all assets and knowledge.</p>
<p>Evaluate seller responsiveness; a communicative and helpful seller is essential for post-close support, especially during the initial transition period. Most sellers offer a few days of post-acquisition support for deals above $10,000.</p>
<p>Obtain a comprehensive asset checklist including:</p>
<ul>
<li>The domain</li>
<li>Email list</li>
<li>Affiliate accounts</li>
<li>Social media profiles</li>
<li>Content management system access</li>
</ul>
<p>For off-market deals, ensure the seller is willing to transact through a reputable broker or escrow service.</p>

<h2 id="6-scalability-your-vision-for-growth">6. Scalability: Your Vision for Growth</h2>
<p>Don't just buy a business; buy a platform for growth. What's your strategy to scale?</p>
<p>Identify growth levers such as: doubling traffic by filling content gaps, implementing email monetization, or expanding into new geographic markets. Ensure this is a strategic acquisition that aligns with your long-term vision—not an impulse buy.</p>
<p>Enter the game with a game plan.</p>

<h2 id="7-non-negotiables-protect-your-investment">7. Non-Negotiables: Protect Your Investment</h2>
<p>These are the absolute must-haves to protect yourself from significant losses.</p>
<ol>
<li><strong>Live Google Search Console (GSC) guest access</strong> is non-negotiable. It reveals critical data: search queries, indexing errors, and potential penalties. Without it, you can't see if Google is about to "nuke" the site. I once skipped GA4 verification on a $9,000 deal where the seller showed screenshots of 30,000 visits/month. Post-close, the site had only 2,100 real visits—a $6,200 loss. Never again.</li>
<li><strong>Live earnings access</strong> via guest access or screen share for all earnings platforms: Stripe, affiliate accounts, AdSense, and subscriber lists.</li>
<li><strong>Always use an escrow service</strong> (e.g., Flippa, Acquire.com, or a dedicated third-party service). You pay into escrow; the seller receives funds only after all assets are delivered and verified. The fee is worth every penny.</li>
<li>For off-market deals, <strong>verify the seller's identity</strong> through social profiles or a Know Your Customer (KYC) platform.</li>
</ol>

<h2 id="8-readiness--infrastructure-are-you-prepared-to-operate">8. Readiness & Infrastructure: Are You Prepared to Operate?</h2>
<p>Acquiring a business is one thing; being ready to operate it is another.</p>
<p>Understand that company entities, Stripe accounts, and bank accounts are generally not transferable. Do you have the necessary infrastructure in place for post-acquisition operations? Some affiliate programs also have country-specific restrictions.</p>
<p>Have proof of funds ready—many sellers, especially on platforms like Acquire.com or Flippa, won't engage without verified funds. This should be prepared before reaching out, signing an NDA, or requesting data room access.</p>
<p>For larger, more complex deals, consider hiring an M&A advisor or attorney (expect $5,000–$15,000). For small deals, this cost rarely justifies the expense; your own thorough due diligence is usually sufficient.</p>
<p>If you need personalized guidance, <a href="/clarity-call">book a clarity call</a> with Acquire To Scale.</p>

<h2 id="acquisition-timeframes-what-to-expect">Acquisition Timeframes: What to Expect</h2>
<p>Understanding typical timelines can help you manage expectations and move efficiently.</p>
<ul>
<li><strong>Deals below $10,000:</strong> Good listings are often snatched up within 24–72 hours. While speed is a factor, never rush your due diligence. The entire process—including due diligence and asset transfer—typically takes under one week.</li>
<li><strong>Deals from $10,000 to $50,000:</strong> Usually sell within 7–30 days, with the process taking a few days to a couple of weeks depending on complexity.</li>
<li><strong>Larger or more complex deals:</strong> Can take several weeks or even months due to increased legal and financial complexities.</li>
</ul>
<p><a href="/due-diligence">Acquire To Scale</a> specializes in small acquisitions, where the asymmetry is highest: sophisticated buyers often overlook this tier, yet operational fixes can yield 3–5x returns.</p>

<h2 id="conclusion">Conclusion</h2>
<p>This playbook covers the essential steps to prepare you better than 90% of beginners entering digital acquisitions.</p>
<p>Remember: the goal isn't just to buy a business—it's to acquire a <strong>scalable asset</strong> that aligns with your strategic vision. Stay vigilant, verify everything, and approach every deal with the discerning eye of an operator.</p>
<p>This list will be updated as market dynamics evolve.</p>

<hr>

<p><strong>Ready to acquire your next scalable asset?</strong></p>
<p>Need personalized insights? Whether you're scaling an existing venture, looking to sell, require a deal review, or simply want to pick the brain of a seasoned operator, <a href="/clarity-call">book a clarity call</a> with Acquire To Scale. We're here to help you move with confidence.</p>`,
};

async function seedViaSupabase() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  const { error } = await supabase.from("blog_posts").upsert(
    {
      title: POST.title,
      slug: POST.slug,
      content: POST.content,
      meta_description: POST.meta_description,
      featured: POST.featured,
      status: POST.status,
    },
    { onConflict: "slug" }
  );
  if (error) throw error;
}

async function seedViaPg() {
  const dbUrl = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;
  const client = new Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });
  await client.connect();
  await client.query(
    `INSERT INTO blog_posts (title, slug, content, meta_description, featured, status, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, now(), now())
     ON CONFLICT (slug) DO UPDATE SET
       title = EXCLUDED.title,
       content = EXCLUDED.content,
       meta_description = EXCLUDED.meta_description,
       featured = EXCLUDED.featured,
       status = EXCLUDED.status,
       updated_at = now()`,
    [POST.title, POST.slug, POST.content, POST.meta_description, POST.featured, POST.status]
  );
  await client.end();
}

async function seed() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const dbUrl = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;

  if (serviceRoleKey && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.log("Seeding via Supabase API (service role)...");
    await seedViaSupabase();
  } else if (dbUrl) {
    console.log("Seeding via database connection...");
    await seedViaPg();
  } else {
    console.error(
      "Error: Add one of these to .env.local:\n" +
        "  • SUPABASE_SERVICE_ROLE_KEY (Dashboard → Project Settings → API → service_role)\n" +
        "  • SUPABASE_DB_URL (Dashboard → Project Settings → Database → Connection string)"
    );
    process.exit(1);
  }

  console.log(`✓ Seeded: ${POST.title}`);
  console.log(`  Slug: ${POST.slug}`);
  console.log("\nGo to /admin to edit, add author, featured image, etc.");
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
