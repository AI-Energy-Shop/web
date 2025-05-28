import { statsData } from '@/lib/mock/stats';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/admin/stats-card';
import { LineChartComponent } from '@/components/admin/line-chart';

const AdminPage = () => {
  return (
    <main className="min-h-screen w-full bg-gray-50 p-5">
      <div className="mx-auto space-y-8">
        {/* Time period selector */}
        <div className="flex items-center gap-4">
          <Button size="sm" variant="outline">
            Last 30 days
          </Button>
          <Button size="sm" variant="outline">
            All channels
          </Button>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              percentageChange={stat.percentageChange}
            />
          ))}
        </div>

        {/* Analytics chart */}
        <LineChartComponent />

        {/* Status cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-2 rounded-lg bg-white p-4 shadow-sm">
            <span className="text-gray-600">50+ orders to fulfill</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-white p-4 shadow-sm">
            <span className="text-gray-600">50+ payments to capture</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-white p-4 shadow-sm">
            <span className="text-gray-600">3 high risk orders</span>
          </div>
        </div>

        {/* Action cards */}
        <div className="space-y-4">
          <div className="flex items-start justify-between rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold">
                Maximize email signups while maintaining regional compliance
              </h3>
              <p className="text-sm text-gray-600">
                Pre-select the email marketing consent checkbox for customers
                based on their region to maximize engagement while ensuring
                local marketing compliance.
              </p>
              <div className="flex gap-3">
                <button className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
                  Update settings
                </button>
              </div>
            </div>
            <div className="h-16 w-16 rounded-full bg-blue-100" />
          </div>

          <div className="flex items-start justify-between rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold">
                Put your marketing on autopilot
              </h3>
              <p className="text-sm text-gray-600">
                Send the right message at the right time with marketing
                automations. Get started in minutes with templates for welcome
                series and abandoned cart emails.
              </p>
              <div className="flex gap-3">
                <button className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
                  Create automation
                </button>
                <button className="rounded-md text-sm font-medium text-blue-600 hover:text-blue-500">
                  Learn more
                </button>
              </div>
            </div>
            <div className="h-16 w-16 rounded-full bg-blue-100" />
          </div>

          <div className="flex items-start justify-between rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold">
                Streamline your business with Plus Certified Apps
              </h3>
              <p className="text-sm text-gray-600">
                Find best-in-class apps that can help you simplify your
                processes and solve complex problems—built with the Plus
                merchant tech stack in mind.
              </p>
              <div className="flex gap-3">
                <button className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
                  View app guide
                </button>
              </div>
            </div>
            <div className="h-16 w-16 rounded-full bg-blue-100" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminPage;
