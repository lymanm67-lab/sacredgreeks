import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Search, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/sacred-greeks-logo.png";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src={logo} 
            alt="Sacred Greeks" 
            className="w-20 h-20 rounded-full object-cover"
          />
        </div>

        {/* 404 Display */}
        <div className="relative mb-6">
          <span className="text-8xl font-bold text-sacred/20">404</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="w-16 h-16 text-sacred animate-pulse" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on your spiritual journey.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={() => navigate(-1)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
          <Button asChild className="bg-sacred hover:bg-sacred/90">
            <Link to="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Home
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/dashboard" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Dashboard
            </Link>
          </Button>
        </div>

        {/* Quick Links */}
        <div className="mt-10 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">Popular destinations:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link to="/proof-course" className="text-sm text-sacred hover:underline">
              P.R.O.O.F. Course
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link to="/snapshot" className="text-sm text-sacred hover:underline">
              Faith Snapshot
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link to="/resources" className="text-sm text-sacred hover:underline">
              Resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
