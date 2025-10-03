import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Building2, TrendingUp, Users, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockCompanies } from '@/services/mockData';

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const stats = [
    {
      title: 'Total Companies',
      value: mockCompanies.length,
      icon: Building2,
      trend: '+12%',
      trendUp: true,
    },
    {
      title: 'Average Pros',
      value: '2.7',
      icon: TrendingUp,
      trend: '+8%',
      trendUp: true,
    },
    {
      title: 'Active Users',
      value: '1,234',
      icon: Users,
      trend: '+23%',
      trendUp: true,
    },
    {
      title: 'Total Metrics',
      value: '18',
      icon: BarChart3,
      trend: '+5%',
      trendUp: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.fullName || 'User'}!</h1>
          <p className="text-muted-foreground">Here's what's happening with your financial portfolio</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className={`text-xs ${stat.trendUp ? 'text-success' : 'text-destructive'}`}>
                    {stat.trend} from last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/companies">
                <Button className="w-full justify-start" variant="outline">
                  <Building2 className="mr-2 h-4 w-4" />
                  Browse Companies
                </Button>
              </Link>
              <Link to="/analytics">
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Companies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockCompanies.slice(0, 3).map((company) => (
                <Link key={company.id} to={`/company/${company.id}`}>
                  <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors cursor-pointer">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{company.companyName}</p>
                      <p className="text-sm text-muted-foreground">{company.industry}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
