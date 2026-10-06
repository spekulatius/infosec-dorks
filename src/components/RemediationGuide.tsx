import React from 'react';
import { X, ShieldCheck, Lock, Server, Cloud, AlertCircle, FileCode } from 'lucide-react';

interface RemediationGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RemediationGuide: React.FC<RemediationGuideProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-5 sm:p-6 shadow-2xl relative my-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Defensive Hardening & Remediation Guide</h2>
              <p className="text-xs text-slate-400">Preventing Google Dorking and securing public digital assets</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-5 text-sm text-slate-300 max-h-[70vh] overflow-y-auto pr-1">
          {/* Section 1: Web Server Hardening */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
              <Server className="h-4 w-4" />
              <h3>1. Web Server Hardening (Nginx & Apache)</h3>
            </div>
            <p className="text-xs text-slate-400">
              Disable directory indexing and deny access to hidden dotfiles (like <code className="text-emerald-400 font-mono">.git</code>, <code className="text-emerald-400 font-mono">.env</code>) and backup files.
            </p>
            <div className="bg-slate-900 p-3 rounded-lg font-mono text-xs text-slate-200 border border-slate-800 space-y-2">
              <span className="text-slate-500"># Nginx config snippet:</span>
              <pre className="text-emerald-300">{`# Deny all hidden files (e.g. .git, .env)
location ~ /\\.(?!well-known).* {
    deny all;
    return 404;
}

# Block backup, log, and configuration extensions
location ~* \\.(bak|config|sql|db|old|log|ini|conf|env|yml|yaml|pem|key)$ {
    deny all;
    return 404;
}`}</pre>
            </div>
          </div>

          {/* Section 2: Search Engine Directives & Robots.txt */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
              <FileCode className="h-4 w-4" />
              <h3>2. Search Engine Indexing Directives (X-Robots-Tag)</h3>
            </div>
            <p className="text-xs text-slate-400">
              Note: <code className="text-emerald-400 font-mono">robots.txt</code> tells crawlers not to visit URLs, but it does NOT remove sensitive files from search indexes if external links exist. To guarantee de-indexing, emit HTTP header:
            </p>
            <div className="bg-slate-900 p-3 rounded-lg font-mono text-xs text-slate-200 border border-slate-800">
              <pre className="text-emerald-300">{`X-Robots-Tag: noindex, nofollow, noarchive`}</pre>
            </div>
          </div>

          {/* Section 3: Cloud Storage Buckets (S3, GCS, Azure Blob) */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
              <Cloud className="h-4 w-4" />
              <h3>3. Cloud Storage Access Control</h3>
            </div>
            <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
              <li>
                <strong className="text-slate-200">AWS S3:</strong> Turn on <span className="text-emerald-400">"Block Public Access"</span> at the AWS Account level. Use CloudFront with Origin Access Control (OAC) for static assets.
              </li>
              <li>
                <strong className="text-slate-200">Google Cloud Storage:</strong> Enable <span className="text-emerald-400">"Public Access Prevention (PAP)"</span> and enforce uniform bucket-level access.
              </li>
              <li>
                <strong className="text-slate-200">Azure Blob Storage:</strong> Set <span className="text-emerald-400">"Allow Blob public access"</span> to False on Storage Accounts.
              </li>
            </ul>
          </div>

          {/* Section 4: Secret Management & Pre-commit Hooks */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
              <Lock className="h-4 w-4" />
              <h3>4. Pre-Commit Secret Scanning & CI/CD</h3>
            </div>
            <p className="text-xs text-slate-400">
              Integrate tools like <span className="text-emerald-300 font-mono">TruffleHog</span>, <span className="text-emerald-300 font-mono">Gitleaks</span>, or GitHub Secret Scanning to prevent secrets (Slack tokens, AWS keys, private certificates) from ever reaching public git repositories or public pastebins.
            </p>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
