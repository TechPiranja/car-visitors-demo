/* eslint-disable @typescript-eslint/no-explicit-any */
import { Car, Sparkles, Code } from "lucide-react";

interface DocumentationProps {
  visitorCount: number;
  cars: Array<any>;
}

export function Documentation({ visitorCount, cars }: DocumentationProps) {
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
              Easy Setup
            </h3>
            <p className="text-slate-600">
              Use the following steps to integrate the widget into your site in
              minutes! No backend needed for random generation!
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
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            How to Use the Car Visitors Widget
          </h2>
          <ol className="list-decimal pl-6 text-slate-700 mb-4 space-y-2">
            <li>
              <span className="font-semibold">Download the widget script:</span>{" "}
              <a
                href="/scripts/car-visitors.js"
                download
                className="text-blue-600 underline"
              >
                car-visitors.js
              </a>
            </li>
            <li>
              <span className="font-semibold">
                Add the script to your HTML:
              </span>
              <pre className="bg-slate-900 text-slate-100 rounded p-2 mt-1 text-sm overflow-x-auto">
                {`<script src="/scripts/car-visitors.js"></script>`}
              </pre>
            </li>
            <li>
              <span className="font-semibold">
                Initialize the widget in your JS:
              </span>
              <pre className="bg-slate-900 text-slate-100 rounded p-2 mt-1 text-sm overflow-x-auto">
                {`import { useEffect } from "react";
import { CarVisitors } from "./scripts/car-visitors";

function App() {
  const container = document.getElementById("my-street");
  if (container) {
    // you can pass either a number or an array of car objects
    CarVisitors.render(container, 50);
  }

  return (
    <div id="my-street" style={{ width: "100%", position: "fixed",left: 0, bottom: 0, zIndex: 10 }} />
  );
}`}
              </pre>
            </li>
          </ol>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-10 shadow-xl text-white mb-16">
          <h2 className="text-3xl font-bold mb-4">Configuration Options</h2>
          <div className="grid md:grid-cols-1 gap-6">
            <div className="mb-6">
              <p className="mb-2 text-blue-50">
                <span className="font-semibold">CarVisitors.render</span> can be
                used in two ways:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-blue-50">
                <li>
                  <span className="font-semibold">Pass a number</span> to render
                  that many random cars:
                  <pre className="bg-blue-700 rounded p-2 text-xs mt-1">{`CarVisitors.render(container, 5); // renders 5 random cars`}</pre>
                </li>
                <li>
                  <span className="font-semibold">
                    Pass an array of car objects
                  </span>{" "}
                  (e.g. from Supabase) to render specific cars:
                  <pre className="bg-blue-700 rounded p-2 text-xs mt-1">{`CarVisitors.render(container, [
    { carColor: "#A7C7E7", wheelColor: "#B0B0B0", name: "Alice" },
    { carColor: "#FFD1DC", wheelColor: "#D3C0CD", name: "Bob" },
  ]);`}</pre>
                </li>
              </ul>
              <p className="mt-2 text-blue-100 text-xs">
                <code
                  style={{ fontSize: 20 }}
                >{`cars?: number | Array<{ carColor: string; wheelColor: string; name: string `}</code>
              </p>
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
