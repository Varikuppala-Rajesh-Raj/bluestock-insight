import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { MLResults } from '@/components/company/MLResults';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, Globe, Calendar, MapPin, ArrowLeft } from 'lucide-react';
import { mockCompanies } from '@/services/mockData';

const CompanyDetail = () => {
  const { id } = useParams();
  const company = mockCompanies.find(c => c.id === id);

  if (!company) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Company not found</h1>
            <Link to="/companies">
              <Button>Back to Companies</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <Link to="/companies">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Companies
          </Button>
        </Link>

        {company.bannerUrl && (
          <div className="mb-6 h-48 rounded-xl overflow-hidden">
            <img 
              src={company.bannerUrl} 
              alt={company.companyName}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {company.logoUrl ? (
                      <img src={company.logoUrl} alt={company.companyName} className="h-14 w-14 rounded-lg object-cover" />
                    ) : (
                      <Building2 className="h-8 w-8 text-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{company.companyName}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{company.industry}</Badge>
                      <Badge variant="outline">{company.city}, {company.state}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {company.description || 'No description available'}
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {company.website && (
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Website
                      </a>
                    </div>
                  )}
                  {company.foundedDate && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Founded {new Date(company.foundedDate).getFullYear()}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{company.city}, {company.country}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {company.mlResults && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Financial Analysis</h2>
                <MLResults 
                  pros={company.mlResults.pros} 
                  cons={company.mlResults.cons} 
                />
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Full Address</p>
                  <p className="font-medium">
                    {company.address}, {company.city}
                    <br />
                    {company.state}, {company.postalCode}
                    <br />
                    {company.country}
                  </p>
                </div>
                {company.socialLinks && Object.keys(company.socialLinks).length > 0 && (
                  <div>
                    <p className="text-muted-foreground mb-2">Social Media</p>
                    <div className="space-y-1">
                      {Object.entries(company.socialLinks).map(([platform, url]) => (
                        <a 
                          key={platform}
                          href={url as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-primary hover:underline capitalize"
                        >
                          {platform}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {company.mlResults && (
              <Card>
                <CardHeader>
                  <CardTitle>Analysis Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Strengths</span>
                        <Badge className="bg-success text-success-foreground">
                          {company.mlResults.pros.length}
                        </Badge>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-success rounded-full"
                          style={{ width: `${(company.mlResults.pros.length / 3) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Weaknesses</span>
                        <Badge className="bg-destructive text-destructive-foreground">
                          {company.mlResults.cons.length}
                        </Badge>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-destructive rounded-full"
                          style={{ width: `${(company.mlResults.cons.length / 3) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyDetail;
