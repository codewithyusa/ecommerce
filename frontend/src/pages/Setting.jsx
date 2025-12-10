import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader, ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";
import { useUserStore } from "../stores/useUserStore";

export default function SettingsPage() {
  const user = useUserStore((s) => s.user);
  const updateProfile = useUserStore((s) => s.updateProfile);
  const changePassword = useUserStore((s) => s.changePassword);
  const loading = useUserStore((s) => s.loading);

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    updateProfile({ name: profile.name, email: profile.email });
  };

  const savePassword = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    changePassword({
      currentPassword: passwords.currentPassword,
      newPassword: passwords.newPassword,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6 border rounded-md shadow-md space-y-10"
    >
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {/* Profile Update Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Update Profile</h2>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col">
            <span className="flex items-center gap-2 text-gray-700 mb-1">
              {/* You can replace with a user icon if you want */}
              <Mail size={18} /> Name
            </span>
            <input
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              className="border rounded p-2"
              type="text"
              placeholder="Your name"
            />
          </label>
          <label className="flex flex-col">
            <span className="flex items-center gap-2 text-gray-700 mb-1">
              <Mail size={18} /> Email
            </span>
            <input
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              className="border rounded p-2"
              type="email"
              placeholder="Your email"
            />
          </label>
        </div>
        <button
          onClick={saveProfile}
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? (
            <Loader className="animate-spin" size={18} />
          ) : (
            "Save Profile"
          )}
          <ArrowRight size={18} />
        </button>
      </section>

      {/* Change Password Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Change Password</h2>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col">
            <span className="flex items-center gap-2 text-gray-700 mb-1">
              <Lock size={18} /> Current Password
            </span>
            <input
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
              className="border rounded p-2"
              type="password"
              placeholder="Current password"
            />
          </label>
          <label className="flex flex-col">
            <span className="flex items-center gap-2 text-gray-700 mb-1">
              <Lock size={18} /> New Password
            </span>
            <input
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              className="border rounded p-2"
              type="password"
              placeholder="New password"
            />
          </label>
          <label className="flex flex-col">
            <span className="flex items-center gap-2 text-gray-700 mb-1">
              <Lock size={18} /> Confirm New Password
            </span>
            <input
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
              className="border rounded p-2"
              type="password"
              placeholder="Confirm new password"
            />
          </label>
        </div>
        <button
          onClick={savePassword}
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? (
            <Loader className="animate-spin" size={18} />
          ) : (
            "Update Password"
          )}
          <ArrowRight size={18} />
        </button>
      </section>
    </motion.div>
  );
}
