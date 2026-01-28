import React from 'react';
import { BookOpen, GraduationCap, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ListenButton } from '@/components/ListenButton';

interface ScholarlyReference {
  author: string;
  title: string;
  year: string;
  publisher?: string;
  pages?: string;
  url?: string;
}

interface CategoryReferences {
  categoryId: string;
  primarySource: ScholarlyReference;
  supportingSources: ScholarlyReference[];
  academicContext: string;
}

// Scholarly references mapped to each myth category
export const categoryScholarlyReferences: CategoryReferences[] = [
  {
    categoryId: 'identity',
    primarySource: {
      author: 'Montgomery, Lyman',
      title: 'Sacred, Not Sinful: A Biblical Response to the Black Greek Letter Organization Debate',
      year: '2025',
      publisher: 'Sacred Greeks Publishing',
      pages: 'Ch. 3-4'
    },
    supportingSources: [
      {
        author: 'Ross, Lawrence C.',
        title: 'The Divine Nine: The History of African American Fraternities and Sororities',
        year: '2000',
        publisher: 'Kensington Publishing'
      },
      {
        author: 'Parks, Gregory S.',
        title: 'Black Greek-Letter Organizations in the Twenty-First Century',
        year: '2008',
        publisher: 'University Press of Kentucky'
      }
    ],
    academicContext: 'Research on Christian identity within Greek-letter organizations demonstrates that faith commitment and organizational membership are not mutually exclusive. Studies show that many historically Black Greek members maintain active church involvement and view their organizational service as an extension of their faith witness.'
  },
  {
    categoryId: 'ministry',
    primarySource: {
      author: 'Montgomery, Lyman',
      title: 'Sacred, Not Sinful: A Biblical Response to the Black Greek Letter Organization Debate',
      year: '2025',
      publisher: 'Sacred Greeks Publishing',
      pages: 'Ch. 7'
    },
    supportingSources: [
      {
        author: 'Kimbrough, Walter M.',
        title: 'Black Greek 101: The Culture, Customs, and Challenges of Black Fraternities and Sororities',
        year: '2003',
        publisher: 'Fairleigh Dickinson University Press'
      },
      {
        author: 'Wesley, Charles H.',
        title: 'The History of Alpha Phi Alpha: A Development in College Life',
        year: '1929',
        publisher: 'Foundation Publishers'
      }
    ],
    academicContext: 'Historical analysis reveals that many Black Greek organization founders were ordained ministers and theological students. The integration of ministry and organizational leadership has been a consistent theme throughout BGLO history, with numerous chapters establishing campus ministries and faith-based programming.'
  },
  {
    categoryId: 'worship',
    primarySource: {
      author: 'Montgomery, Lyman',
      title: 'Sacred, Not Sinful: A Biblical Response to the Black Greek Letter Organization Debate',
      year: '2025',
      publisher: 'Sacred Greeks Publishing',
      pages: 'Ch. 5-6'
    },
    supportingSources: [
      {
        author: 'MacMullen, Ramsay',
        title: 'Christianity and Paganism in the Fourth to Eighth Centuries',
        year: '1997',
        publisher: 'Yale University Press'
      },
      {
        author: 'Beard, Mary et al.',
        title: 'Religions of Rome: A History',
        year: '1998',
        publisher: 'Cambridge University Press'
      }
    ],
    academicContext: 'Classical scholars note that early Christianity adopted and transformed numerous cultural practices. The academic consensus recognizes that meaning is determined by contemporary use and intention, not historical origin—a principle applicable to Greek organizational symbolism and practice.'
  },
  {
    categoryId: 'rituals',
    primarySource: {
      author: 'Montgomery, Lyman',
      title: 'Sacred, Not Sinful: A Biblical Response to the Black Greek Letter Organization Debate',
      year: '2025',
      publisher: 'Sacred Greeks Publishing',
      pages: 'Ch. 8-9'
    },
    supportingSources: [
      {
        author: 'Toynbee, Arnold J.',
        title: 'A Study of History',
        year: '1961',
        publisher: 'Oxford University Press'
      },
      {
        author: 'Graham, Lawrence Otis',
        title: 'Our Kind of People: Inside America\'s Black Upper Class',
        year: '1999',
        publisher: 'HarperCollins'
      }
    ],
    academicContext: 'Anthropological research distinguishes between religious ritual and social ceremony. Most Greek organizational ceremonies fall into the latter category—emphasizing values, commitment, and community rather than spiritual transformation. The Christian tradition itself employs numerous non-salvific rituals and ceremonies.'
  },
  {
    categoryId: 'community',
    primarySource: {
      author: 'Montgomery, Lyman',
      title: 'Sacred, Not Sinful: A Biblical Response to the Black Greek Letter Organization Debate',
      year: '2025',
      publisher: 'Sacred Greeks Publishing',
      pages: 'Ch. 10'
    },
    supportingSources: [
      {
        author: 'Giddings, Paula J.',
        title: 'In Search of Sisterhood: Delta Sigma Theta and the Challenge of the Black Sorority Movement',
        year: '1988',
        publisher: 'William Morrow'
      },
      {
        author: 'Brown, Tamara L. et al.',
        title: 'African American Fraternities and Sororities: The Legacy and the Vision',
        year: '2005',
        publisher: 'University Press of Kentucky'
      }
    ],
    academicContext: 'Documented service impact of the Divine Nine includes billions in scholarship funding, millions of volunteer hours annually, and sustained community development programs spanning over a century. These outcomes align with biblical mandates for service, justice, and community uplift.'
  },
  {
    categoryId: 'lifestyle',
    primarySource: {
      author: 'Montgomery, Lyman',
      title: 'Sacred, Not Sinful: A Biblical Response to the Black Greek Letter Organization Debate',
      year: '2025',
      publisher: 'Sacred Greeks Publishing',
      pages: 'Ch. 11-12'
    },
    supportingSources: [
      {
        author: 'Smith, Christian',
        title: 'Soul Searching: The Religious and Spiritual Lives of American Teenagers',
        year: '2005',
        publisher: 'Oxford University Press'
      },
      {
        author: 'Pew Research Center',
        title: 'The Religious Landscape of African Americans',
        year: '2021',
        publisher: 'Pew Research Center'
      }
    ],
    academicContext: 'Sociological studies indicate that Greek membership correlates with higher rates of civic engagement, volunteerism, and leadership development. For Christian members, these outcomes can be channeled toward kingdom purposes while maintaining personal integrity and spiritual growth.'
  },
  {
    categoryId: 'history',
    primarySource: {
      author: 'Montgomery, Lyman',
      title: 'Sacred, Not Sinful: A Biblical Response to the Black Greek Letter Organization Debate',
      year: '2025',
      publisher: 'Sacred Greeks Publishing',
      pages: 'Ch. 1-2'
    },
    supportingSources: [
      {
        author: 'Wesley, Charles H.',
        title: 'The History of Alpha Phi Alpha: A Development in College Life',
        year: '1929',
        publisher: 'Foundation Publishers'
      },
      {
        author: 'Crump, William L.',
        title: 'The Story of Kappa Alpha Psi',
        year: '1991',
        publisher: 'Kappa Alpha Psi Fraternity'
      },
      {
        author: 'Ross, Lawrence C.',
        title: 'The Divine Nine: The History of African American Fraternities and Sororities',
        year: '2000',
        publisher: 'Kensington Publishing'
      }
    ],
    academicContext: 'Primary source documents from BGLO founding periods reveal that organizations were established to address educational barriers, create mutual support networks, and promote scholarship and service during Jim Crow segregation. Founding documents emphasize uplifting the race, not occult purposes. Many founders were active church members and ministers.'
  }
];

interface ScholarlyReferencesProps {
  categoryId: string;
  compact?: boolean;
}

export const ScholarlyReferences: React.FC<ScholarlyReferencesProps> = ({ 
  categoryId,
  compact = false 
}) => {
  const references = categoryScholarlyReferences.find(r => r.categoryId === categoryId);
  
  if (!references) return null;

  const formatCitation = (ref: ScholarlyReference): string => {
    let citation = `${ref.author}. "${ref.title}." `;
    if (ref.publisher) citation += `${ref.publisher}, `;
    citation += ref.year;
    if (ref.pages) citation += `, ${ref.pages}`;
    citation += '.';
    return citation;
  };

  const generateTTSText = (): string => {
    let text = `Scholarly Context. ${references.academicContext} `;
    text += `Primary source: ${references.primarySource.author}, ${references.primarySource.title}, ${references.primarySource.year}. `;
    if (references.supportingSources.length > 0) {
      text += `Supporting sources include: `;
      references.supportingSources.forEach((source, index) => {
        text += `${source.author}, ${source.title}. `;
      });
    }
    return text;
  };

  if (compact) {
    return (
      <Collapsible>
        <CollapsibleTrigger className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors group">
          <GraduationCap className="w-3.5 h-3.5" />
          <span className="underline-offset-2 group-hover:underline">View Scholarly References</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-3">
          <div className="bg-muted/30 rounded-lg p-3 border border-border/50 text-xs space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-[10px] gap-1">
                <BookOpen className="w-3 h-3" />
                Academic Sources
              </Badge>
              <ListenButton 
                text={generateTTSText()}
                itemId={`refs-${categoryId}`}
                title="Scholarly References"
                voice="onyx"
                size="sm"
              />
            </div>
            <p className="text-muted-foreground italic leading-relaxed">
              {references.academicContext}
            </p>
            <div className="pt-2 border-t border-border/50">
              <p className="font-medium text-foreground mb-1">Primary Source:</p>
              <p className="text-muted-foreground">{formatCitation(references.primarySource)}</p>
            </div>
            {references.supportingSources.length > 0 && (
              <div className="pt-2 border-t border-border/50">
                <p className="font-medium text-foreground mb-1">Supporting Sources:</p>
                <ul className="space-y-1 text-muted-foreground">
                  {references.supportingSources.map((source, index) => (
                    <li key={index}>• {formatCitation(source)}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <div className="bg-gradient-to-br from-sacred/5 to-muted/30 rounded-lg p-4 border border-sacred/20">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded bg-sacred/10">
          <GraduationCap className="w-4 h-4 text-sacred" />
        </div>
        <h4 className="font-semibold text-foreground text-sm">Scholarly Context</h4>
        <ListenButton 
          text={generateTTSText()}
          itemId={`refs-full-${categoryId}`}
          title="Scholarly References"
          voice="onyx"
          size="sm"
        />
      </div>
      
      <p className="text-sm text-muted-foreground italic leading-relaxed mb-4">
        {references.academicContext}
      </p>

      <div className="space-y-3">
        <div className="bg-background/50 rounded p-3 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="text-[10px] bg-sacred hover:bg-sacred/90">Primary Source</Badge>
          </div>
          <p className="text-xs text-foreground/80">{formatCitation(references.primarySource)}</p>
        </div>

        {references.supportingSources.length > 0 && (
          <div className="bg-muted/30 rounded p-3 border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-[10px] border-sacred/50 text-sacred">
                Supporting Sources
              </Badge>
            </div>
            <ul className="space-y-1.5">
              {references.supportingSources.map((source, index) => (
                <li key={index} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="text-sacred">•</span>
                  <span>{formatCitation(source)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScholarlyReferences;
