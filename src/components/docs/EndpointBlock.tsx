'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import clsx from 'clsx';

type Field = { name: string; type: string; example: string; desc: string };
export type Endpoint = { id: string; title: string; method: string; path: string; summary: string; headers: { name: string; value: string }[]; examples: { label: string; body: string }[]; fields: Field[]; response: string | null; failure?: string | null; errors?: { message: string; cause: string }[]; notes: string[] };

const LANGS = ['cURL', 'Node.js', 'Python'] as const;
type Lang = (typeof LANGS)[number];

function sample(lang: Lang, method: string, url: string, headers: Endpoint['headers'], body: string) {
  const hasBody = method !== 'GET' && body.trim().length > 2;
  if (lang === 'cURL') {
    const h = headers.map((x) => `  -H '${x.name}: ${x.value}'`).join(' \\\n');
    return `curl -X ${method} '${url}' \\\n${h}${hasBody ? ` \\\n  -d '${body}'` : ''}`;
  }
  if (lang === 'Node.js') {
    const h = headers.map((x) => `    '${x.name}': '${x.value}',`).join('\n');
    return `const response = await fetch('${url}', {\n  method: '${method}',\n  headers: {\n${h}\n  },${hasBody ? `\n  body: JSON.stringify(${body.split('\n').join('\n  ')}),` : ''}\n});\nconst data = await response.json();`;
  }
  const h = headers.map((x) => `    "${x.name}": "${x.value}",`).join('\n');
  return `import json, requests\n\nheaders = {\n${h}\n}${hasBody ? `\npayload = json.loads("""${body}""")` : ''}\nresponse = requests.request("${method}", "${url}", headers=headers${hasBody ? ', json=payload' : ''})\nprint(response.json())`;
}

function CodePanel({ title, code, right }: { title: string; code: string; right?: React.ReactNode }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch {} };
  return (
    <div className="overflow-hidden rounded-xl border border-[#1E293B] bg-[#0B1220]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
        <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#94A3B8]">{title}</span>
        <div className="flex items-center gap-2">
          {right}
          <button type="button" onClick={copy} aria-label={`Copy ${title}`} className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[12px] font-medium text-[#CBD5E1] hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#04B5F9]">
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}{copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
      <pre className="max-h-[420px] overflow-auto p-4 text-[13px] leading-relaxed text-[#E2E8F0]"><code>{code}</code></pre>
    </div>
  );
}

export default function EndpointBlock({ endpoint, baseUrl }: { endpoint: Endpoint; baseUrl: string }) {
  const [lang, setLang] = useState<Lang>('cURL');
  const [ex, setEx] = useState(0);
  const [res, setRes] = useState<'ok' | 'fail'>('ok');
  const body = endpoint.examples[ex]?.body ?? '';
  const url = `${baseUrl}${endpoint.path}`;
  return (
    <section id={endpoint.id} className="scroll-mt-28 border-t border-slate-200 py-10 first:border-t-0">
      <div className="grid gap-8 xl:grid-cols-2">
        <div className="min-w-0">
          <h3 className="text-[22px] font-semibold text-[#0F172A]">{endpoint.title}</h3>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className={clsx('rounded-md px-2 py-1 text-[12px] font-bold', endpoint.method === 'GET' ? 'bg-[#E0F2FE] text-[#0369A1]' : 'bg-[#DCFCE7] text-[#166534]')}>{endpoint.method}</span>
            <code className="break-all rounded-md bg-[#F1F5F9] px-2 py-1 text-[13px] text-[#0F172A]">{endpoint.path}</code>
          </div>
          <p className="mt-4 text-[15px] leading-relaxed text-[#334155]">{endpoint.summary}</p>

          <h4 className="mt-6 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#64748B]">Headers</h4>
          <div className="mt-2 overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-left text-[13px]"><tbody>
              {endpoint.headers.map((h) => (<tr key={h.name} className="border-b border-slate-100 last:border-0"><td className="px-3 py-2 font-mono font-semibold text-[#0F172A]">{h.name}</td><td className="px-3 py-2 font-mono text-[#475569]">{h.value}</td></tr>))}
            </tbody></table>
          </div>

          {endpoint.fields.length > 0 && (<>
            <h4 className="mt-6 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#64748B]">Request body</h4>
            <div className="mt-2 overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full text-left text-[13px]">
                <thead className="bg-[#F8FAFC] text-[#64748B]"><tr><th className="px-3 py-2 font-semibold">Field</th><th className="px-3 py-2 font-semibold">Type</th><th className="px-3 py-2 font-semibold">Description</th></tr></thead>
                <tbody>{endpoint.fields.map((f) => (<tr key={f.name} className="border-t border-slate-100 align-top"><td className="px-3 py-2 font-mono font-semibold text-[#0F172A]">{f.name}</td><td className="px-3 py-2 text-[#475569]">{f.type}</td><td className="px-3 py-2 text-[#475569]">{f.desc || <span className="text-[#94A3B8]">Example: {f.example}</span>}</td></tr>))}</tbody>
              </table>
            </div>
          </>)}

          {endpoint.errors && endpoint.errors.length > 0 && (<>
            <h4 className="mt-6 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#64748B]">Error messages</h4>
            <div className="mt-2 overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full text-left text-[13px]">
                <thead className="bg-[#F8FAFC] text-[#64748B]"><tr><th className="px-3 py-2 font-semibold">Message</th><th className="px-3 py-2 font-semibold">Cause</th></tr></thead>
                <tbody>{endpoint.errors.map((e) => (<tr key={e.message} className="border-t border-slate-100 align-top"><td className="px-3 py-2 font-mono text-[#0F172A]">{e.message}</td><td className="px-3 py-2 text-[#475569]">{e.cause}</td></tr>))}</tbody>
              </table>
            </div>
          </>)}

          {endpoint.notes.length > 0 && (<ul className="mt-6 space-y-2">{endpoint.notes.map((n) => (<li key={n} className="rounded-lg border border-[#BFDBFE] bg-[#EFF6FF] px-3 py-2 text-[13px] leading-relaxed text-[#1E3A8A]">{n}</li>))}</ul>)}
        </div>

        <div className="min-w-0 space-y-4 xl:sticky xl:top-28 xl:self-start">
          {endpoint.examples.length > 1 && (
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Request example">
              {endpoint.examples.map((e, i) => (<button key={e.label} type="button" role="tab" aria-selected={i === ex} onClick={() => setEx(i)} className={clsx('rounded-full border px-3 py-1 text-[12px] font-semibold', i === ex ? 'border-[#0457F1] bg-[#0457F1] text-white' : 'border-slate-200 bg-white text-[#334155] hover:border-[#0457F1]')}>{e.label}</button>))}
            </div>
          )}
          <CodePanel title="Request" code={sample(lang, endpoint.method, url, endpoint.headers, body)}
            right={<div className="flex rounded-md bg-white/5 p-0.5" role="tablist" aria-label="Language">{LANGS.map((l) => (<button key={l} type="button" role="tab" aria-selected={l === lang} onClick={() => setLang(l)} className={clsx('rounded px-2 py-1 text-[12px] font-medium', l === lang ? 'bg-white text-[#0B1220]' : 'text-[#CBD5E1] hover:text-white')}>{l}</button>))}</div>} />
          {endpoint.response
            ? <CodePanel title="Response" code={res === 'fail' && endpoint.failure ? endpoint.failure : endpoint.response}
                right={endpoint.failure ? <div className="flex rounded-md bg-white/5 p-0.5" role="tablist" aria-label="Response example">{([['ok', 'Success'], ['fail', 'Failure']] as const).map(([k, l]) => (<button key={k} type="button" role="tab" aria-selected={res === k} onClick={() => setRes(k)} className={clsx('rounded px-2 py-1 text-[12px] font-medium', res === k ? 'bg-white text-[#0B1220]' : 'text-[#CBD5E1] hover:text-white')}>{l}</button>))}</div> : undefined} />
            : <div className="rounded-xl border border-dashed border-slate-300 bg-[#F8FAFC] px-4 py-3 text-[13px] text-[#64748B]">A sample response for this call has not been published yet.</div>}
        </div>
      </div>
    </section>
  );
}
