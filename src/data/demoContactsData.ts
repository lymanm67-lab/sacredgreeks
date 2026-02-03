import { SavedContact } from '@/hooks/useSavedContacts';

// Helper to create dates relative to today
const daysFromNow = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

const daysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

export const DEMO_CONTACTS: SavedContact[] = [
  {
    id: 'demo-contact-1',
    user_id: 'demo-user',
    name: 'Marcus Williams',
    email: 'marcus.williams@example.com',
    phone: '(404) 555-0123',
    organization: 'Phi Beta Sigma Fraternity, Inc.',
    title: 'Chapter President',
    website: null,
    notes: 'Met at the Southeast Regional Conference. Interested in faith-based programming for his chapter. Follow up about joint prayer breakfast.',
    reminder_at: daysFromNow(0), // Today
    reminder_sent: false,
    source: 'qr_scan',
    created_at: daysAgo(3),
    updated_at: daysAgo(3),
  },
  {
    id: 'demo-contact-2',
    user_id: 'demo-user',
    name: 'Jasmine Robinson',
    email: 'jasmine.r@akaalpha.org',
    phone: '(713) 555-0456',
    organization: 'Alpha Kappa Alpha Sorority, Inc.',
    title: 'Regional Director',
    website: null,
    notes: 'Powerful testimony about Greek life and faith. Wants to bring Dr. Lyman to speak at their regional summit.',
    reminder_at: daysAgo(2), // Overdue
    reminder_sent: false,
    source: 'business_card',
    created_at: daysAgo(7),
    updated_at: daysAgo(7),
  },
  {
    id: 'demo-contact-3',
    user_id: 'demo-user',
    name: 'David Thompson',
    email: 'dthompson@kappaalpha.com',
    phone: '(202) 555-0789',
    organization: 'Kappa Alpha Psi Fraternity, Inc.',
    title: 'Graduate Advisor',
    website: null,
    notes: 'Discussion about integrating PROOF framework into new member education. Very receptive to faith-centered approach.',
    reminder_at: daysFromNow(1), // Tomorrow
    reminder_sent: false,
    source: 'qr_scan',
    created_at: daysAgo(5),
    updated_at: daysAgo(5),
  },
  {
    id: 'demo-contact-4',
    user_id: 'demo-user',
    name: 'Candace Mitchell',
    email: 'cmitchell@deltasigmatheta.org',
    phone: '(312) 555-0234',
    organization: 'Delta Sigma Theta Sorority, Inc.',
    title: 'Chaplain',
    website: null,
    notes: 'Coordinates prayer calls for her chapter. Shared ideas for virtual devotionals. No immediate follow-up needed.',
    reminder_at: null,
    reminder_sent: null,
    source: 'qr_scan',
    created_at: daysAgo(10),
    updated_at: daysAgo(10),
  },
  {
    id: 'demo-contact-5',
    user_id: 'demo-user',
    name: 'Kevin Johnson',
    email: 'kevin.johnson@omegapsi.org',
    phone: '(214) 555-0567',
    organization: 'Omega Psi Phi Fraternity, Inc.',
    title: 'Basileus',
    website: null,
    notes: 'Met at D9 Summit. His chapter completed the 40-day journey together. Great success story for testimonials!',
    reminder_at: daysFromNow(7), // In a week
    reminder_sent: false,
    source: 'business_card',
    created_at: daysAgo(14),
    updated_at: daysAgo(14),
  },
  {
    id: 'demo-contact-6',
    user_id: 'demo-user',
    name: 'Tanya Brooks',
    email: 'tbrooks@zetaphibeta.org',
    phone: null, // No phone to demonstrate partial contact
    organization: 'Zeta Phi Beta Sorority, Inc.',
    title: 'Social Action Chair',
    website: null,
    notes: 'Connected at the Faith & Service workshop. Interested in service tracker feature.',
    reminder_at: daysFromNow(14), // In 2 weeks
    reminder_sent: false,
    source: 'qr_scan',
    created_at: daysAgo(2),
    updated_at: daysAgo(2),
  },
];

// Demo contact data for simulated QR scan
export const DEMO_QR_SCAN_CONTACT = {
  name: 'Brother James Carter',
  email: 'james.carter@alphaservice.org',
  phone: '(678) 555-0890',
  organization: 'Alpha Phi Alpha Fraternity, Inc.',
};

// Demo contact data for simulated business card scan
export const DEMO_BUSINESS_CARD_CONTACT = {
  name: 'Dr. Michelle Davis',
  title: 'Professor of Leadership Studies',
  company: 'Howard University',
  email: 'mdavis@howard.edu',
  phone: '(202) 555-1234',
  website: 'howard.edu/leadership',
};
