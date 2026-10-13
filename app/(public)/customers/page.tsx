import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CUSTOMERS } from "@/data/customersData";
import "@/components/customers/customers.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.dglide.com";

export const metadata: Metadata = {
  title: { absolute: "DGlide Customers: How Manufacturers Use DGlide" },
  description:
    "See the manufacturers that run on DGlide and how each one uses it, from CRM and IndiaMART leads to production, field service, WhatsApp requests and ticketing.",
  alternates: { canonical: "/customers" },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "DGlide Customers",
      url: `${SITE_URL}/customers`,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: CUSTOMERS.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          url: `${SITE_URL}/customers#${c.slug}`,
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Customers", item: `${SITE_URL}/customers` },
      ],
    },
  ],
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function CustomersRoute() {
  return (
    <div className="cust-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="cust-hero">
        <div className="cust-container">
          <nav className="cust-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <span>Customers</span>
          </nav>
          <p className="cust-eyebrow">Customers</p>
          <h1>DGlide Customers and How They Use It</h1>
          <p className="cust-lead">
            Manufacturers across India run sales, production, service and support on DGlide. Each one uses it differently. Here is what each customer runs.
          </p>
        </div>
      </section>

      <div className="cust-container">
        <ul className="cust-list">
          {CUSTOMERS.map((customer) => (
            <li className="cust-row" id={customer.slug} key={customer.slug}>
              <div className="cust-id">
                {customer.logo ? (
                  <span className="cust-logo">
                    <Image src={customer.logo} alt={`${customer.name} logo`} width={140} height={72} />
                  </span>
                ) : (
                  <span className="cust-monogram" aria-hidden="true">
                    {initials(customer.name)}
                  </span>
                )}
                <div>
                  <h2>{customer.name}</h2>
                  <p>{customer.industry}</p>
                </div>
              </div>
              <div>
                <p className="cust-summary">{customer.summary}</p>
                <ul className="cust-tags" aria-label={`What ${customer.name} uses DGlide for`}>
                  {customer.useCases.map((useCase) => (
                    <li key={useCase}>{useCase}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <section className="cust-cta">
        <div className="cust-container">
          <p>Want to see how DGlide would run in your business?</p>
          <Link className="cust-btn" href="/schedule-demo?src=customers">
            Book a Demo
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
