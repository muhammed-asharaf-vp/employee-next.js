"use client"

interface ConfirmModalProps {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmModal({
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className="
          w-full max-w-sm rounded-2xl bg-white
          border border-black/10
          shadow-[0_20px_60px_rgba(0,0,0,0.15)]
          p-6
        "
      >
        {/* title */}
        <h3 className="text-lg font-semibold text-black mb-2">
          {title}
        </h3>

        {/* message */}
        <p className="text-sm text-black/60 mb-6">
          {message}
        </p>

        {/* actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="
              rounded-lg border border-black/10
              px-4 py-1.5 text-sm font-medium
              text-black/70
              transition-all duration-200
              hover:border-black/30
              hover:text-black
            "
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="
              rounded-lg bg-[#2563EB]
              px-4 py-1.5 text-sm font-medium text-white
              transition-all duration-200
              hover:bg-[#1E4FD8]
              active:scale-95
            "
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
