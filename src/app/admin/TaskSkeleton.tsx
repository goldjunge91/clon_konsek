// components/TaskSkeleton.js
export default function TaskSkeleton() {
    return (
      <div className="animate-pulse space-y-4 p-4">
        <div className="bg-gray-300 h-8 w-3/4 rounded"></div>
        <div className="bg-gray-300 h-6 w-1/2 rounded"></div>
        <p>Hello welt</p>
        {/* Repeat or adjust as needed to match your content's layout */}
      </div>
    );
  }

  // export default TaskSkeleton;
