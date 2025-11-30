import React, { useMemo, useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X, ArrowLeftRight, TrendingUp, BookOpen, Heart, Award, Clock, Download, Image, Copy, Loader2 } from 'lucide-react';
import { DEMO_SCENARIOS, DemoScenario, useDemoMode } from '@/contexts/DemoModeContext';
import { generateScenarioDemoData, ScenarioDemoData } from '@/data/demoDataGenerators';
import { exportToPDF, exportToImage, captureElementAsImage, copyImageToClipboard } from '@/lib/demo-export';
import { toast } from '@/hooks/use-toast';

interface ScenarioCardProps {
  scenario: DemoScenario;
  data: ScenarioDemoData;
  onChangeScenario: (scenario: DemoScenario) => void;
  side: 'left' | 'right';
}

function ScenarioCard({ scenario, data, onChangeScenario, side }: ScenarioCardProps) {
  const scenarioConfig = DEMO_SCENARIOS.find(s => s.id === scenario);
  
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Select value={scenario} onValueChange={(v) => onChangeScenario(v as DemoScenario)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DEMO_SCENARIOS.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                <span className="flex items-center gap-2">
                  <span>{s.icon}</span>
                  <span>{s.name}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats Overview */}
      <Card className="border-2" style={{ borderColor: side === 'left' ? 'hsl(var(--primary))' : 'hsl(var(--secondary))' }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <span className="text-2xl">{scenarioConfig?.icon}</span>
            {scenarioConfig?.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{scenarioConfig?.description}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Level & Points */}
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <span className="font-medium">Level {data.stats.level}</span>
            </div>
            <Badge variant="secondary">{data.stats.totalPoints.toLocaleString()} pts</Badge>
          </div>

          {/* Streak */}
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              <span className="font-medium">Current Streak</span>
            </div>
            <span className="font-bold text-orange-500">{data.stats.currentStreak} days 🔥</span>
          </div>

          {/* Prayer Stats */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-rose-500" />
                Prayers
              </span>
              <span>{data.stats.answeredPrayers}/{data.stats.totalPrayers} answered</span>
            </div>
            <Progress 
              value={data.stats.totalPrayers > 0 ? (data.stats.answeredPrayers / data.stats.totalPrayers) * 100 : 0} 
              className="h-2"
            />
          </div>

          {/* Journey Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-500" />
                21-Day Journey
              </span>
              <span>{data.stats.journeyDaysCompleted}/21 days</span>
            </div>
            <Progress 
              value={(data.stats.journeyDaysCompleted / 21) * 100} 
              className="h-2"
            />
          </div>

          {/* Service Hours */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-500" />
                Service Hours
              </span>
              <span>{data.stats.serviceHours} hours</span>
            </div>
            <Progress 
              value={Math.min((data.stats.serviceHours / 50) * 100, 100)} 
              className="h-2"
            />
          </div>

          {/* Achievements */}
          <div className="pt-2 border-t">
            <p className="text-sm font-medium mb-2">Recent Achievements</p>
            <div className="flex flex-wrap gap-2">
              {data.achievements.slice(0, 4).map((achievement) => (
                <Badge key={achievement.id} variant="outline" className="text-xs">
                  {achievement.icon} {achievement.title}
                </Badge>
              ))}
              {data.achievements.length === 0 && (
                <span className="text-xs text-muted-foreground">No achievements yet</span>
              )}
            </div>
          </div>

          {/* Recent Prayers */}
          <div className="pt-2 border-t">
            <p className="text-sm font-medium mb-2">Recent Prayers</p>
            <div className="space-y-1">
              {data.prayers.slice(0, 3).map((prayer) => (
                <div key={prayer.id} className="flex items-center justify-between text-xs">
                  <span className="truncate flex-1">{prayer.title}</span>
                  {prayer.answered && (
                    <Badge variant="secondary" className="ml-2 text-[10px]">✓ Answered</Badge>
                  )}
                </div>
              ))}
              {data.prayers.length === 0 && (
                <span className="text-xs text-muted-foreground">No prayers yet</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function DemoComparisonView() {
  const { setDemoSetting } = useDemoMode();
  const [leftScenario, setLeftScenario] = useState<DemoScenario>('new-user');
  const [rightScenario, setRightScenario] = useState<DemoScenario>('power-user');
  const [isExporting, setIsExporting] = useState(false);
  const comparisonRef = useRef<HTMLDivElement>(null);

  const leftData = useMemo(() => generateScenarioDemoData(leftScenario), [leftScenario]);
  const rightData = useMemo(() => generateScenarioDemoData(rightScenario), [rightScenario]);

  const swapScenarios = () => {
    const temp = leftScenario;
    setLeftScenario(rightScenario);
    setRightScenario(temp);
  };

  const handleExportPDF = async () => {
    if (!comparisonRef.current) return;
    setIsExporting(true);
    try {
      await exportToPDF(comparisonRef.current, {
        filename: `demo-comparison-${leftScenario}-vs-${rightScenario}`,
        title: `Demo Comparison: ${leftScenario} vs ${rightScenario}`,
      });
      toast({ title: 'PDF exported successfully' });
    } catch (error) {
      toast({ title: 'Export failed', description: 'Please try again', variant: 'destructive' });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportImage = async () => {
    if (!comparisonRef.current) return;
    setIsExporting(true);
    try {
      await exportToImage(comparisonRef.current, {
        filename: `demo-comparison-${leftScenario}-vs-${rightScenario}`,
        format: 'png',
      });
      toast({ title: 'Image exported successfully' });
    } catch (error) {
      toast({ title: 'Export failed', description: 'Please try again', variant: 'destructive' });
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyImage = async () => {
    if (!comparisonRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await captureElementAsImage(comparisonRef.current);
      await copyImageToClipboard(dataUrl);
      toast({ title: 'Image copied to clipboard' });
    } catch (error) {
      toast({ title: 'Copy failed', description: 'Please try again', variant: 'destructive' });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-auto">
      <div className="container max-w-6xl mx-auto py-6 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <ArrowLeftRight className="h-6 w-6" />
              Demo Scenario Comparison
            </h2>
            <p className="text-muted-foreground">
              Compare different user journeys side-by-side to understand the app experience
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleExportPDF}
              disabled={isExporting}
              className="gap-2"
            >
              {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              PDF
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleExportImage}
              disabled={isExporting}
              className="gap-2"
            >
              <Image className="h-4 w-4" />
              Image
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleCopyImage}
              disabled={isExporting}
              className="gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setDemoSetting('compareScenarios', false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Exportable content */}
        <div ref={comparisonRef} className="bg-background p-4 rounded-lg">
          {/* Swap Button */}
          <div className="flex justify-center mb-4">
            <Button variant="outline" size="sm" onClick={swapScenarios} className="gap-2">
              <ArrowLeftRight className="h-4 w-4" />
              Swap Scenarios
            </Button>
          </div>

          {/* Comparison Grid */}
          <div className="flex gap-6">
            <ScenarioCard 
              scenario={leftScenario} 
              data={leftData} 
              onChangeScenario={setLeftScenario}
              side="left"
            />
            
            <div className="hidden md:flex items-center">
              <div className="w-px h-full bg-border" />
            </div>
            
            <ScenarioCard 
              scenario={rightScenario} 
              data={rightData} 
              onChangeScenario={setRightScenario}
              side="right"
            />
          </div>

          {/* Comparison Summary */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Quick Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Points Difference</p>
                  <p className="text-xl font-bold">
                    {rightData.stats.totalPoints - leftData.stats.totalPoints > 0 ? '+' : ''}
                    {rightData.stats.totalPoints - leftData.stats.totalPoints}
                  </p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Level Gap</p>
                  <p className="text-xl font-bold">
                    {rightData.stats.level - leftData.stats.level > 0 ? '+' : ''}
                    {rightData.stats.level - leftData.stats.level}
                  </p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Service Hours Gap</p>
                  <p className="text-xl font-bold">
                    {rightData.stats.serviceHours - leftData.stats.serviceHours > 0 ? '+' : ''}
                    {rightData.stats.serviceHours - leftData.stats.serviceHours}h
                  </p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Streak Difference</p>
                  <p className="text-xl font-bold">
                    {rightData.stats.currentStreak - leftData.stats.currentStreak > 0 ? '+' : ''}
                    {rightData.stats.currentStreak - leftData.stats.currentStreak} days
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
