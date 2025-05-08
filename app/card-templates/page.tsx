import { Button } from "@/components/ui/button"
import {
  BasicCard,
  MetricCard,
  ListItemCard,
  ActionCard,
  DocumentCard,
  ProfileCard,
  StatusCard,
} from "@/app/components/card-templates"
import {
  FileText,
  Download,
  Eye,
  MoreHorizontal,
  Car,
  Users,
  CreditCard,
  Calendar,
  ArrowRight,
  Mail,
  Phone,
  User,
  Home,
  DollarSign,
  CheckCircle2,
} from "lucide-react"

export default function CardTemplatesPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Card Templates</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Basic Card</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BasicCard title="Simple Card" description="A basic card with title and description">
            <p className="text-sm text-zinc-600">
              This is a simple card that can be used for displaying basic information. It supports a title, description,
              and custom content.
            </p>
          </BasicCard>

          <BasicCard
            title="With Header Action"
            description="A card with a header action"
            headerAction={<Button size="sm">Action</Button>}
          >
            <p className="text-sm text-zinc-600">
              This card includes a header action button that can be used for primary actions related to the card
              content.
            </p>
          </BasicCard>

          <BasicCard
            title="With Footer"
            description="A card with a footer section"
            footer={
              <div className="flex justify-between w-full">
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
                <Button size="sm">Save</Button>
              </div>
            }
          >
            <p className="text-sm text-zinc-600">
              This card includes a footer section that can contain actions or additional information related to the card
              content.
            </p>
          </BasicCard>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Metric Card</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Revenue"
            value="$15,231.89"
            icon={DollarSign}
            description="10% increase from last month"
            trend="up"
            trendValue="10%"
          />

          <MetricCard
            title="Active Users"
            value="2,350"
            icon={Users}
            description="5% decrease from last month"
            trend="down"
            trendValue="5%"
            colorScheme="warning"
          />

          <MetricCard
            title="Pending Claims"
            value="12"
            icon={FileText}
            description="Same as last month"
            trend="stable"
            colorScheme="info"
          />

          <MetricCard
            title="Completed Tasks"
            value="45"
            icon={CheckCircle2}
            description="15 more than yesterday"
            trend="up"
            trendValue="15"
            colorScheme="success"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">List Item Card</h2>
        <div className="grid grid-cols-1 gap-4">
          <ListItemCard
            title="Auto Insurance"
            subtitle="Policy #POL-AUTO-001"
            icon={Car}
            badge={{ text: "Active", variant: "outline", className: "bg-green-100 text-green-700" }}
            details={[
              { label: "Premium", value: "$128.45/month" },
              { label: "Renewal", value: "May 15, 2025" },
            ]}
            footer={{
              content: (
                <div className="flex justify-between w-full">
                  <span className="text-xs font-medium uppercase text-zinc-500">Auto Insurance</span>
                  <Button variant="ghost" size="sm" className="gap-1">
                    Manage Policy
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ),
            }}
          />

          <ListItemCard
            title="Home Insurance"
            subtitle="Policy #POL-HOME-001"
            icon={Home}
            badge={{ text: "Pending", variant: "outline", className: "bg-amber-100 text-amber-700" }}
            details={[
              { label: "Premium", value: "$89.99/month" },
              { label: "Renewal", value: "August 22, 2025" },
            ]}
            actions={
              <Button variant="ghost" size="sm" className="gap-1">
                View Details
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            }
            footer={{
              content: (
                <div className="flex justify-between w-full">
                  <span className="text-xs font-medium uppercase text-zinc-500">Home Insurance</span>
                  <Button variant="ghost" size="sm" className="gap-1">
                    Manage Policy
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ),
            }}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Action Card</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ActionCard
            title="Update Payment Method"
            description="Change your current payment information"
            icon={CreditCard}
            primaryAction={<Button>Update Payment</Button>}
            secondaryActions={<Button variant="outline">Cancel</Button>}
          >
            <p className="text-sm text-zinc-600">
              Your current payment method is a Visa card ending in 4242. You can update your payment method at any time.
            </p>
          </ActionCard>

          <ActionCard
            title="Schedule Appointment"
            description="Book a meeting with your insurance agent"
            icon={Calendar}
            primaryAction={<Button>Schedule Now</Button>}
            secondaryActions={
              <>
                <Button variant="outline">View Calendar</Button>
                <Button variant="ghost">Cancel</Button>
              </>
            }
            fullWidthActions
          >
            <p className="text-sm text-zinc-600">
              Schedule a meeting with your dedicated insurance agent to discuss your policy options and any questions
              you may have.
            </p>
          </ActionCard>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Document Card</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DocumentCard
            title="Auto Insurance Policy"
            fileType="PDF"
            fileSize="1.2 MB"
            date="April 15, 2025"
            category="Policy Document"
            description="Comprehensive auto insurance policy document with coverage details"
            tags={["auto", "policy", "important"]}
            actions={
              <>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">Preview</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </>
            }
          />

          <DocumentCard
            title="Home Inspection Report"
            fileType="XLSX"
            fileSize="2.1 MB"
            date="March 5, 2025"
            category="Inspection"
            description="Home inspection report for insurance coverage"
            tags={["home", "inspection", "report"]}
            actions={
              <>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">Preview</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </>
            }
          />

          <DocumentCard
            title="Property Photos"
            fileType="ZIP"
            fileSize="3.5 MB"
            date="March 15, 2025"
            category="Claim Document"
            description="Photos of property damage for home insurance claim"
            tags={["home", "claim", "photos"]}
            actions={
              <>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">Preview</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </>
            }
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Profile Card</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileCard
            name="John Doe"
            subtitle="Policy Holder"
            avatarSrc="/vibrant-street-market.png"
            avatarFallback="JD"
            badge={{ text: "Active", variant: "outline", className: "bg-green-100 text-green-700" }}
            details={[
              {
                label: "Email",
                value: "john.doe@example.com",
                icon: Mail,
              },
              {
                label: "Phone",
                value: "(555) 123-4567",
                icon: Phone,
              },
            ]}
            actions={<Button className="w-full">Contact</Button>}
            layout="horizontal"
          />

          <ProfileCard
            name="Sarah Johnson"
            subtitle="Claims Adjuster"
            avatarSrc="/abstract-ai-network.png"
            avatarFallback="SJ"
            badge={{ text: "Staff", variant: "outline", className: "bg-blue-100 text-blue-700" }}
            details={[
              {
                label: "Email",
                value: "sarah.johnson@insurance.com",
                icon: Mail,
              },
              {
                label: "Phone",
                value: "(555) 987-6543",
                icon: Phone,
              },
              {
                label: "Department",
                value: "Claims Processing",
                icon: User,
              },
            ]}
            actions={
              <>
                <Button className="flex-1">Message</Button>
                <Button variant="outline" className="flex-1">
                  View Profile
                </Button>
              </>
            }
            layout="vertical"
            avatarSize="lg"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Status Card</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatusCard
            title="Auto Accident Claim"
            subtitle="Claim #CLM-001"
            status="in-progress"
            progress={65}
            details={[
              { label: "Filed", value: "April 10, 2025", icon: Calendar },
              { label: "Amount", value: "$3,450.00", icon: DollarSign },
            ]}
            description="Collision damage to front bumper and hood"
            actions={
              <Button variant="ghost" size="sm" className="gap-1">
                View Details
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            }
          />

          <StatusCard
            title="Water Damage Claim"
            subtitle="Claim #CLM-002"
            status="completed"
            progress={100}
            details={[
              { label: "Filed", value: "March 5, 2025", icon: Calendar },
              { label: "Amount", value: "$2,800.00", icon: DollarSign },
            ]}
            description="Water damage from burst pipe in basement"
            actions={
              <Button variant="ghost" size="sm" className="gap-1">
                View Details
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            }
          />

          <StatusCard
            title="Stolen Property Claim"
            subtitle="Claim #CLM-004"
            status="denied"
            progress={100}
            details={[
              { label: "Filed", value: "January 25, 2025", icon: Calendar },
              { label: "Amount", value: "$1,800.00", icon: DollarSign },
            ]}
            description="Laptop and electronics stolen during break-in"
            actions={
              <Button variant="ghost" size="sm" className="gap-1">
                Appeal Decision
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            }
          />

          <StatusCard
            title="Dental Procedure"
            subtitle="Claim #CLM-009"
            status="pending"
            progress={10}
            details={[
              { label: "Filed", value: "April 8, 2025", icon: Calendar },
              { label: "Amount", value: "$950.00", icon: DollarSign },
            ]}
            description="Root canal and crown procedure"
            actions={
              <Button variant="ghost" size="sm" className="gap-1">
                Submit Documents
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            }
          />
        </div>
      </section>
    </div>
  )
}
