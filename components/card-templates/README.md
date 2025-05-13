# Card Templates

This directory contains reusable card layout templates for common UI patterns in the insurance portal application.

## Available Templates

### BasicCard

A standard card layout with optional title, description, and footer.

\`\`\`tsx
<BasicCard 
  title="Card Title" 
  description="Card description" 
  headerAction={<Button>Action</Button>}
  footer={<div>Footer content</div>}
>
  Card content goes here
</BasicCard>
\`\`\`

### MetricCard

A card for displaying key metrics and statistics.

\`\`\`tsx
<MetricCard
  title="Total Revenue"
  value="$15,231.89"
  icon={DollarSign}
  description="10% increase from last month"
  trend="up"
  trendValue="10%"
/>
\`\`\`

### ListItemCard

A card layout for displaying items in a list format.

\`\`\`tsx
<ListItemCard
  title="Auto Insurance"
  subtitle="Policy #POL-AUTO-001"
  icon={Car}
  badge={{ text: "Active", variant: "outline", className: "bg-green-100 text-green-700" }}
  details={[
    { label: "Premium", value: "$128.45/month" },
    { label: "Renewal", value: "May 15, 2025" },
  ]}
  actions={<Button>View Details</Button>}
  footer={{
    content: <span>Footer content</span>,
  }}
/>
\`\`\`

### ActionCard

A card layout with prominent action buttons.

\`\`\`tsx
<ActionCard
  title="Update Payment Method"
  description="Change your current payment information"
  icon={CreditCard}
  primaryAction={<Button>Update Payment</Button>}
  secondaryActions={<Button variant="outline">Cancel</Button>}
>
  Card content goes here
</ActionCard>
\`\`\`

### DocumentCard

A card layout for displaying document/file information.

\`\`\`tsx
<DocumentCard
  title="Auto Insurance Policy"
  fileType="PDF"
  fileSize="1.2 MB"
  date="April 15, 2025"
  category="Policy Document"
  description="Comprehensive auto insurance policy document"
  tags={["auto", "policy", "important"]}
  actions={<Button>Download</Button>}
/>
\`\`\`

### ProfileCard

A card layout for displaying user or entity profiles.

\`\`\`tsx
<ProfileCard
  name="John Doe"
  subtitle="Policy Holder"
  avatarSrc="/path/to/avatar.png"
  avatarFallback="JD"
  badge={{ text: "Active", variant: "outline" }}
  details={[
    { label: "Email", value: "john.doe@example.com", icon: Mail },
    { label: "Phone", value: "(555) 123-4567", icon: Phone },
  ]}
  actions={<Button>Contact</Button>}
  layout="horizontal"
/>
\`\`\`

### StatusCard

A card layout for displaying status information with visual indicators.

\`\`\`tsx
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
  actions={<Button>View Details</Button>}
/>
\`\`\`

## Skeleton Loading States

Each card template has a corresponding skeleton loading state that can be used while content is loading.

### BasicCardSkeleton

\`\`\`tsx
<BasicCardSkeleton 
  hasTitle={true}
  hasDescription={true}
  hasHeaderAction={false}
  hasFooter={false}
  contentHeight="h-24"
/>
\`\`\`

### MetricCardSkeleton

\`\`\`tsx
<MetricCardSkeleton 
  hasIcon={true}
  hasTrend={true}
/>
\`\`\`

### ListItemCardSkeleton

\`\`\`tsx
<ListItemCardSkeleton 
  hasIcon={true}
  hasBadge={true}
  hasDetails={true}
  hasActions={true}
  hasFooter={true}
/>
\`\`\`

### ActionCardSkeleton

\`\`\`tsx
<ActionCardSkeleton 
  hasIcon={true}
  hasContent={true}
  hasPrimaryAction={true}
  hasSecondaryActions={true}
  fullWidthActions={false}
  contentHeight="h-20"
/>
\`\`\`

### DocumentCardSkeleton

\`\`\`tsx
<DocumentCardSkeleton 
  hasBadge={true}
  hasDescription={true}
  hasTags={true}
  hasActions={true}
/>
\`\`\`

### ProfileCardSkeleton

\`\`\`tsx
<ProfileCardSkeleton 
  hasBadge={true}
  hasDetails={true}
  hasActions={true}
  avatarSize="md"
  layout="vertical"
/>
\`\`\`

### StatusCardSkeleton

\`\`\`tsx
<StatusCardSkeleton 
  hasProgress={true}
  hasDetails={true}
  hasDescription={true}
  hasActions={true}
/>
\`\`\`

## Usage

Import the card templates and their skeleton variants from the `components/card-templates` directory:

\`\`\`tsx
import { 
  BasicCard, 
  BasicCardSkeleton,
  MetricCard, 
  MetricCardSkeleton,
  ListItemCard,
  ListItemCardSkeleton,
  ActionCard,
  ActionCardSkeleton,
  DocumentCard,
  DocumentCardSkeleton,
  ProfileCard,
  ProfileCardSkeleton,
  StatusCard,
  StatusCardSkeleton
} from "@/components/card-templates"
\`\`\`

### Example with Loading State

\`\`\`tsx
function PolicyList() {
  const [isLoading, setIsLoading] = useState(true)
  const [policies, setPolicies] = useState([])

  useEffect(() => {
    // Fetch data
    fetchPolicies().then(data => {
      setPolicies(data)
      setIsLoading(false)
    })
  }, [])

  return (
    <div className="space-y-4">
      {isLoading ? (
        // Show skeleton loading states
        <>
          <ListItemCardSkeleton />
          <ListItemCardSkeleton />
        </>
      ) : (
        // Show actual content
        policies.map(policy => (
          <ListItemCard 
            key={policy.id}
            title={policy.title}
            // ... other props
          />
        ))
      )}
    </div>
  )
}
\`\`\`

See the demo pages at `/card-templates` and `/card-templates/skeletons` for examples of all card templates and their skeleton variants.
