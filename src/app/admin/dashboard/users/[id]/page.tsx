import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getUserDetails } from '@/app/actions/users';
import UserProfileForm from '@/components/Form/user-profile';
import { Save } from 'lucide-react';

type AdminDashboardUserPageProps = {
  params: { id: string };
};

const AdminDashboardUserPage = async ({
  params,
}: AdminDashboardUserPageProps) => {
  const userId = params.id;
  const user = await getUserDetails(userId);

  const userBadgeVariant =
    user?.account_status === 'APPROVED'
      ? 'default'
      : user?.account_status === 'DENIED'
        ? 'destructive'
        : 'secondary';

  return (
    <div className="min-h-full bg-gray-100 dark:bg-gray-900">
      <div className="w-full mx-auto p-5">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">
                Client Profile
              </CardTitle>
              <Badge variant={userBadgeVariant}>{user?.account_status}</Badge>
            </div>
            <CardDescription>View and edit user information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage
                    src="/placeholder.svg?height=80&width=80"
                    alt={user?.email}
                  />
                  <AvatarFallback>{user?.email.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{user?.email}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    User ID: {user?.documentId}
                  </p>
                </div>
              </div>

              <Tabs defaultValue="general" className="w-full">
                <TabsList>
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>
                <TabsContent value="general">
                  <UserProfileForm user={user} />
                </TabsContent>
                <TabsContent value="security">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="twoFactorEnabled">
                          Two-Factor Authentication
                        </Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Enhance your account security by enabling two-factor
                          authentication.
                        </p>
                      </div>
                      <Switch id="twoFactorEnabled" checked={true} />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Active</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date('2023-04-15T14:30:00Z').toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Button type="submit" className="w-full mt-4">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardUserPage;
