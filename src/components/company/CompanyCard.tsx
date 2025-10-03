import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CompanyCardProps {
  company: {
    id: string;
    companyName: string;
    industry: string;
    logoUrl?: string;
    mlResults?: {
      pros: any[];
      cons: any[];
    };
  };
}

export const CompanyCard = ({ company }: CompanyCardProps) => {
  const prosCount = company.mlResults?.pros?.length || 0;
  const consCount = company.mlResults?.cons?.length || 0;

  return (
    <Link to={`/company/${company.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              {company.logoUrl ? (
                <img src={company.logoUrl} alt={company.companyName} className="h-10 w-10 rounded object-cover" />
              ) : (
                <Building2 className="h-6 w-6 text-primary" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{company.companyName}</h3>
              <p className="text-sm text-muted-foreground">{company.industry}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            {prosCount > 0 && (
              <Badge variant="outline" className="border-success text-success">
                <TrendingUp className="mr-1 h-3 w-3" />
                {prosCount} Pros
              </Badge>
            )}
            {consCount > 0 && (
              <Badge variant="outline" className="border-destructive text-destructive">
                <TrendingDown className="mr-1 h-3 w-3" />
                {consCount} Cons
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
