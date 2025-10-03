import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { CompanyCard } from '@/components/company/CompanyCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { mockCompanies } from '@/services/mockData';

const Companies = () => {
  const [search, setSearch] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');

  const industries = ['all', ...new Set(mockCompanies.map(c => c.industry))];

  const filteredCompanies = mockCompanies.filter(company => {
    const matchesSearch = company.companyName.toLowerCase().includes(search.toLowerCase()) ||
                         company.industry.toLowerCase().includes(search.toLowerCase());
    const matchesIndustry = industryFilter === 'all' || company.industry === industryFilter;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Companies</h1>
          <p className="text-muted-foreground">Explore companies with ML-powered financial insights</p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={industryFilter} onValueChange={setIndustryFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map(industry => (
                <SelectItem key={industry} value={industry}>
                  {industry === 'all' ? 'All Industries' : industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCompanies.map(company => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No companies found matching your criteria</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Companies;
