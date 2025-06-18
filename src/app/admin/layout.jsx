"use client";

import { checkAuth } from "@/store/slices/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AdminLayout({ children }) {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
