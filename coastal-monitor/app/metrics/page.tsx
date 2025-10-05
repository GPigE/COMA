import { MetricsDashboard } from "@/components/metrics-dashboard"
import { Sidebar } from "@/components/sidebar"

export default function MetricsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <MetricsDashboard />
      </main>
    </div>
  )
}
