import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, TrendingUp, TrendingDown, Users, UserCheck, UserX, AlertTriangle, Crown, Activity } from 'lucide-react';
import { useAllEngagementScores, EngagementScore } from '@/hooks/use-engagement-score';
import { format } from 'date-fns';

const levelConfig: Record<EngagementScore['level'], { label: string; color: string; icon: React.ElementType }> = {
  champion: { label: 'Champion', color: 'bg-amber-500', icon: Crown },
  active: { label: 'Active', color: 'bg-emerald-500', icon: TrendingUp },
  engaged: { label: 'Engaged', color: 'bg-blue-500', icon: Activity },
  casual: { label: 'Casual', color: 'bg-slate-500', icon: Users },
  'at-risk': { label: 'At Risk', color: 'bg-orange-500', icon: AlertTriangle },
  inactive: { label: 'Inactive', color: 'bg-red-500', icon: UserX },
};

export function EngagementScoresDashboard() {
  const { scores, loading } = useAllEngagementScores();
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');

  const filteredScores = scores.filter(score => {
    const matchesSearch = 
      score.email.toLowerCase().includes(search.toLowerCase()) ||
      score.fullName.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === 'all' || score.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  // Calculate summary stats
  const stats = {
    total: scores.length,
    champions: scores.filter(s => s.level === 'champion').length,
    active: scores.filter(s => s.level === 'active' || s.level === 'engaged').length,
    atRisk: scores.filter(s => s.level === 'at-risk').length,
    inactive: scores.filter(s => s.level === 'inactive').length,
    avgScore: scores.length > 0 ? Math.round(scores.reduce((sum, s) => sum + s.score, 0) / scores.length) : 0,
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-24" />)}
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Champions</p>
                <p className="text-2xl font-bold text-amber-500">{stats.champions}</p>
              </div>
              <Crown className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold text-emerald-500">{stats.active}</p>
              </div>
              <UserCheck className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">At Risk</p>
                <p className="text-2xl font-bold text-orange-500">{stats.atRisk}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Score</p>
                <p className="text-2xl font-bold">{stats.avgScore}</p>
              </div>
              <Activity className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={levelFilter} onValueChange={setLevelFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="champion">Champions</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="engaged">Engaged</SelectItem>
            <SelectItem value="casual">Casual</SelectItem>
            <SelectItem value="at-risk">At Risk</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>User Engagement Scores</CardTitle>
          <CardDescription>
            Track user activity and identify users who may need re-engagement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Days Inactive</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredScores.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredScores.map((user) => {
                    const config = levelConfig[user.level];
                    const Icon = config.icon;
                    
                    return (
                      <TableRow key={user.userId}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{user.fullName || 'Unknown'}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="secondary" 
                            className={`${config.color} text-white flex items-center gap-1 w-fit`}
                          >
                            <Icon className="h-3 w-3" />
                            {config.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 min-w-[120px]">
                            <Progress value={user.score} className="h-2 flex-1" />
                            <span className="text-sm font-medium w-8">{user.score}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          {user.lastActive 
                            ? format(user.lastActive, 'MMM d, yyyy')
                            : 'Never'
                          }
                        </TableCell>
                        <TableCell>
                          <span className={user.daysSinceLastActive > 7 ? 'text-orange-500 font-medium' : ''}>
                            {user.daysSinceLastActive === 999 ? 'N/A' : `${user.daysSinceLastActive} days`}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
