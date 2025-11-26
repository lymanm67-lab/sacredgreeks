import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InvolveMeAssessment } from '@/components/assessment/InvolveMeAssessment';

const FMMPAAssessment = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/dashboard" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Dashboard</span>
            </Link>
            
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-sacred"></div>
              <h1 className="text-lg font-semibold text-foreground">
                FMMPA Assessment
              </h1>
            </div>

            <Link to="/">
              <Button variant="ghost" size="sm">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold mb-3">
              Discover Your 5 Persona Types Architecture
            </h2>
            <p className="text-muted-foreground text-lg">
              Complete this comprehensive assessment to understand your unique persona profile
            </p>
          </div>

          {/* Embed Container */}
          <div className="bg-card rounded-lg border shadow-sm p-6">
            <InvolveMeAssessment
              projectId="fmmpa"
              title="FMMPA - 5 Persona Types Architecture"
              assessmentType="FMMPA Assessment"
              className="w-full min-h-[600px]"
            />
          </div>

          {/* Info Card */}
          <div className="mt-6 bg-muted/50 rounded-lg p-6 text-center">
            <p className="text-sm text-muted-foreground">
              After completing the assessment, you'll receive a downloadable certificate
              and personalized guidance for your next steps in your faith journey.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FMMPAAssessment;
