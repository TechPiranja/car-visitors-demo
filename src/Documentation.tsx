/* eslint-disable @typescript-eslint/no-explicit-any */
import { Car, Sparkles, Code, Copy, Check } from "lucide-react";

interface DocumentationProps {
  embedCode: string;
  visitorCount: number;
  cars: Array<any>;
  copied: boolean;
  copyToClipboard: () => void;
}

export function Documentation({
  embedCode,
  visitorCount,
  cars,
  copied,
  copyToClipboard,
}: DocumentationProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-blue-500 text-white px-6 py-3 rounded-full mb-6 shadow-lg">
            <Car className="w-6 h-6" />
            <h1 className="text-2xl font-bold">Street Visitors</h1>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Visualize your website visitors as animated cars driving along a
            street. Simple, beautiful, and embeddable with a single line of
            code.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-200">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Beautiful Animation
            </h3>
            <p className="text-slate-600">
              Smooth, minimalist car animations that bring your visitor count to
              life without being distracting.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-200">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              One Line Setup
            </h3>
            <p className="text-slate-600">
              Add a single script tag to your website and you're done. No
              complex configuration required.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-200">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
              <Car className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Fully Customizable
            </h3>
            <p className="text-slate-600">
              Configure car colors, wheel colors, and height to match your brand
              perfectly.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-10 shadow-lg border border-slate-200 mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Embed Code</h2>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="bg-slate-900 rounded-xl p-6 overflow-x-auto">
            <pre className="text-sm text-slate-100 font-mono">
              <code>{embedCode}</code>
            </pre>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-10 shadow-xl text-white mb-16">
          <h2 className="text-3xl font-bold mb-4">Configuration Options</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-blue-100">Required</h4>
              <ul className="space-y-2 text-blue-50">
                <li>
                  <code className="bg-blue-700 px-2 py-1 rounded">
                    data-supabase-url
                  </code>{" "}
                  - Your Supabase project URL
                </li>
                <li>
                  <code className="bg-blue-700 px-2 py-1 rounded">
                    data-supabase-key
                  </code>{" "}
                  - Your Supabase anon key
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-blue-100">Optional</h4>
              <ul className="space-y-2 text-blue-50">
                <li>
                  <code className="bg-blue-700 px-2 py-1 rounded">
                    data-car-color
                  </code>{" "}
                  - Hex color for cars (default: #3b82f6)
                </li>
                <li>
                  <code className="bg-blue-700 px-2 py-1 rounded">
                    data-wheel-color
                  </code>{" "}
                  - Hex color for wheels (default: #1f2937)
                </li>
                <li>
                  <code className="bg-blue-700 px-2 py-1 rounded">
                    data-height
                  </code>{" "}
                  - Height in pixels (default: 120)
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-10 shadow-lg border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Live Demo</h2>
          <p className="text-slate-600 mb-6">
            The widget is running on this page right now! Look at the bottom of
            your screen to see the animated cars.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-4">
            <div className="inline-flex items-center gap-3 bg-slate-100 px-6 py-3 rounded-lg">
              <Car className="w-5 h-5 text-slate-600" />
              <span className="text-slate-700 font-medium">
                {visitorCount} total visitors
              </span>
            </div>
            <div className="inline-flex items-center gap-3 bg-green-100 px-6 py-3 rounded-lg">
              <Car className="w-5 h-5 text-green-600" />
              <span className="text-green-700 font-medium">
                {cars.length} unique visitors
              </span>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-slate-200 bg-white py-8 mb-32">
        <div className="max-w-6xl mx-auto px-6 text-center text-slate-600">
          <p>Built with Supabase, Canvas API, and vanilla JavaScript</p>
          <p className="text-sm mt-2">Portfolio-ready and production-ready</p>
        </div>
      </footer>
    </div>
  );
}
