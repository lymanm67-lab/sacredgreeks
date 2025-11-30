import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Play, 
  Square, 
  Trash2, 
  Download, 
  Clock, 
  Navigation, 
  MousePointer,
  Route,
  Sparkles
} from 'lucide-react';
import { useDemoSessionRecording, DemoSession } from '@/hooks/use-demo-session-recording';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { toast } from '@/hooks/use-toast';
import { format, formatDistanceToNow } from 'date-fns';

interface DemoSessionRecorderProps {
  onClose?: () => void;
}

export function DemoSessionRecorder({ onClose }: DemoSessionRecorderProps) {
  const {
    isRecording,
    currentSession,
    sessions,
    startRecording,
    stopRecording,
    deleteSession,
    clearAllSessions,
    exportSession,
    getSessionStats,
  } = useDemoSessionRecording();
  
  const { activePersona, currentScenario } = useDemoMode();

  const handleStartRecording = () => {
    startRecording({
      persona: activePersona?.name,
      scenario: currentScenario,
    });
    toast({
      title: 'Recording Started',
      description: 'Your demo session is now being recorded.',
    });
  };

  const handleStopRecording = () => {
    const session = stopRecording();
    if (session) {
      toast({
        title: 'Recording Saved',
        description: `Session saved with ${session.events.length} events.`,
      });
    }
  };

  const handleExport = (session: DemoSession) => {
    exportSession(session);
    toast({
      title: 'Session Exported',
      description: 'Session data downloaded as JSON.',
    });
  };

  const handleDelete = (sessionId: string) => {
    deleteSession(sessionId);
    toast({
      title: 'Session Deleted',
      description: 'Recording has been removed.',
    });
  };

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'navigation': return <Navigation className="h-3 w-3" />;
      case 'click': return <MousePointer className="h-3 w-3" />;
      case 'tour_step': return <Route className="h-3 w-3" />;
      case 'feature_use': return <Sparkles className="h-3 w-3" />;
      default: return <MousePointer className="h-3 w-3" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Recording Controls */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            {isRecording ? (
              <>
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                Recording in Progress
              </>
            ) : (
              'Session Recording'
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {isRecording && currentSession ? (
            <>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-mono">
                  {formatDuration(Date.now() - currentSession.startedAt)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Events:</span>
                <Badge variant="secondary">{currentSession.events.length}</Badge>
              </div>
              <Button 
                onClick={handleStopRecording} 
                variant="destructive" 
                className="w-full gap-2"
              >
                <Square className="h-4 w-4" />
                Stop Recording
              </Button>
            </>
          ) : (
            <Button 
              onClick={handleStartRecording} 
              className="w-full gap-2"
            >
              <Play className="h-4 w-4" />
              Start Recording
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Live Events (when recording) */}
      {isRecording && currentSession && currentSession.events.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Live Events</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-32">
              <div className="space-y-1">
                {currentSession.events.slice(-10).reverse().map((event) => (
                  <div 
                    key={event.id}
                    className="flex items-center gap-2 text-xs p-1.5 rounded bg-muted/50"
                  >
                    {getEventIcon(event.type)}
                    <span className="flex-1 truncate">
                      {event.data.route || event.data.feature || event.data.stepTitle || event.data.action}
                    </span>
                    <span className="text-muted-foreground font-mono text-[10px]">
                      {format(event.timestamp, 'HH:mm:ss')}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {/* Saved Sessions */}
      <Card>
        <CardHeader className="pb-2 flex-row items-center justify-between">
          <CardTitle className="text-sm">Saved Sessions ({sessions.length})</CardTitle>
          {sessions.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 text-xs text-destructive hover:text-destructive"
              onClick={() => {
                clearAllSessions();
                toast({ title: 'All sessions cleared' });
              }}
            >
              Clear All
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {sessions.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No recorded sessions yet
            </p>
          ) : (
            <ScrollArea className="h-64">
              <div className="space-y-2">
                {sessions.map((session) => {
                  const stats = getSessionStats(session);
                  return (
                    <Card key={session.id} className="p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(session.startedAt, { addSuffix: true })}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {session.persona && (
                              <Badge variant="outline" className="text-[10px]">
                                {session.persona}
                              </Badge>
                            )}
                            {session.scenario && (
                              <Badge variant="secondary" className="text-[10px]">
                                {session.scenario}
                              </Badge>
                            )}
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-[10px] text-muted-foreground">
                            <div>
                              <span className="font-medium text-foreground">{stats.totalEvents}</span> events
                            </div>
                            <div>
                              <span className="font-medium text-foreground">{stats.uniqueRoutes}</span> routes
                            </div>
                            <div>
                              <span className="font-medium text-foreground">{formatDuration(stats.duration)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleExport(session)}
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive hover:text-destructive"
                            onClick={() => handleDelete(session.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
