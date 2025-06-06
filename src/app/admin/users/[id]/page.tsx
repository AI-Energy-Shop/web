import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getUserDetails, updateAccountStatus } from '@/app/actions/auth';
import AdminUserProfileForm from '@/components/forms/admin-user-profile-form';
import UserApprovalForm from '@/components/forms/user-approval-form';

type AdminDashboardUserPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    type: string;
    email: string;
    username: string;
    businessName: string;
    businessNumber: string;
    businessType: string;
    phone: string;
    street1: string;
    street2: string;
    city: string;
    country: string;
    state: string;
    zipCode: string;
  }>;
};

const AdminDashboardUserPage = async (props: AdminDashboardUserPageProps) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const user = await getUserDetails(params.id);

  const userData = user?.data?.usersPermissionsUser;

  if (userData?.account_status == 'PENDING') {
    await updateAccountStatus(userData?.documentId, 'REVIEWING');
  }

  const userBadgeVariant =
    userData?.account_status === 'APPROVED'
      ? 'default'
      : userData?.account_status === 'DENIED'
        ? 'destructive'
        : 'secondary';

  return (
    <div className="min-h-full bg-gray-100">
      <div className="w-full mx-auto p-5">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">User Details</CardTitle>
              <Badge variant={userBadgeVariant}>
                {userData?.account_status}
              </Badge>
            </div>
            <CardDescription>View and edit user information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    {userData?.username}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Email: {userData?.email}
                  </p>
                </div>
              </div>
              {searchParams.type === 'request' && (
                <UserApprovalForm
                  documentId={params.id}
                  defaultValues={searchParams}
                />
              )}
              {searchParams.type === 'approved' && (
                <AdminUserProfileForm user={userData} />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardUserPage;
