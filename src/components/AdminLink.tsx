import React from "react";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";

const AdminLink = () => {
  return (
    <Link
      to="/admin"
      className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors z-50"
      title="Admin Dashboard"
    >
      <Settings size={20} />
    </Link>
  );
};

export default AdminLink;
