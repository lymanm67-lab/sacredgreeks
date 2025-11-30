import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  Clock, 
  MousePointer, 
  Eye, 
  TrendingUp, 
  Users, 
  RefreshCw,
  Download,
  X 
} from 'lucide-react';
import { useDemoAnalytics } from '@/hooks/use-demo-analytics';
import { DEMO_SCENARIOS } from '@/contexts/DemoModeContext';

interface DemoAnalyticsDashboardProps {
  onClose: () => void;
}

export function DemoAnalyticsDashboard({ onClose }: DemoAnalyticsDashboardProps) {
  const { analytics, clearAnalytics, exportAnalytics } = useDemoAnalytics();
  
  const totalTimeSpent = useMemo(() => {
    const sessions = analytics.sessions || [];
    return sessions.reduce((acc, session) => acc + (session.duration || 0), 0);
  }, [analytics.sessions]);
  
  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    }
    return `${seconds}s`;
  };
  
  const scenarioUsage = useMemo(() => {
    const usage: Record<string, number> = {};
    (analytics.scenarioSwitches || []).forEach(sw => {
      usage[sw.to] = (usage[sw.to] || 0) + 1;
    });
    return usage;
  }, [analytics.scenarioSwitches]);
  
  const mostUsedScenario = useMemo(() => {
    let max = 0;
    let scenario = 'power-user';
    Object.entries(scenarioUsage).forEach(([s, count]) => {
      if (count > max) {
        max = count;
        scenario = s;
      }
    });
    return scenario;
  }, [scenarioUsage]);
  
  const featureInteractions = useMemo(() => {
    const interactions: Record<string, number> = {};
    (analytics.featureInteractions || []).forEach(fi => {
      interactions[fi.feature] = (interactions[fi.feature] || 0) + 1;
    });
    return Object.entries(interactions)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [analytics.featureInteractions]);

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-auto">
      <div className="container max-w-6xl mx-auto py-6 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <BarChart3 className="h-6 w-6" />
              Demo Analytics Dashboard
            </h2>
            <p className="text-muted-foreground">
              Track demo usage patterns and user engagement
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={exportAnalytics} className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={clearAnalytics} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Reset
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Sessions</span>
              </div>
              <p className="text-3xl font-bold">{analytics.sessions?.length || 0}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Time Spent</span>
              </div>
              <p className="text-3xl font-bold">{formatDuration(totalTimeSpent)}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <MousePointer className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Interactions</span>
              </div>
              <p className="text-3xl font-bold">{analytics.featureInteractions?.length || 0}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Scenario Switches</span>
              </div>
              <p className="text-3xl font-bold">{analytics.scenarioSwitches?.length || 0}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Scenario Usage */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Scenario Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {DEMO_SCENARIOS.map((scenario) => {
                const count = scenarioUsage[scenario.id] || 0;
                const maxCount = Math.max(...Object.values(scenarioUsage), 1);
                const percentage = (count / maxCount) * 100;
                
                return (
                  <div key={scenario.id} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <span>{scenario.icon}</span>
                        {scenario.name}
                        {scenario.id === mostUsedScenario && count > 0 && (
                          <Badge variant="secondary" className="text-[10px]">Most Used</Badge>
                        )}
                      </span>
                      <span className="text-muted-foreground">{count} switches</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
              {Object.keys(scenarioUsage).length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No scenario switches recorded yet
                </p>
              )}
            </CardContent>
          </Card>

          {/* Top Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MousePointer className="h-5 w-5" />
                Top Feature Interactions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {featureInteractions.length > 0 ? (
                featureInteractions.map(([feature, count], index) => {
                  const maxCount = featureInteractions[0][1];
                  const percentage = (count / maxCount) * 100;
                  
                  return (
                    <div key={feature} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </span>
                          {feature.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="text-muted-foreground">{count} interactions</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No feature interactions recorded yet
                </p>
              )}
            </CardContent>
          </Card>

          {/* Recent Sessions */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {(analytics.sessions || []).slice(-10).reverse().map((session, index) => (
                  <div 
                    key={session.id || index} 
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <div>
                        <p className="text-sm font-medium">
                          {new Date(session.startTime).toLocaleDateString()} at{' '}
                          {new Date(session.startTime).toLocaleTimeString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Scenario: {session.scenario || 'power-user'}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {formatDuration(session.duration || 0)}
                    </Badge>
                  </div>
                ))}
                {(!analytics.sessions || analytics.sessions.length === 0) && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No sessions recorded yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
