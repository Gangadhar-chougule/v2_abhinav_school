"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Upload, X, Calendar, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import EmptyState from "@/components/EmptyState";

export default function EventsManagementPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    image: "",
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      if (data.success) setEvents(data.data);
    } catch (error) {
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchEvents();
  }, [isAuthenticated]);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const payload = new FormData();
      payload.append("file", file);
      const response = await fetch("/api/upload?section=events", {
        method: "POST",
        body: payload,
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setForm({ ...form, image: result.imagePath });
        toast.success("Image uploaded successfully");
      } else {
        toast.error(result.error || "Upload failed");
      }
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.date) {
      toast.error("Title and date are required");
      return;
    }

    try {
      const res = editingEvent
        ? await fetch("/api/events", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: editingEvent._id, ...form }),
          })
        : await fetch("/api/events", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });

      const data = await res.json();
      if (data.success) {
        toast.success(editingEvent ? "Event updated" : "Event added");
        setShowModal(false);
        resetForm();
        fetchEvents();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setForm({
      title: event.title,
      description: event.description || "",
      date: event.date ? new Date(event.date).toISOString().split("T")[0] : "",
      location: event.location || "",
      image: event.image || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this event?")) return;
    try {
      const res = await fetch(`/api/events?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Event deleted");
        fetchEvents();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const resetForm = () => {
    setForm({ title: "", description: "", date: "", location: "", image: "" });
    setEditingEvent(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
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
            <h1 className="text-3xl font-bold text-foreground">Events Management</h1>
            <p className="mt-1 text-sm text-muted-foreground">Add, edit, or remove school events</p>
          </div>
          <button onClick={openAddModal} className="button-primary rounded-2xl px-5 py-2.5 flex items-center gap-2">
            <Plus size={18} />
            Add Event
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="surface-card-strong overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-muted-foreground">Loading...</div>
          ) : events.length === 0 ? (
            <div className="p-10">
              <EmptyState
                icon={Calendar}
                title="No events found"
                description="Add your first event to start showing activities."
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead className="bg-gradient-to-r from-primary to-secondary text-white">
                  <tr>
                    <th className="px-4 py-4 text-left text-sm font-semibold uppercase">#</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold uppercase">Image</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold uppercase">Title</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold uppercase">Date</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold uppercase">Location</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event, index) => (
                    <tr key={event._id} className="border-b border-border/70 bg-white/70 hover:bg-secondary/6">
                      <td className="px-4 py-4 text-sm font-medium text-muted-foreground">{index + 1}</td>
                      <td className="px-4 py-4">
                        {event.image ? (
                          <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                            <Image src={event.image} alt={event.title} fill className="object-cover" sizes="48px" />
                          </div>
                        ) : (
                          <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                            <ImageIcon size={20} className="text-secondary" />
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 font-semibold text-foreground">{event.title}</td>
                      <td className="px-4 py-4 text-sm text-foreground">
                        {event.date ? new Date(event.date).toLocaleDateString() : "-"}
                      </td>
                      <td className="px-4 py-4 text-sm text-foreground">{event.location || "-"}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleEdit(event)} className="rounded-lg p-2 hover:bg-blue-50" title="Edit">
                            <Pencil size={18} className="text-blue-500" />
                          </button>
                          <button onClick={() => handleDelete(event._id)} className="rounded-lg p-2 hover:bg-red-50" title="Delete">
                            <Trash2 size={18} className="text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="surface-card-strong max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">{editingEvent ? "Edit Event" : "Add Event"}</h3>
              <button onClick={() => { setShowModal(false); resetForm(); }} className="rounded-lg p-2 hover:bg-secondary/10">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Event Image</label>
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-32 rounded-lg overflow-hidden bg-secondary/10 flex items-center justify-center">
                    {form.image ? (
                      <Image src={form.image} alt="Preview" fill className="object-cover" sizes="128px" />
                    ) : (
                      <ImageIcon size={24} className="text-secondary" />
                    )}
                    {uploading && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="button-secondary px-4 py-2 rounded-xl flex items-center gap-2"
                  >
                    <Upload size={16} />
                    Upload Image
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="form-input"
                  placeholder="Enter event title"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Date *</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="form-input"
                  placeholder="Enter event location"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="form-textarea"
                  rows={4}
                  placeholder="Enter event description"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 button-primary rounded-2xl py-3">
                  {editingEvent ? "Update Event" : "Add Event"}
                </button>
                <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="px-6 py-3 rounded-2xl border border-border bg-white text-foreground hover:bg-secondary/5">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
