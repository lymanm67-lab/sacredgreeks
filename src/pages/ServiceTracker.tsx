import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plus, Clock, Download, TrendingUp, CalendarIcon, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { cn } from '@/lib/utils';
import { communityServiceSchema } from '@/lib/validation';
import { useAutoCompleteChallenge } from '@/hooks/use-auto-complete-challenge';

interface ServiceActivity {
  id: string;
  title: string;
  description: string | null;
  hours: number;
  event_date: string | null;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
}

export default function ServiceTracker() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { completeChallenge } = useAutoCompleteChallenge();
  const [activities, setActivities] = useState<ServiceActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState('');
  const [eventDate, setEventDate] = useState<Date>();

  useEffect(() => {
    if (user) {
      loadActivities();
    }
  }, [user]);

  const loadActivities = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('community_service_items')
        .select('*')
        .eq('user_id', user.id)
        .order('event_date', { ascending: false, nullsFirst: false });

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load service activities',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addActivity = async () => {
    if (!user || !title.trim() || !hours) return;

    try {
      const hoursNum = parseFloat(hours);
      
      const validated = communityServiceSchema.parse({
        title: title.trim(),
        hours: hoursNum
      });

      const { error } = await supabase
        .from('community_service_items')
        .insert({
          user_id: user.id,
          title: validated.title,
          description: description.trim() || null,
          hours: validated.hours,
          event_date: eventDate ? format(eventDate, 'yyyy-MM-dd') : null,
          completed: true,
          completed_at: new Date().toISOString(),
        });

      if (error) throw error;

      setTitle('');
      setDescription('');
      setHours('');
      setEventDate(undefined);
      setShowAddForm(false);
      loadActivities();
      
      // Auto-complete service challenge
      await completeChallenge('service');
      
      toast({
        title: 'Activity Added',
        description: 'Service activity logged successfully',
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Validation Error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to add service activity',
          variant: 'destructive',
        });
      }
    }
  };

  const deleteActivity = async (id: string) => {
    try {
      const { error } = await supabase
        .from('community_service_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadActivities();
      toast({
        title: 'Deleted',
        description: 'Service activity removed',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete activity',
        variant: 'destructive',
      });
    }
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Activity', 'Description', 'Hours'];
    const rows = activities.map(activity => [
      activity.event_date || format(new Date(activity.created_at), 'yyyy-MM-dd'),
      activity.title,
      activity.description || '',
      activity.hours.toString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `service-hours-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: 'Exported',
      description: 'Service hours exported to CSV',
    });
  };

  // Statistics
  const totalHours = activities.reduce((sum, act) => sum + (act.hours || 0), 0);
  const totalActivities = activities.length;
  const currentYear = new Date().getFullYear();
  const yearActivities = activities.filter(
    act => act.event_date && new Date(act.event_date).getFullYear() === currentYear
  );
  const yearHours = yearActivities.reduce((sum, act) => sum + (act.hours || 0), 0);

  // Monthly data for chart
  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(currentYear, i, 1);
    const monthActivities = activities.filter(
      act => act.event_date && 
        new Date(act.event_date).getMonth() === i &&
        new Date(act.event_date).getFullYear() === currentYear
    );
    return {
      month: format(month, 'MMM'),
      hours: monthActivities.reduce((sum, act) => sum + (act.hours || 0), 0),
    };
  });

  // Category data (simplified - you could add categories to the schema)
  const COLORS = ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6'];

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center py-8">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Service Hour Tracker</h1>
          <p className="text-muted-foreground">Log and track your community service activities</p>
        </div>
        <Button onClick={exportToCSV} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHours.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">All time service hours</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Year</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{yearHours.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">{currentYear} hours logged</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activities</CardTitle>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalActivities}</div>
            <p className="text-xs text-muted-foreground">Total service events</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="activities" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Log Service Activity</CardTitle>
                <Button onClick={() => setShowAddForm(!showAddForm)} variant="outline" size="sm">
                  {showAddForm ? 'Cancel' : 'Add Activity'}
                </Button>
              </div>
            </CardHeader>
            {showAddForm && (
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Activity Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Food Bank Volunteering"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of the service activity..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="hours">Hours *</Label>
                      <Input
                        id="hours"
                        type="number"
                        placeholder="0.0"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        step="0.5"
                        min="0"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Event Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !eventDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {eventDate ? format(eventDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={eventDate}
                            onSelect={setEventDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <Button onClick={addActivity} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Log Activity
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity History</CardTitle>
            </CardHeader>
            <CardContent>
              {activities.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No service activities logged yet. Add your first one above!
                </div>
              ) : (
                <div className="space-y-3">
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{activity.title}</h4>
                          <Badge variant="secondary">
                            {activity.hours} {activity.hours === 1 ? 'hour' : 'hours'}
                          </Badge>
                        </div>
                        {activity.description && (
                          <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {activity.event_date
                            ? format(new Date(activity.event_date), 'MMMM d, yyyy')
                            : format(new Date(activity.created_at), 'MMMM d, yyyy')}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteActivity(activity.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Service Hours ({currentYear})</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="hsl(var(--sacred))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Summary Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Hours</span>
                  <span className="font-semibold">{totalHours.toFixed(1)} hrs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Activities</span>
                  <span className="font-semibold">{totalActivities}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Average Hours/Activity</span>
                  <span className="font-semibold">
                    {totalActivities > 0 ? (totalHours / totalActivities).toFixed(1) : '0.0'} hrs
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{currentYear} Hours</span>
                  <span className="font-semibold">{yearHours.toFixed(1)} hrs</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={exportToCSV} className="w-full" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export All Data (CSV)
                </Button>
                <Button onClick={() => setShowAddForm(true)} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Log New Activity
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
