"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Upload, X, Users, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import EmptyState from "@/components/EmptyState";

export default function StaffManagementPage() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    role: "",
    phone: "",
    image: "",
    order: 0,
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const fetchStaff = async () => {
    try {
      const res = await fetch("/api/staff");
      const data = await res.json();
      if (data.success) setStaff(data.data);
    } catch (error) {
      toast.error("Failed to load staff");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchStaff();
  }, [isAuthenticated]);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const payload = new FormData();
      payload.append("file", file);
      const response = await fetch("/api/upload?section=staff", {
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
    if (!form.name || !form.role) {
      toast.error("Name and role are required");
      return;
    }

    try {
      const res = editingStaff
        ? await fetch("/api/staff", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: editingStaff._id, ...form }),
          })
        : await fetch("/api/staff", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });

      const data = await res.json();
      if (data.success) {
        toast.success(editingStaff ? "Staff updated" : "Staff added");
        setShowModal(false);
        resetForm();
        fetchStaff();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  const handleEdit = (member) => {
    setEditingStaff(member);
    setForm({
      name: member.name,
      role: member.role,
      phone: member.phone || "",
      image: member.image || "",
      order: member.order || 0,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this staff member?")) return;
    try {
      const res = await fetch(`/api/staff?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Staff deleted");
        fetchStaff();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const resetForm = () => {
    setForm({ name: "", role: "", phone: "", image: "", order: 0 });
    setEditingStaff(null);
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
            <h1 className="text-3xl font-bold text-foreground">Staff Management</h1>
            <p className="mt-1 text-sm text-muted-foreground">Add, edit, or remove staff members</p>
          </div>
          <button onClick={openAddModal} className="button-primary rounded-2xl px-5 py-2.5 flex items-center gap-2">
            <Plus size={18} />
            Add Staff
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="surface-card-strong overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-muted-foreground">Loading...</div>
          ) : staff.length === 0 ? (
            <div className="p-10">
              <EmptyState
                icon={Users}
                title="No staff members found"
                description="Add your first staff member to publish the team list."
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead className="bg-gradient-to-r from-primary to-secondary text-white">
                  <tr>
                    <th className="px-4 py-4 text-left text-sm font-semibold uppercase">#</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold uppercase">Photo</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold uppercase">Name</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold uppercase">Role</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold uppercase">Phone</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map((member, index) => (
                    <tr key={member._id} className="border-b border-border/70 bg-white/70 hover:bg-secondary/6">
                      <td className="px-4 py-4 text-sm font-medium text-muted-foreground">{index + 1}</td>
                      <td className="px-4 py-4">
                        {member.image ? (
                          <div className="relative h-12 w-12 overflow-hidden rounded-full">
                            <Image src={member.image} alt={member.name} fill className="object-cover" sizes="48px" />
                          </div>
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                            <Users size={20} className="text-secondary" />
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 font-semibold text-foreground">{member.name}</td>
                      <td className="px-4 py-4 text-foreground">{member.role}</td>
                      <td className="px-4 py-4 text-sm text-foreground">
                        {member.phone ? (
                          <a href={`tel:${member.phone}`} className="hover:text-primary hover:underline">
                            {member.phone}
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleEdit(member)} className="rounded-lg p-2 hover:bg-blue-50" title="Edit">
                            <Pencil size={18} className="text-blue-500" />
                          </button>
                          <button onClick={() => handleDelete(member._id)} className="rounded-lg p-2 hover:bg-red-50" title="Delete">
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
              <h3 className="text-xl font-bold text-foreground">{editingStaff ? "Edit Staff" : "Add Staff"}</h3>
              <button onClick={() => { setShowModal(false); resetForm(); }} className="rounded-lg p-2 hover:bg-secondary/10">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Photo</label>
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 rounded-full overflow-hidden bg-secondary/10 flex items-center justify-center">
                    {form.image ? (
                      <Image src={form.image} alt="Preview" fill className="object-cover" sizes="80px" />
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
                    Upload Photo
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="form-input"
                  placeholder="Enter staff name"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Role *</label>
                <input
                  type="text"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="form-input"
                  placeholder="e.g., Teacher, Principal"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="form-input"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Display Order</label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                  className="form-input"
                  placeholder="0"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 button-primary rounded-2xl py-3">
                  {editingStaff ? "Update Staff" : "Add Staff"}
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
