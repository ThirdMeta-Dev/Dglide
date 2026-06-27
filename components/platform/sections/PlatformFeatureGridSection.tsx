import { FunctionComponent } from "react";
import Image from "next/image";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";

const FeatureBullet = () => (
  <Image
    src="/living-service/feature-bullet.svg"
    alt=""
    width={21}
    height={13}
    aria-hidden
    className="sol-plat-built-biz-list-icon"
  />
);

const PlatformFeatureGridSection: FunctionComponent = () => (
  <section className="sol-section sol-plat-built-biz-section">
    <SolutionsContainer>
      <header className="sol-plat-built-biz-header">
        <h2 className="sol-plat-built-biz-heading">
          Built for Business Use, Not Just Software Demos
        </h2>
      </header>

      <div className="sol-plat-built-biz-rows" style={{ position: "relative" }}>
        <svg
          width="323"
          height="293"
          viewBox="0 0 323 293"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="sol-plat-built-biz-glow"
          aria-hidden
        >
          <ellipse
            cx="161.5"
            cy="146.5"
            rx="146.5"
            ry="161.5"
            transform="rotate(-90 161.5 146.5)"
            fill="url(#paint0_radial_1598_923)"
            fillOpacity="0.3"
          />
          <defs>
            <radialGradient
              id="paint0_radial_1598_923"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(161.5 146.5) rotate(90) scale(161.5 146.5)"
            >
              <stop stopColor="#8ABFFB" />
              <stop offset="1" stopColor="#F3F3F3" />
            </radialGradient>
          </defs>
        </svg>
        {/* Row 1: Large left (Cloud-Ready) + Small right (Execution Control) */}
        <div className="sol-plat-built-biz-row">
          <article className="sol-plat-built-biz-card sol-plat-built-biz-card--lg">
            <div>
              <Image
                src="/platform/built-for-business/cloud-ready.png"
                alt=""
                width={88}
                height={48}
                className="sol-plat-built-biz-icon"
                aria-hidden
                style={{ marginBottom: 24 }}
              />
              <h3 className="sol-plat-built-biz-card-title">Cloud-Ready Foundation</h3>
              <p className="sol-plat-built-biz-card-desc">
                Built to run real business workflows at scale, with the reliability a live operation depends on.
              </p>
            </div>
            <div className="sol-plat-built-biz-tags">
              <span className="sol-plat-built-biz-tag">Multi-Tenant</span>
              <span className="sol-plat-built-biz-tag">Secure</span>
              <span className="sol-plat-built-biz-tag">Always On</span>
            </div>
          </article>

          <article className="sol-plat-built-biz-card sol-plat-built-biz-card--sm">
            <div>
              <Image
                src="/platform/built-for-business/execution-control.png"
                alt=""
                width={88}
                height={48}
                className="sol-plat-built-biz-icon"
                aria-hidden
                style={{ marginBottom: 24 }}
              />
              <h3 className="sol-plat-built-biz-card-title">Execution Control</h3>
              <p className="sol-plat-built-biz-card-desc">
                Drive work through the system in real time, so execution stays in your control, not in follow-ups.
              </p>
            </div>
            <div className="sol-plat-built-biz-stats">
              <div>
                <p className="sol-plat-built-biz-stat-value">Real Time</p>
                <p className="sol-plat-built-biz-stat-label">Updated Speed</p>
              </div>
              <div>
                <p className="sol-plat-built-biz-stat-value">92%</p>
                <p className="sol-plat-built-biz-stat-label">Efficiency Gain</p>
              </div>
            </div>
          </article>
        </div>

        {/* Row 2: Small left (Integration-Ready) + Large right (One Connected) */}
        <div className="sol-plat-built-biz-row">
          <article className="sol-plat-built-biz-card sol-plat-built-biz-card--sm">
            <div>
              <Image
                src="/platform/built-for-business/integration-ready.png"
                alt=""
                width={88}
                height={48}
                className="sol-plat-built-biz-icon"
                aria-hidden
                style={{ marginBottom: 24 }}
              />
              <h3 className="sol-plat-built-biz-card-title">Integration-Ready</h3>
              <p className="sol-plat-built-biz-card-desc">
                Connect to the CRM, ERP, and tools you already run, so DGlide extends your stack instead of replacing it.
              </p>
            </div>
          </article>

          <article className="sol-plat-built-biz-card sol-plat-built-biz-card--lg">
            <div>
              <Image
                src="/platform/built-for-business/one-connected.png"
                alt=""
                width={88}
                height={48}
                className="sol-plat-built-biz-icon"
                aria-hidden
                style={{ marginBottom: 24 }}
              />
              <h3 className="sol-plat-built-biz-card-title">One Connected Operation</h3>
              <p className="sol-plat-built-biz-card-desc">
                Service, sales, and operations run on one backbone, so work and handoffs stay connected end to end.
              </p>
            </div>
            <div className="sol-plat-built-biz-list">
              <span className="sol-plat-built-biz-list-item">
                <FeatureBullet />
                Automated Operational Flows
              </span>
              <span className="sol-plat-built-biz-list-item">
                <FeatureBullet />
                Workflow Coordination
              </span>
            </div>
          </article>
        </div>
      </div>
    </SolutionsContainer>
  </section>
);

export default PlatformFeatureGridSection;
