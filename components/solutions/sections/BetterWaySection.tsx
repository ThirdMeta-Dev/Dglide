import { FunctionComponent } from "react";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import {
  customBuildItems,
  hubCenterItems,
  rigidToolsItems,
} from "@/data/solutionsPageData";

const HubHeaderIcon: FunctionComponent = () => (
  <img
    src="/solutions/orange-bg.svg"
    alt=""
    width={48}
    height={48}
    className="sol-better-way-hub-header-icon"
    aria-hidden
  />
);

const ListIcon: FunctionComponent = () => (
  <span className="sol-better-way-list-icon" aria-hidden>
    <img src="/solutions/section-1-icon.svg" alt="" width={24} height={24} />
  </span>
);

const HubListIcon: FunctionComponent = () => (
  <span className="sol-better-way-hub-list-icon" aria-hidden>
    <img src="/solutions/section-1-icon.svg" alt="" width={24} height={24} />
  </span>
);

const BetterWaySection: FunctionComponent = () => (
  <section className="sol-section sol-better-way-section">
    <SolutionsContainer>
      <div className="sol-better-way-inner">
        <header className="sol-better-way-header">
          <h2 className="sol-better-way-heading">
            There&apos;s a Better Way to Run Operations
          </h2>
          <p className="sol-better-way-description">
            Lorem ipsim is simply model is not one product. It is a connected
            stack of regenerative Lorem Lorem Ipsum is simply dummy text of the
            printing and Lorem Ipsum is simply Lorem
          </p>
        </header>

        <div className="sol-better-way-visual">
          <div className="sol-better-way-visual-bg" aria-hidden />

          <div className="sol-better-way-visual-panel">
            <div className="sol-better-way-diagram">
              <div className="sol-better-way-rings" aria-hidden>
                <div className="sol-better-way-ring sol-better-way-ring--1" />
                <div className="sol-better-way-ring sol-better-way-ring--2" />
                <div className="sol-better-way-ring sol-better-way-ring--3" />
                <div className="sol-better-way-ring sol-better-way-ring--4" />
              </div>

              <div className="sol-better-way-side sol-better-way-side--left">
                <div className="sol-better-way-side-header">
                  <HubHeaderIcon />
                  <h3 className="sol-better-way-side-title">Rigid Tools</h3>
                </div>
                <div className="sol-better-way-side-list">
                  <div className="sol-better-way-side-line" aria-hidden />
                  {rigidToolsItems.map((item) => (
                    <div key={item} className="sol-better-way-side-item">
                      <ListIcon />
                      <span className="sol-better-way-side-item-text">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sol-better-way-hub">
                <h3 className="sol-better-way-hub-title">Dglide Platform</h3>
                <ul className="sol-better-way-hub-list">
                  {hubCenterItems.map((item) => (
                    <li key={item} className="sol-better-way-hub-item">
                      <HubListIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sol-better-way-side sol-better-way-side--right">
                <div className="sol-better-way-side-header">
                  <HubHeaderIcon />
                  <h3 className="sol-better-way-side-title">Custom Build</h3>
                </div>
                <div className="sol-better-way-side-list">
                  <div className="sol-better-way-side-line" aria-hidden />
                  {customBuildItems.map((item) => (
                    <div key={item} className="sol-better-way-side-item">
                      <span className="sol-better-way-side-item-text">
                        {item}
                      </span>
                      <ListIcon />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="sol-better-way-footer-bar">
              {[1, 2, 3].map((i) => (
                <div key={i} className="sol-better-way-footer-item">
                  <img
                    src="/solutions/orange-blue-icon.svg"
                    alt=""
                    width={36}
                    height={36}
                    className="sol-better-way-tailor-icon"
                    aria-hidden
                  />
                  <span className="sol-better-way-footer-text">
                    Tailor-Made Technology
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SolutionsContainer>
  </section>
);

export default BetterWaySection;
