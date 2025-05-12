import {
    BasicCardSkeleton,
    MetricCardSkeleton,
    ListItemCardSkeleton,
    ActionCardSkeleton,
    DocumentCardSkeleton,
    ProfileCardSkeleton,
    StatusCardSkeleton,
  } from "@/app/components/card-templates"
  
  export default function CardSkeletonsPage() {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Card Skeleton Loading States</h1>
  
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Basic Card Skeleton</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BasicCardSkeleton />
            <BasicCardSkeleton hasHeaderAction={true} />
            <BasicCardSkeleton hasFooter={true} />
          </div>
        </section>
  
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Metric Card Skeleton</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCardSkeleton />
            <MetricCardSkeleton />
            <MetricCardSkeleton />
            <MetricCardSkeleton />
          </div>
        </section>
  
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">List Item Card Skeleton</h2>
          <div className="grid grid-cols-1 gap-4">
            <ListItemCardSkeleton />
            <ListItemCardSkeleton />
          </div>
        </section>
  
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Action Card Skeleton</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ActionCardSkeleton />
            <ActionCardSkeleton fullWidthActions={true} />
          </div>
        </section>
  
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Document Card Skeleton</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DocumentCardSkeleton />
            <DocumentCardSkeleton />
            <DocumentCardSkeleton />
          </div>
        </section>
  
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Profile Card Skeleton</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileCardSkeleton layout="horizontal" />
            <ProfileCardSkeleton layout="vertical" avatarSize="lg" />
          </div>
        </section>
  
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Status Card Skeleton</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatusCardSkeleton />
            <StatusCardSkeleton />
          </div>
        </section>
      </div>
    )
  }
  