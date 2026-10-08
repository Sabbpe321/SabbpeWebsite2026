'use client';

import { useState } from 'react';
import { Wrap } from './ui';
import HScroller from './HScroller';

const PARTNERS: [string, string][] = [
  ['Yes Bank', '/yes-bank.png'], ['NTT Data', '/ntt-data.png'], ['Mswipe', '/mswipe.png'], ['Innoviti', '/innoviti.png'],
  ['PAX', '/pax.png'], ['Aisino', '/aisino.png'], ['M2M Telecom', '/m2m-telecom.png'], ['Vi', '/vi.png'],
  ['ValueDesign', '/valuedesign.png'], ['Augmont', '/augmont.png'], ['Google Workspace', '/google-workspace.png'],
  ['DPIIT', '/dpiit.png'], ['Karnataka Startup', '/karnataka.png'], ['NASSCOM', '/nasscom.png'], ['IIM Lucknow', '/iim-lucknow.png'], ['Wadhwani Foundation', '/wadhwani.png'], ['ISO 27001', '/iso-27001.png'],
];

// Voucher brands shown on the homepage. Each tile shows /brands/<file> when that file exists,
// and the brand's name as text until then. See public/brands/README.txt.
const BRANDS: [string, string][] = [
  ['Amazon', 'amazon.png'], ['Flipkart', 'flipkart.png'], ['Myntra', 'myntra.png'], ['Swiggy', 'swiggy.png'], ["Domino's", 'dominos.png'],
  ['PVR', 'pvr.png'], ['MakeMyTrip', 'makemytrip.png'], ['Lifestyle', 'lifestyle.png'], ['AJIO', 'ajio.png'], ['Titan', 'titan.png'],
];

const TILE = 'flex h-20 w-40 shrink-0 snap-start items-center justify-center rounded-xl border border-slate-200 bg-white px-4';

function BrandTile({ name, file }: { name: string; file: string }) {
  const [missing, setMissing] = useState(false);
  return (
    <li className={TILE}>
      {missing
        ? <span className="text-[15px] font-semibold text-[#0F172A]">{name}</span>
        // eslint-disable-next-line @next/next/no-img-element
        : <img src={`/brands/${file}`} alt={name} loading="lazy" onError={() => setMissing(true)} className="max-h-10 max-w-full object-contain" />}
    </li>
  );
}

// Two single-row sliders, so 27 logos take two rows of page height.
export default function PartnersAndBrands() {
  return (
    <section className="border-t border-slate-100 bg-white py-16" aria-labelledby="partners-heading">
      <Wrap>
        <HScroller label="partners" header={<>
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0457F1]">Partners and brands</p>
          <h2 id="partners-heading" className="mt-2 font-display text-[30px] font-bold leading-[1.15] tracking-[-0.025em] text-[#0F172A] sm:text-[36px]">The banks, networks and brands behind SabbPe</h2>
        </>}>
          {PARTNERS.map(([name, src]) => (
            <li key={name} className={TILE}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={name} loading="lazy" className="max-h-11 max-w-full object-contain" />
            </li>
          ))}
        </HScroller>

        <div className="mt-10">
          <HScroller label="Gift360 brands" header={<>
            <h3 className="font-display text-[22px] font-bold tracking-[-0.02em] text-[#0F172A]">Brands on Gift360</h3>
            <p className="mt-1 text-[14px] text-[#64748B]">400+ brand vouchers, with these among the most popular.</p>
          </>}>
            {BRANDS.map(([name, file]) => <BrandTile key={name} name={name} file={file} />)}
          </HScroller>
        </div>
      </Wrap>
    </section>
  );
}
