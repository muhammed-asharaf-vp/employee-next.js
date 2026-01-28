"use client"

type Props = {
  department: {
    _id: string
    dept_name: string
    description: string
  }
  onDelete: (id: string) => void
  onView: (id: string) => void
}

export default function DepartmentCard({
  department,
  onDelete,
  onView,
}: Props) {
  return (
    <div
      className="
        rounded-xl bg-white
        border border-black/10
        p-5
        transition-all duration-200
        hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]
      "
    >
      <h3
        onClick={() => onView(department._id)}
        className="
          cursor-pointer text-lg font-semibold text-black
          hover:text-[#2563EB]
          transition
        "
      >
        {department.dept_name}
      </h3>
      <p className="mt-2 text-sm text-black/60 line-clamp-3">
        {department.description}
      </p>
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => onDelete(department._id)}
          className="
            text-sm font-medium
            text-black/60
            transition
            hover:text-[#2563EB]
          "
        >
          Delete
        </button>
      </div>
    </div>
  )
}
