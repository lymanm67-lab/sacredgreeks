// Affiliation types for non-Greek members and supporters

export interface AffiliationType {
  value: string;
  label: string;
  description: string;
  icon: string;
}

export const AFFILIATION_TYPES: AffiliationType[] = [
  {
    value: 'member',
    label: 'Greek Member',
    description: 'I am an initiated member of a Greek letter organization',
    icon: '🔱'
  },
  {
    value: 'interested',
    label: 'Interested in Greek Life',
    description: 'I\'m considering joining a Greek organization',
    icon: '🌟'
  },
  {
    value: 'supporter',
    label: 'Supporter',
    description: 'I support Greek life members in their faith journey',
    icon: '🤝'
  },
  {
    value: 'cautious',
    label: 'Curious but Cautious',
    description: 'I have questions or concerns about Greek life and faith',
    icon: '🤔'
  },
  {
    value: 'parent_pastor',
    label: 'Parent or Pastor',
    description: 'I\'m a parent or pastor of a Greek life member',
    icon: '🙏'
  }
];

export function getAffiliationType(value: string): AffiliationType | undefined {
  return AFFILIATION_TYPES.find(t => t.value === value);
}

export function getAffiliationLabel(value: string): string {
  const type = getAffiliationType(value);
  return type?.label || 'Greek Member';
}
