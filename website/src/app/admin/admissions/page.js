"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Check, X, Trash2, FileText, Clock, CheckCircle, Mail } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import EmptyState from "@/components/EmptyState";

const statusConfig = {
  pending: { label: "Pending", icon: Clock, color: "text-amber-600 bg-amber-50" },
  reviewed: { label: "Reviewed", icon: Eye, color: "text-blue-600 bg-blue-50" },
  responded: { label: "Responded", icon: CheckCircle, color: "text-green-600 bg-green-50" },
  closed: { label: "Closed", icon: X, color: "text-gray-600 bg-gray-50" },
};

export default function AdmissionsPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, pending: 0, reviewed: 0, responded: 0 });
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const fetchEnquiries = async () => {
    try {
      const [enquiriesRes, statsRes] = await Promise.all([
        fetch("/api/admissions"),
        fetch("/api/admissions?action=stats"),
      ]);
      const enquiriesData = await enquiriesRes.json();
      const statsData = await statsRes.json();

      if (enquiriesData.success) setEnquiries(enquiriesData.data);
      if (statsData.success) setStats(statsData.data);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchEnquiries();
  }, [isAuthenticated]);

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await fetch("/api/admissions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Marked as ${status}`);
        fetchEnquiries();
        setSelectedEnquiry(null);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      const res = await fetch(`/api/admissions?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Enquiry deleted");
        fetchEnquiries();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,#effaf0_0%,#eef7ff_48%,#fff9e6_100%)]">
        <div className="text-center">
          <div className="loader-orbit mx-auto">
            <div className="loader-core" />
          </div>
          <p className="mt-5 text-sm font-medium text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#f1f8f4_52%,#eef5ff_100%)]">
      <header className="sticky top-0 z-40 border-b border-white/60 bg-white/86 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admission Applications</h1>
            <p className="mt-1 text-sm text-muted-foreground">Manage admission enquiries</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: "Total", value: stats.total, icon: FileText, color: "from-primary/14 to-primary/5" },
            { label: "Pending", value: stats.pending, icon: Clock, color: "from-amber-14 to-amber-5" },
            { label: "Reviewed", value: stats.reviewed, icon: Eye, color: "from-blue-14 to-blue-5" },
            { label: "Responded", value: stats.responded, icon: CheckCircle, color: "from-green-14 to-green-5" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="surface-card-strong p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="mt-1 text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <span className={`inline-flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-gradient-to-br ${stat.color}`}>
                    <Icon size={22} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 surface-card-strong overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-muted-foreground">Loading...</div>
          ) : enquiries.length === 0 ? (
            <div className="p-10">
              <EmptyState
                icon={FileText}
                title="No admission enquiries found"
                description="New enquiry submissions will appear here."
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead className="bg-gradient-to-r from-primary to-secondary text-white">
                  <tr>
                    <th className="px-4 py-4 text-left text-sm font-semibold uppercase">#</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold uppercase">Name</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold uppercase">Contact</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold uppercase">Relation</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold uppercase">Status</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold uppercase">Date</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enquiry, index) => {
                    const status = statusConfig[enquiry.status] || statusConfig.pending;
                    const StatusIcon = status.icon;
                    return (
                      <tr key={enquiry._id} className="border-b border-border/70 bg-white/70 hover:bg-secondary/6">
                        <td className="px-4 py-4 text-sm font-medium text-muted-foreground">{index + 1}</td>
                        <td className="px-4 py-4">
                          <p className="font-semibold text-foreground">{enquiry.fullName}</p>
                          {enquiry.subject && <p className="text-xs text-muted-foreground">{enquiry.subject}</p>}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <p className="text-foreground">{enquiry.mobileNumber}</p>
                          <p className="text-xs text-muted-foreground">{enquiry.emailAddress}</p>
                        </td>
                        <td className="px-4 py-4 text-sm capitalize text-foreground">{enquiry.relation}</td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${status.color}`}>
                            <StatusIcon size={12} />
                            {status.label}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">
                          {new Date(enquiry.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedEnquiry(enquiry)}
                              className="rounded-lg p-2 hover:bg-secondary/10"
                              title="View Details"
                            >
                              <Eye size={18} className="text-primary" />
                            </button>
                            <button
                              onClick={() => handleDelete(enquiry._id)}
                              className="rounded-lg p-2 hover:bg-red-50"
                              title="Delete"
                            >
                              <Trash2 size={18} className="text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="surface-card-strong max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-foreground">Application Details</h3>
                <p className="text-sm text-muted-foreground">
                  Submitted on {new Date(selectedEnquiry.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button onClick={() => setSelectedEnquiry(null)} className="rounded-lg p-2 hover:bg-secondary/10">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Full Name</label>
                  <p className="font-semibold text-foreground">{selectedEnquiry.fullName}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Relation</label>
                  <p className="font-semibold text-foreground capitalize">{selectedEnquiry.relation}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Mobile</label>
                  <p className="font-semibold text-foreground">{selectedEnquiry.mobileNumber}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Email</label>
                  <p className="font-semibold text-foreground">{selectedEnquiry.emailAddress}</p>
                </div>
              </div>
              {selectedEnquiry.subject && (
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Subject</label>
                  <p className="font-semibold text-foreground">{selectedEnquiry.subject}</p>
                </div>
              )}
              <div>
                <label className="text-xs font-medium text-muted-foreground">Message</label>
                <div className="mt-1 rounded-lg bg-secondary/5 p-4 text-foreground whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <label className="text-sm font-medium text-foreground mb-3 block">Update Status</label>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(statusConfig).map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusUpdate(selectedEnquiry._id, status)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedEnquiry.status === status
                          ? "bg-primary text-white"
                          : "bg-secondary/10 text-foreground hover:bg-secondary/20"
                      }`}
                    >
                      {statusConfig[status].label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <a
                  href={`mailto:${selectedEnquiry.emailAddress}`}
                  className="flex-1 button-primary rounded-2xl py-3 flex items-center justify-center gap-2"
                >
                  <Mail size={18} />
                  Send Email
                </a>
                <button
                  onClick={() => handleDelete(selectedEnquiry._id)}
                  className="px-4 py-3 rounded-2xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
