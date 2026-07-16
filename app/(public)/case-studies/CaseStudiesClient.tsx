"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import styles from "./CaseStudiesPage.module.css";
import mobileFix from "./CaseStudiesMobileFix.module.css";

type CaseStudy = { id:number; company:string; logo:string; category:string; title:string; excerpt:string; person:string; role:string; metricOne:string; metricOneLabel:string; metricTwo:string; metricTwoLabel:string };
const CATEGORIES = ["Operations","Field Service","Workflow & Process","Configurable vs Custom","Continuous Fit (LSM)","Industry Insights"];
const STUDIES: CaseStudy[] = [
  { id:1, company:"Clarion", logo:"/case-studies/logos/clarion.svg", category:"Field Service", title:"Lorem Ipsum is simply dummy text of the type", excerpt:"Lorem Ipsum is simply dummy text of the printing and typesetting Lorem ipsum is simply Lorem Ipsum is.", person:"Mr Lorem Ipsum,", role:"lorem ipsum is simply dum", metricOne:"3X", metricOneLabel:"Lead Capture", metricTwo:"8 Min", metricTwoLabel:"Response Down From 40+ Lorem Ipsum Is" },
  { id:2, company:"Indo Tech", logo:"/case-studies/logos/indo-tech.svg", category:"Operations", title:"Lorem Ipsum is simply dummy text of the type", excerpt:"Lorem Ipsum is simply dummy text of the printing and typesetting Lorem ipsum is.", person:"Mr Lorem Ipsum,", role:"lorem ipsum is simply dum", metricOne:"3X", metricOneLabel:"Lead Capture", metricTwo:"8 Min", metricTwoLabel:"Response Down From 40+ Lorem Ipsum Is" },
  { id:3, company:"Power2U", logo:"/case-studies/logos/power2u.svg", category:"Workflow & Process", title:"Lorem Ipsum is simply dummy text of the type", excerpt:"Lorem Ipsum is simply dummy text of the printing and typesetting Lorem ipsum is.", person:"Mr Lorem Ipsum,", role:"lorem ipsum is simply dum", metricOne:"3X", metricOneLabel:"Lead Capture", metricTwo:"8 Min", metricTwoLabel:"Response Down From 40+ Lorem Ipsum Is" },
  { id:4, company:"Clarion", logo:"/case-studies/logos/clarion.svg", category:"Continuous Fit (LSM)", title:"Lorem Ipsum is simply dummy text of the type", excerpt:"Lorem Ipsum is simply dummy text of the printing and typesetting Lorem ipsum is.", person:"Mr Lorem Ipsum,", role:"lorem ipsum is simply dum", metricOne:"3X", metricOneLabel:"Lead Capture", metricTwo:"8 Min", metricTwoLabel:"Response Down From 40+ Lorem Ipsum Is" },
];

function Metric({value,label}:{value:string;label:string}){return <div><strong>{value}</strong><span>{label}</span></div>}
function CaseStudyCard({study,featured=false}:{study:CaseStudy;featured?:boolean}){
  if(featured)return <section className={`${styles.featured} ${mobileFix.section}`}><div className={styles.featuredCopy}><h2>The Featured Casestudy</h2><div><h3>{study.title}</h3><p>{study.excerpt} <Link href="/coming-soon">Read More</Link></p></div><div className={styles.personRow}><span className={styles.logoBox}><Image src={study.logo} alt={study.company} width={170} height={36}/></span><strong>{study.person}</strong><span>{study.role}</span></div></div><div className={styles.featuredMetrics}><Metric value={study.metricOne} label={study.metricOneLabel}/><Metric value={study.metricTwo} label={study.metricTwoLabel}/></div></section>;
  return <article className={styles.card}><div className={styles.cardBody}><Image src={study.logo} alt={study.company} width={180} height={36} className={styles.cardLogo}/><div className={styles.cardCopy}><h3>{study.title}</h3><p>{study.excerpt} <Link href="/coming-soon">Read More</Link></p><div className={styles.cardPerson}><strong>{study.person}</strong><span>{study.role}</span></div></div></div><div className={styles.cardMetrics}><Metric value={study.metricOne} label={study.metricOneLabel}/><Metric value={study.metricTwo} label={study.metricTwoLabel}/></div></article>;
}

export default function CaseStudiesClient(){
  const [query,setQuery]=useState(""); const [category,setCategory]=useState(""); const [sort,setSort]=useState("featured"); const libraryRef=useRef<HTMLElement>(null);
  const filtered=useMemo(()=>{const q=query.trim().toLowerCase();const matches=STUDIES.filter(s=>(!q||`${s.company} ${s.title} ${s.excerpt}`.toLowerCase().includes(q))&&(!category||s.category===category));return sort==="company"?[...matches].sort((a,b)=>a.company.localeCompare(b.company)):matches},[category,query,sort]);
  const scrollLibrary=()=>libraryRef.current?.scrollIntoView({behavior:"smooth",block:"start"});
  return <main className={styles.page}>
    <section className={`${styles.hero} ${mobileFix.hero}`}><nav aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><span>Resources</span><span>›</span><strong>Case Study Listing</strong></nav><h1>Practical ideas for running operations<br className={styles.desktopBreak}/> without fighting your tools.</h1><div className={styles.toolbar}><label className={styles.search}><span className="sr-only">Search case studies</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search articles and topics"/><span aria-hidden>⌕</span></label><label className={styles.sort}><span className="sr-only">Sort case studies</span><select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Sort by</option><option value="company">Company A–Z</option></select></label></div></section>
    <section className={`${styles.categorySection} ${mobileFix.section}`} aria-label="Case study categories"><span>Categories</span><div>{CATEGORIES.map(item=><button key={item} type="button" className={category===item?styles.categoryActive:""} onClick={()=>setCategory(category===item?"":item)}>{item}</button>)}</div></section>
    <CaseStudyCard study={STUDIES[0]} featured/>
    <section className={`${styles.library} ${mobileFix.section}`} ref={libraryRef}><h2>The Full Casestudy Library</h2>{filtered.length?<div className={styles.grid}>{filtered.map(study=><CaseStudyCard key={study.id} study={study}/>)}</div>:<p className={styles.empty}>No case studies match this search and category.</p>}<nav className={styles.pagination} aria-label="Case study pagination"><button type="button" disabled>Previous</button><button type="button" className={styles.current}>1</button><button type="button" onClick={scrollLibrary}>2</button><span>…</span><button type="button" onClick={scrollLibrary}>6</button><button type="button" onClick={scrollLibrary}>Next</button></nav></section>
    <section className={`${styles.cta} ${mobileFix.section}`}><span>From insight to action</span><h2>Stop reading about better operations.<br/>Start running them.</h2><Link href="/schedule-demo">Book a Demo <span aria-hidden>→</span></Link></section>
    <section className={`${styles.resources} ${mobileFix.section}`}><h2>Useful Resources To Check</h2><p>Dig into case studies, articles, and operations terms explained simply.</p><div className={styles.resourceLinks}><Link href="/case-studies">Case Studies</Link><Link href="/blogs">Blogs</Link><Link href="/coming-soon">Glossary</Link></div></section>
  </main>;
}
