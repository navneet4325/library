import { BellRing, CheckCheck, MailWarning, Trash2 } from 'lucide-react'
import { PageHeader } from '../components/common/PageHeader'
import { StatusPill } from '../components/common/StatusPill'
import { useAppStore } from '../hooks/useAppStore'

export default function NotificationsPage() {
  const {
    notifications,
    markNotificationRead,
    dismissNotification,
    pushToast,
  } = useAppStore()

  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Notification center"
        title="Alerts and reminders"
        description="Toast feedback is available app-wide, while this center handles persistent notices, overdue escalations, and operator follow-up."
        actions={
          <button
            type="button"
            onClick={() =>
              pushToast({
                title: 'Reminder sent',
                description: 'Overdue reminder emails were queued successfully.',
                tone: 'success',
              })
            }
            className="btn-secondary"
          >
            <MailWarning className="h-4 w-4" />
            Send reminder toast
          </button>
        }
      />

      <div className="rounded-[28px] border border-amber-400/20 bg-gradient-to-r from-amber-500/12 via-orange-500/12 to-rose-500/12 p-5 shadow-[0_18px_40px_rgba(245,158,11,0.12)]">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/16 text-amber-700 dark:text-amber-300">
            <BellRing className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display text-xl font-semibold text-[var(--text-primary)]">
              Overdue banner is active because unresolved circulation alerts remain.
            </p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              This persistent banner mirrors the high-priority state also visible inside the main app layout.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.72fr_minmax(0,1.28fr)]">
        <div className="glass-panel">
          <p className="section-kicker">Overview</p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-[var(--text-primary)]">
            {unreadCount} unread notifications
          </h2>
          <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
            Notifications can be marked as read, dismissed, or surfaced with toast confirmations for immediate user feedback.
          </p>
        </div>

        <div className="grid gap-4">
          {notifications.map((notification) => (
            <article
              key={notification.id}
              className="glass-panel flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                    {notification.title}
                  </h3>
                  <StatusPill status={notification.type} label={notification.type} />
                  {!notification.read ? <StatusPill status="info" label="Unread" /> : null}
                </div>
                <p className="text-sm leading-7 text-[var(--text-secondary)]">
                  {notification.description}
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
                  {notification.timestamp}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {!notification.read ? (
                  <button
                    type="button"
                    onClick={() => {
                      markNotificationRead(notification.id)
                      pushToast({
                        title: 'Marked as read',
                        description: notification.title,
                        tone: 'info',
                      })
                    }}
                    className="btn-secondary"
                  >
                    <CheckCheck className="h-4 w-4" />
                    Mark read
                  </button>
                ) : null}

                <button
                  type="button"
                  onClick={() => {
                    dismissNotification(notification.id)
                    pushToast({
                      title: 'Notification dismissed',
                      description: 'The alert was removed from the center.',
                      tone: 'warning',
                    })
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:-translate-y-0.5 hover:bg-rose-500/16 dark:text-rose-200"
                >
                  <Trash2 className="h-4 w-4" />
                  Dismiss
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
