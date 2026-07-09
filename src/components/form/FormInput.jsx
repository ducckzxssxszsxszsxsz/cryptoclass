import React from "react";
import { User, Mail, Lock, Key } from "lucide-react";

const iconMap = {
  user: User,
  email: Mail,
  lock: Lock,
  code: Key,
};

const FormInput = ({ icon, ...props }) => {
  const Icon = icon ? iconMap[icon] : null;

  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tombol/60" />
      )}
      <input
        {...props}
        className={`w-full bg-white/5 border border-tombol/10 rounded-xl text-sm text-white placeholder-gray-500 transition-all duration-200 focus:border-tombol/30 focus:bg-white/[0.07] hover:border-white/20 ${
          Icon ? "pl-9 pr-3 py-2.5" : "px-3 py-2.5"
        }`}
      />
    </div>
  );
};

export default FormInput;
