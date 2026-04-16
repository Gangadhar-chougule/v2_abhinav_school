"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, FileText, Info, LogOut, Users, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ totalAdmissions: 0, totalStaff: 0, totalEvents: 0 });
  const [loadingStats, setLoadingStats] = useState(true);
  const { isAuthenticated, user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const fetchStats = async () => {
    try {
      const [admissionsRes, staffRes, eventsRes] = await Promise.all([
        fetch("/api/admissions?action=stats"),
        fetch("/api/staff"),
        fetch("/api/events"),
      ]);

      const admissionsData = await admissionsRes.json();
      const staffData = await staffRes.json();
      const eventsData = await eventsRes.json();

      setStats({
        totalAdmissions: admissionsData.success ? admissionsData.data.total : 0,
        totalStaff: staffData.success ? staffData.data.length : 0,
        totalEvents: eventsData.success ? eventsData.data.length : 0,
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchStats();
  }, [isAuthenticated]);

  const menuItems = [
    {
      label: "Admissions",
      description: "View & manage admission applications",
      href: "/admin/admissions",
      icon: FileText,
      color: "from-primary/14 to-primary/5 text-primary",
      borderColor: "border-primary/25",
      bgColor: "bg-primary/6",
    },
    {
      label: "Staff",
      description: "Add, edit or remove staff members",
      href: "/admin/staff",
      icon: Users,
      color: "from-secondary/14 to-secondary/5 text-secondary",
      borderColor: "border-secondary/25",
      bgColor: "bg-secondary/6",
    },
    {
      label: "Events",
      description: "Add, edit or remove school events",
      href: "/admin/events",
      icon: Calendar,
      color: "from-accent/30 to-accent/10 text-foreground",
      borderColor: "border-accent/45",
      bgColor: "bg-accent/16",
    },
  ];

  if (isLoading) {
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

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#f1f8f4_52%,#eef5ff_100%)]">
      <header className="sticky top-0 z-40 border-b border-white/60 bg-white/86 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">Sant Dnyaneshwar Shikshan Sanstha</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white px-4 py-2 text-sm text-foreground shadow-[0_12px_24px_rgba(15,23,42,0.06)]">
              Welcome, {user?.name || user?.username || "Admin"}
            </span>
            <Link href="/" className="button-secondary border-secondary/20 bg-secondary/8 px-5 py-2.5 text-secondary">
              View Website
            </Link>
            <button onClick={logout} className="button-accent px-5 py-2.5">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="section-panel">
          <h2 className="heading-sub mb-3">Welcome to Admin Portal</h2>
          <p className="body-text">Manage your school website content and settings from here.</p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { label: "Admissions", value: loadingStats ? "..." : stats.totalAdmissions, icon: FileText, tone: "from-primary/14 to-primary/5 text-primary" },
            { label: "Staff", value: loadingStats ? "..." : stats.totalStaff, icon: Users, tone: "from-secondary/14 to-secondary/5 text-secondary" },
            { label: "Events", value: loadingStats ? "..." : stats.totalEvents, icon: Calendar, tone: "from-accent/30 to-accent/10 text-foreground" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="surface-card-strong p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{stat.label}</h3>
                    <p className="mt-4 text-4xl font-extrabold text-foreground">{stat.value}</p>
                    <p className="mt-2 text-sm text-muted-foreground">Total {stat.label}</p>
                  </div>
                  <span className={`inline-flex h-14 w-14 items-center justify-center rounded-[1.35rem] bg-gradient-to-br ${stat.tone}`}>
                    <Icon size={24} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`surface-card-strong p-6 border-2 border-dashed ${item.borderColor} ${item.bgColor} hover:-translate-y-1 transition-transform`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className={`inline-flex h-10 w-10 items-center justify-center rounded-[1.1rem] bg-gradient-to-br ${item.color} mb-4`}>
                        <Icon size={20} />
                      </div>
                      <h4 className="text-lg font-semibold text-foreground">{item.label}</h4>
                      <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <ArrowRight size={20} className="text-muted-foreground" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
