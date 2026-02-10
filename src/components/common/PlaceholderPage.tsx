import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

const PlaceholderPage = ({ title, description }: PlaceholderPageProps) => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Coming Soon</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This module is under development and will be available in the next phase.
        </p>
      </CardContent>
    </Card>
  </div>
);

export default PlaceholderPage;
