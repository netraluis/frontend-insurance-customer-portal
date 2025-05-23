import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AccountPage() {
  return (
    <div className="flex flex-col min-h-screen animate-in">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Account</h1>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Avatar>
            <AvatarImage src="/vibrant-street-market.png" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="flex-1 p-6 pt-4 page-transition">
        <div className="grid gap-6">
          <Tabs defaultValue="profile">
            <TabsList className="mb-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Manage your personal details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex flex-col items-center gap-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="/vibrant-street-market.png" alt="User" />
                        <AvatarFallback className="text-2xl">JD</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        Change Photo
                      </Button>
                    </div>

                    <div className="flex-1 grid gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="John" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Doe" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="john.doe@example.com" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input id="dob" type="date" defaultValue="1985-06-15" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="idNumber">National ID / Passport</Label>
                        <Input id="idNumber" defaultValue="123-45-6789" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Address Information</CardTitle>
                  <CardDescription>Manage your address details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="address1">Address Line 1</Label>
                      <Input id="address1" defaultValue="123 Insurance Street" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address2">Address Line 2</Label>
                      <Input id="address2" defaultValue="Apt 456" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" defaultValue="New York" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" defaultValue="NY" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="zipCode">Zip Code</Label>
                        <Input id="zipCode" defaultValue="10001" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" defaultValue="United States" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-4">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Change your password</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>

                  <Button className="mt-4">Update Password</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-zinc-500">Protect your account with 2FA</p>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <h3 className="font-medium">Policy Updates</h3>
                        <p className="text-sm text-zinc-500">Receive updates about your policies</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="policyEmail"
                            className="h-4 w-4 rounded border-zinc-300"
                            defaultChecked
                          />
                          <Label htmlFor="policyEmail" className="text-sm">
                            Email
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="policySMS"
                            className="h-4 w-4 rounded border-zinc-300"
                            defaultChecked
                          />
                          <Label htmlFor="policySMS" className="text-sm">
                            SMS
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <h3 className="font-medium">Claim Updates</h3>
                        <p className="text-sm text-zinc-500">Receive updates about your claims</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="claimEmail"
                            className="h-4 w-4 rounded border-zinc-300"
                            defaultChecked
                          />
                          <Label htmlFor="claimEmail" className="text-sm">
                            Email
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="claimSMS"
                            className="h-4 w-4 rounded border-zinc-300"
                            defaultChecked
                          />
                          <Label htmlFor="claimSMS" className="text-sm">
                            SMS
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <h3 className="font-medium">Payment Reminders</h3>
                        <p className="text-sm text-zinc-500">Receive reminders about upcoming payments</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="paymentEmail"
                            className="h-4 w-4 rounded border-zinc-300"
                            defaultChecked
                          />
                          <Label htmlFor="paymentEmail" className="text-sm">
                            Email
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="paymentSMS"
                            className="h-4 w-4 rounded border-zinc-300"
                            defaultChecked
                          />
                          <Label htmlFor="paymentSMS" className="text-sm">
                            SMS
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Marketing</h3>
                        <p className="text-sm text-zinc-500">Receive marketing communications</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" id="marketingEmail" className="h-4 w-4 rounded border-zinc-300" />
                          <Label htmlFor="marketingEmail" className="text-sm">
                            Email
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" id="marketingSMS" className="h-4 w-4 rounded border-zinc-300" />
                          <Label htmlFor="marketingSMS" className="text-sm">
                            SMS
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button className="mt-6">Save Preferences</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Preferences</CardTitle>
                  <CardDescription>Customize your account experience</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <h3 className="font-medium">Language</h3>
                        <p className="text-sm text-zinc-500">Select your preferred language</p>
                      </div>
                      <select className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <h3 className="font-medium">Time Zone</h3>
                        <p className="text-sm text-zinc-500">Select your time zone</p>
                      </div>
                      <select className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm">
                        <option>Eastern Time (ET)</option>
                        <option>Central Time (CT)</option>
                        <option>Mountain Time (MT)</option>
                        <option>Pacific Time (PT)</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Currency</h3>
                        <p className="text-sm text-zinc-500">Select your preferred currency</p>
                      </div>
                      <select className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                        <option>CAD (C$)</option>
                      </select>
                    </div>
                  </div>

                  <Button className="mt-6">Save Preferences</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}