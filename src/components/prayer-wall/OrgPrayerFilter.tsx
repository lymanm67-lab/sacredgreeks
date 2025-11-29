import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Filter, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { GREEK_COUNCILS } from '@/data/greekOrganizations';

interface OrgPrayerFilterProps {
  value: string;
  onChange: (value: string) => void;
}

interface UserOrgInfo {
  greekCouncil: string | null;
  greekOrganization: string | null;
}

export function OrgPrayerFilter({ value, onChange }: OrgPrayerFilterProps) {
  const { user } = useAuth();
  const [userOrg, setUserOrg] = useState<UserOrgInfo | null>(null);

  useEffect(() => {
    if (user) {
      loadUserOrg();
    }
  }, [user]);

  const loadUserOrg = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('profiles')
      .select('greek_council, greek_organization')
      .eq('id', user.id)
      .maybeSingle();

    if (data) {
      setUserOrg({
        greekCouncil: data.greek_council,
        greekOrganization: data.greek_organization,
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Filter className="h-4 w-4 text-muted-foreground" />
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by org" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              All Requests
            </span>
          </SelectItem>
          {userOrg?.greekOrganization && (
            <SelectItem value="my-org">
              <span className="flex items-center gap-2">
                My Organization
              </span>
            </SelectItem>
          )}
          {userOrg?.greekCouncil && (
            <SelectItem value="my-council">
              <span className="flex items-center gap-2">
                My Council
              </span>
            </SelectItem>
          )}
        </SelectContent>
      </Select>
      {value !== 'all' && (
        <Badge variant="secondary" className="text-xs">
          {value === 'my-org' ? userOrg?.greekOrganization : 
           value === 'my-council' ? GREEK_COUNCILS.find(c => c.id === userOrg?.greekCouncil)?.name : 
           'Filtered'}
        </Badge>
      )}
    </div>
  );
}
