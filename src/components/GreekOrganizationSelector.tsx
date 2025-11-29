import React, { useState, useMemo } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, GraduationCap, Calendar, Building2 } from 'lucide-react';
import { GREEK_COUNCILS, MEMBER_STATUSES, getOrganizationsByCouncil, type GreekOrganization } from '@/data/greekOrganizations';

interface GreekOrganizationSelectorProps {
  selectedCouncil: string;
  selectedOrganization: string;
  chapterName: string;
  initiationYear: number | null;
  memberStatus: string;
  onCouncilChange: (council: string) => void;
  onOrganizationChange: (organization: string) => void;
  onChapterChange: (chapter: string) => void;
  onYearChange: (year: number | null) => void;
  onStatusChange: (status: string) => void;
  compact?: boolean;
}

export function GreekOrganizationSelector({
  selectedCouncil,
  selectedOrganization,
  chapterName,
  initiationYear,
  memberStatus,
  onCouncilChange,
  onOrganizationChange,
  onChapterChange,
  onYearChange,
  onStatusChange,
  compact = false,
}: GreekOrganizationSelectorProps) {
  const organizations = useMemo(() => {
    return getOrganizationsByCouncil(selectedCouncil);
  }, [selectedCouncil]);

  const selectedOrg = useMemo(() => {
    return organizations.find(org => org.name === selectedOrganization);
  }, [organizations, selectedOrganization]);

  const selectedCouncilData = GREEK_COUNCILS.find(c => c.id === selectedCouncil);

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 80 }, (_, i) => currentYear - i);

  if (compact) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="council">Council/Affiliation</Label>
            <Select value={selectedCouncil} onValueChange={(value) => {
              onCouncilChange(value);
              onOrganizationChange('');
            }}>
              <SelectTrigger id="council">
                <SelectValue placeholder="Select your council" />
              </SelectTrigger>
              <SelectContent>
                {GREEK_COUNCILS.map((council) => (
                  <SelectItem key={council.id} value={council.id}>
                    <span className="font-medium">{council.name}</span>
                    <span className="text-muted-foreground ml-2 text-xs">({council.fullName})</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization">Organization</Label>
            <Select 
              value={selectedOrganization} 
              onValueChange={onOrganizationChange}
              disabled={!selectedCouncil || selectedCouncil === 'other'}
            >
              <SelectTrigger id="organization">
                <SelectValue placeholder={selectedCouncil === 'other' ? 'Enter below' : 'Select your organization'} />
              </SelectTrigger>
              <SelectContent>
                {organizations.map((org) => (
                  <SelectItem key={org.name} value={org.name}>
                    <span className="font-medium">{org.greekLetters}</span>
                    <span className="ml-2">{org.name}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedCouncil === 'other' && (
          <div className="space-y-2">
            <Label htmlFor="custom-org">Organization Name</Label>
            <Input
              id="custom-org"
              value={selectedOrganization}
              onChange={(e) => onOrganizationChange(e.target.value)}
              placeholder="Enter your organization name"
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="chapter">Chapter</Label>
            <Input
              id="chapter"
              value={chapterName}
              onChange={(e) => onChapterChange(e.target.value)}
              placeholder="e.g., Alpha, Beta Gamma"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="year">Initiation Year</Label>
            <Select 
              value={initiationYear?.toString() || ''} 
              onValueChange={(value) => onYearChange(value ? parseInt(value) : null)}
            >
              <SelectTrigger id="year">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {yearOptions.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Member Status</Label>
            <Select value={memberStatus} onValueChange={onStatusChange}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {MEMBER_STATUSES.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-sacred" />
            Council Affiliation
          </CardTitle>
          <CardDescription>
            Select the governing council your organization belongs to
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {GREEK_COUNCILS.map((council) => (
              <button
                key={council.id}
                type="button"
                onClick={() => {
                  onCouncilChange(council.id);
                  onOrganizationChange('');
                }}
                className={`p-4 rounded-lg border-2 text-left transition-all hover:border-sacred/50 ${
                  selectedCouncil === council.id
                    ? 'border-sacred bg-sacred/5'
                    : 'border-border'
                }`}
              >
                <div className="font-semibold">{council.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{council.fullName}</div>
                {council.organizations.length > 0 && (
                  <div className="text-xs text-muted-foreground mt-2">
                    {council.organizations.length} organizations
                  </div>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedCouncil && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-sacred" />
              Your Organization
            </CardTitle>
            {selectedCouncilData && (
              <CardDescription>{selectedCouncilData.description}</CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedCouncil === 'other' ? (
              <div className="space-y-2">
                <Label htmlFor="custom-org-full">Organization Name</Label>
                <Input
                  id="custom-org-full"
                  value={selectedOrganization}
                  onChange={(e) => onOrganizationChange(e.target.value)}
                  placeholder="Enter your Greek organization name"
                />
              </div>
            ) : organizations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-80 overflow-y-auto">
                {organizations.map((org) => (
                  <button
                    key={org.name}
                    type="button"
                    onClick={() => onOrganizationChange(org.name)}
                    className={`p-3 rounded-lg border text-left transition-all hover:border-sacred/50 ${
                      selectedOrganization === org.name
                        ? 'border-sacred bg-sacred/5'
                        : 'border-border'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg">{org.greekLetters}</span>
                      <Badge variant="outline" className="text-xs">
                        {org.type === 'fraternity' ? 'Fraternity' : 'Sorority'}
                      </Badge>
                    </div>
                    <div className="text-sm mt-1">{org.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Founded {org.founded}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                No predefined organizations. Please enter your organization name above.
              </p>
            )}

            {selectedOrg && (
              <div className="mt-4 p-4 rounded-lg bg-sacred/5 border border-sacred/20">
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-bold text-sacred">{selectedOrg.greekLetters}</div>
                  <div>
                    <div className="font-semibold">{selectedOrg.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Founded {selectedOrg.founded} • {selectedOrg.type === 'fraternity' ? 'Fraternity' : 'Sorority'}
                    </div>
                    {selectedOrg.colors && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Colors: {selectedOrg.colors}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {selectedOrganization && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-sacred" />
              Membership Details
            </CardTitle>
            <CardDescription>
              Tell us about your membership
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="chapter-full">Chapter Name</Label>
                <Input
                  id="chapter-full"
                  value={chapterName}
                  onChange={(e) => onChapterChange(e.target.value)}
                  placeholder="e.g., Alpha, Beta Gamma, Eta Sigma"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year-full">Initiation/Crossing Year</Label>
                <Select 
                  value={initiationYear?.toString() || ''} 
                  onValueChange={(value) => onYearChange(value ? parseInt(value) : null)}
                >
                  <SelectTrigger id="year-full">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Not specified</SelectItem>
                    {yearOptions.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status-full">Member Status</Label>
                <Select value={memberStatus} onValueChange={onStatusChange}>
                  <SelectTrigger id="status-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {MEMBER_STATUSES.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
