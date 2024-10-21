import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
// import { Toast } from "@/components/ui/toast"
// import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Save, UserCircle, Mail, Phone, MapPin, Building, Shield, Activity } from "lucide-react"



const user = {
    id: "12345",
    firstName: "Jane",
    middleName: "Melgar",
    lastName: "Doe",
    email: "jane.doe@example.com",
    level: "SMALL",
    status: "PENDING",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, AN 12345",
    company: "HP Energy",
    odooId: "OD12456",
    bio: "Experienced editor with a passion for technology and innovation.",
    lastActive: "2023-04-15T14:30:00Z",
    twoFactorEnabled: true,
  }

const AdminDashboardUserPage = async () => {
  return (
    <div className="min-h-full bg-gray-100 dark:bg-gray-900">
      <div className="w-full mx-auto p-5">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">Client Profile</CardTitle>
              <Badge variant={user.status === "active" ? "default" : "secondary"}>
                {user.status}
              </Badge>
            </div>
            <CardDescription>View and edit user information</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" alt={user.company.slice(0, 2)} />
                    <AvatarFallback>{user.company.slice(0,2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-semibold">{user.company}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">User ID: {user.id}</p>
                  </div>
                </div>

                <Tabs defaultValue="general" className="w-full">
                  <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                  </TabsList>
                  <TabsContent value="general">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={user.firstName}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="middleName">Middle Name</Label>
                          <Input
                            id="middleName"
                            name="middleName"
                            value={user.middleName}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={user.lastName}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={user.email}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Level</Label>
                          <Select
                            value={user.level}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">SMALL</SelectItem>
                              <SelectItem value="editor">MID-SIZED</SelectItem>
                              <SelectItem value="viewer">VIP</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="status">Status</Label>
                          <Select
                            
                            value={user.status}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">APPROVED</SelectItem>
                              <SelectItem value="inactive">DENIED</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={user.phone}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input
                            id="company"
                            name="company"
                            value={user.company}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">ODOO ID</Label>
                          <Input
                            id="company"
                            name="company"
                            value={user.odooId}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                          id="address"
                          name="address"
                          value={user.address}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="security">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="twoFactorEnabled">Two-Factor Authentication</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Enhance your account security by enabling two-factor authentication.
                          </p>
                        </div>
                        <Switch
                          id="twoFactorEnabled"
                          checked={user.twoFactorEnabled}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Last Active</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(user.lastActive).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <Button type="submit" className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardUserPage;
