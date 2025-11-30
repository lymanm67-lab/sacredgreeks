import React, { useState } from 'react';
import { Share2, Plus, Smartphone, MoreVertical, Download, ArrowLeft, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ListenButton } from '@/components/ListenButton';
import { InstallDemo } from '@/components/InstallDemo';
import { useNavigate } from 'react-router-dom';

const iphoneInstructions = `Here's how to install Sacred Greeks Life on your iPhone. 

Step 1: Open Safari. This is very important - you must use Safari, not Chrome or any other browser. Go to sacredgreekslife.com in Safari.

Step 2: Tap the Share button. Look at the bottom of Safari for a square icon with an arrow pointing up. Tap that button.

Step 3: Scroll down in the menu that appears and tap "Add to Home Screen." It has a plus sign icon.

Step 4: Tap "Add" in the top right corner.

That's it! The app icon will now appear on your home screen just like a regular app. You can tap it anytime to open Sacred Greeks Life.

If you're having trouble or see an error, try clearing Safari first. Go to your iPhone Settings, tap Safari, then tap Clear History and Website Data. After that, try the steps again.`;

const androidInstructions = `Here's how to install Sacred Greeks Life on your Android phone.

Step 1: Open Chrome browser on your Android phone. Go to sacredgreekslife.com.

Step 2: Tap the three dots menu in the top right corner of Chrome.

Step 3: Tap "Add to Home screen" or "Install app" from the menu.

Step 4: Tap "Add" or "Install" to confirm.

That's it! The app icon will now appear on your home screen just like a regular app. You can tap it anytime to open Sacred Greeks Life.

Some Android phones may show an "Install" banner at the bottom of the screen automatically. If you see that, just tap Install.`;

export default function InstallGuide() {
  const [platform, setPlatform] = useState<'iphone' | 'android'>('iphone');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4">
      <div className="max-w-sm w-full">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4 -ml-2 text-gray-600"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[#8B5CF6]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Smartphone className="w-8 h-8 text-[#8B5CF6]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Install Sacred Greeks
          </h1>
          <p className="text-gray-500 text-sm mb-4">Step-by-step instructions</p>
          
          {/* Listen Button */}
          <div className="flex justify-center gap-2">
            <ListenButton 
              text={platform === 'iphone' ? iphoneInstructions : androidInstructions}
              itemId={`install-guide-${platform}`}
              title={`${platform === 'iphone' ? 'iPhone' : 'Android'} Installation Guide`}
              showLabel={true}
            />
          </div>
        </div>

        {/* Visual Demo */}
        <div className="mb-6">
          <InstallDemo platform={platform} />
        </div>

        {/* Platform Tabs */}
        <Tabs value={platform} onValueChange={(v) => setPlatform(v as 'iphone' | 'android')} className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="iphone">iPhone</TabsTrigger>
            <TabsTrigger value="android">Android</TabsTrigger>
          </TabsList>

          {/* iPhone Instructions */}
          <TabsContent value="iphone" className="mt-6">
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
                  <p className="text-amber-600 text-sm mt-1">⚠️ Must use Safari, not Chrome</p>
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

            {/* Troubleshooting */}
            <div className="mt-6 p-4 bg-amber-50 rounded-xl">
              <p className="text-amber-800 font-medium text-sm mb-2">Having trouble?</p>
              <p className="text-amber-700 text-sm">
                Clear Safari history first:<br/>
                <span className="font-medium">Settings → Safari → Clear History</span>
              </p>
            </div>
          </TabsContent>

          {/* Android Instructions */}
          <TabsContent value="android" className="mt-6">
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#8B5CF6] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Open Chrome</h3>
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
                  <h3 className="font-semibold text-gray-900 text-lg">Tap Menu</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-8 h-8 border-2 border-[#8B5CF6] rounded-lg flex items-center justify-center">
                      <MoreVertical className="w-4 h-4 text-[#8B5CF6]" />
                    </div>
                    <span className="text-gray-500 text-sm">(3 dots in top right)</span>
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
                      <Download className="w-4 h-4 text-[#8B5CF6]" />
                    </div>
                    <span className="text-gray-500 text-sm">(or "Install app")</span>
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

            {/* Tip */}
            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-blue-800 font-medium text-sm mb-2">💡 Tip</p>
              <p className="text-blue-700 text-sm">
                Some phones show an "Install" banner at the bottom automatically. Just tap it!
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
