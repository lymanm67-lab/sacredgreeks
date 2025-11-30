import React from 'react';
import { Share2, Plus, Smartphone } from 'lucide-react';

export default function InstallGuide() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-sm w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#8B5CF6]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Smartphone className="w-8 h-8 text-[#8B5CF6]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Install Sacred Greeks
          </h1>
          <p className="text-gray-500 text-sm">on your iPhone</p>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {/* Step 1 */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-[#8B5CF6] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">Open Safari</h3>
              <p className="text-gray-600">
                Go to <span className="font-semibold text-[#8B5CF6]">sacredgreekslife.com</span>
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-[#8B5CF6] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">Tap Share Button</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-8 h-8 border-2 border-[#8B5CF6] rounded-lg flex items-center justify-center">
                  <Share2 className="w-4 h-4 text-[#8B5CF6]" />
                </div>
                <span className="text-gray-500 text-sm">(at the bottom of Safari)</span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-[#8B5CF6] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">Add to Home Screen</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-8 h-8 border-2 border-[#8B5CF6] rounded-lg flex items-center justify-center">
                  <Plus className="w-4 h-4 text-[#8B5CF6]" />
                </div>
                <span className="text-gray-500 text-sm">(scroll down to find it)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Done */}
        <div className="mt-8 p-4 bg-green-50 rounded-xl text-center">
          <p className="text-green-700 font-medium">
            ✅ That's it! The app will appear on your home screen.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            Having trouble? Clear Safari history first:<br/>
            Settings → Safari → Clear History
          </p>
        </div>
      </div>
    </div>
  );
}
