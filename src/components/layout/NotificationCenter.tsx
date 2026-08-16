"use client";

import React from "react";
import { useRonStore } from "@/lib/store";
import { formatTimeAgo } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  X,
  CheckCheck,
  ShieldCheck,
  Vote,
  ArrowLeftRight,
  Cpu,
  AlertTriangle,
} from "lucide-react";

export const NotificationCenter: React.FC = () => {
  const {
    isNotificationOpen,
    setNotificationOpen,
    notifications,
    markNotificationsAsRead,
  } = useRonStore();

  const getIcon = (type: string) => {
    switch (type) {
      case "STAKE":
        return <ShieldCheck className="w-4 h-4 text-ron-cyan" />;
      case "GOV":
        return <Vote className="w-4 h-4 text-ron-green" />;
      case "TX":
        return <ArrowLeftRight className="w-4 h-4 text-ron-violet" />;
      case "SECURITY":
        return <AlertTriangle className="w-4 h-4 text-ron-amber" />;
      default:
        return <Cpu className="w-4 h-4 text-ron-muted" />;
    }
  };

  return (
    <AnimatePresence>
      {isNotificationOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setNotificationOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-screen max-w-md bg-ron-surface border-l border-white/10 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-5 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-ron-cyan" />
                  <h3 className="font-semibold text-sm text-white">System Telemetry & Alerts</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={markNotificationsAsRead}
                    className="text-[11px] font-mono text-ron-muted hover:text-white flex items-center gap-1 p-1 hover:bg-white/5 rounded transition-colors"
                    title="Mark all as read"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>
                  <button
                    onClick={() => setNotificationOpen(false)}
                    className="p-1 rounded text-ron-muted hover:text-white hover:bg-white/5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Notification list */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3.5 rounded-xl border transition-all ${
                        notif.read
                          ? "bg-white/[0.01] border-white/5 text-ron-muted"
                          : "bg-ron-elevated/80 border-ron-violet/30 shadow-[0_0_15px_rgba(117,92,255,0.05)]"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-1.5 rounded-lg bg-white/5 shrink-0 mt-0.5">
                          {getIcon(notif.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4
                              className={`text-xs font-semibold truncate ${
                                notif.read ? "text-ron-muted" : "text-white"
                              }`}
                            >
                              {notif.title}
                            </h4>
                            <span className="text-[10px] font-mono text-ron-dim shrink-0">
                              {formatTimeAgo(notif.timestamp)}
                            </span>
                          </div>
                          <p className="text-[11px] text-ron-muted mt-1 leading-relaxed">
                            {notif.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <Bell className="w-8 h-8 text-ron-dim mb-2 stroke-1" />
                    <p className="text-xs text-ron-muted">No telemetry alerts recorded.</p>
                  </div>
                )}
              </div>

              {/* Footer status */}
              <div className="p-4 bg-black/40 border-t border-white/5 text-center font-mono text-[10px] text-ron-dim">
                REAL-TIME EVENT BUS • WEBSOCKET LINK ACTIVE
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
