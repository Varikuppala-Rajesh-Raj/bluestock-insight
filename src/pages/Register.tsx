import { RegisterForm } from '@/components/auth/RegisterForm';
import { BarChart3 } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const Register = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center p-12">
        <div className="max-w-md text-white">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="h-12 w-12" />
            <h1 className="text-4xl font-bold">Bluestock</h1>
          </div>
          <h2 className="text-3xl font-bold mb-4">Join the Future of Financial Analysis</h2>
          <p className="text-lg opacity-90">
            Get started with advanced ML-powered insights, comprehensive company profiles, and data-driven decision making.
          </p>
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-white" />
              <span>Real-time financial metrics</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-white" />
              <span>ML-driven Pros & Cons analysis</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-white" />
              <span>Comprehensive analytics dashboard</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-muted/20">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:hidden">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BarChart3 className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">Bluestock</h1>
            </div>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
