import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface MLResult {
  metric: string;
  value: string;
  year: string;
}

interface MLResultsProps {
  pros: MLResult[];
  cons: MLResult[];
}

export const MLResults = ({ pros, cons }: MLResultsProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border-success/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-success">
            <TrendingUp className="h-5 w-5" />
            Strengths (Pros)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pros.length > 0 ? (
            pros.map((pro, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border border-success/20 bg-success/5 p-3">
                <div>
                  <p className="font-medium">{pro.metric}</p>
                  <p className="text-sm text-muted-foreground">{pro.year}</p>
                </div>
                <Badge className="bg-success text-success-foreground hover:bg-success/90">
                  {pro.value}
                </Badge>
              </div>
            ))
          ) : (
            <div className="flex items-center gap-2 text-muted-foreground">
              <AlertCircle className="h-4 w-4" />
              <p className="text-sm">No significant strengths identified</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-destructive/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <TrendingDown className="h-5 w-5" />
            Weaknesses (Cons)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {cons.length > 0 ? (
            cons.map((con, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border border-destructive/20 bg-destructive/5 p-3">
                <div>
                  <p className="font-medium">{con.metric}</p>
                  <p className="text-sm text-muted-foreground">{con.year}</p>
                </div>
                <Badge className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  {con.value}
                </Badge>
              </div>
            ))
          ) : (
            <div className="flex items-center gap-2 text-muted-foreground">
              <AlertCircle className="h-4 w-4" />
              <p className="text-sm">No significant weaknesses identified</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
