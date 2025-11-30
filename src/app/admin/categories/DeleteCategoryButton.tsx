'use client';

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeleteCategoryButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/categories?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert('Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Error deleting category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className={`p-1 rounded hover:bg-red-50 ${loading ? 'opacity-50 cursor-not-allowed' : 'text-red-600 hover:text-red-800'}`}
      title={loading ? 'Deleting...' : 'Delete category'}
    >
      {loading ? (
        <span className="w-4 h-4 block">
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
  );
}

// 'use client';

// import { Trash2 } from 'lucide-react';

// export default function DeleteCategoryButton({ id }: { id: string }) {
//   const handleDelete = async () => {
//     if (!confirm('Are you sure you want to delete this category?')) return;

//     try {
//       const res = await fetch(`/api/categories?id=${id}`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' }
//       });

//       if (res.ok) {
//         alert('Category deleted!');
//         window.location.reload();
//       } else {
//         alert('Failed to delete');
//       }
//     } catch (err) {
//       alert('Error deleting');
//     }
//   };

//   return (
//     <button
//       onClick={handleDelete}
//       className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
//     >
//       <Trash2 className="w-4 h-4" />
//     </button>
//   );
// }

