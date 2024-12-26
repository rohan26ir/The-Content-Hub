import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';

const GetComment = ({ blogId, blogOwnerEmail }) => {
  const { user, darkMode } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const themeMode = darkMode ? 'bg-[#292929] text-white' : 'bg-white text-black';
  const commentBg = darkMode ? 'bg-[#424242]' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-black';
  const borderColor = darkMode ? 'border-gray-600' : 'border-gray-300';
  const deleteBtnColor = darkMode ? 'text-red-500 hover:text-red-700' : 'text-red-600 hover:text-red-800';

  // Fetch comments
  const { data: comments, isLoading } = useQuery({
    queryKey: ['comments', blogId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/addcomment?blogId=${blogId}`);
      return res.data;
    },
  });

  // Delete comment
  const deleteMutation = useMutation({
    mutationFn: async (commentId) => {
      await axiosSecure.delete(`/api/comments/${commentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', blogId]);
      toast.success('Comment deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete comment');
    },
  });

  if (isLoading) return <p>Loading comments...</p>;

  return (
    <div className="mt-4">
      {comments?.length > 0 ? (
        comments.map((comment) => {
          const isCommentOwner = comment.userEmail === user.email;

          return (
            <div
              key={comment._id}
              className={`flex items-start mb-4 pb-2 last:pb-0 border-b ${borderColor} ${commentBg}`}
            >
              <img
                src={comment.userProfilePicture}
                alt={comment.userName}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div className="flex-grow">
                <h4 className={`text-sm font-semibold ${textColor}`}>{comment.userName}</h4>
                <p className={`text-sm ${textColor}`}>{comment.comment}</p>
                <p className="text-xs text-gray-400">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Allow deletion only if the logged-in user is the comment owner */}
              {isCommentOwner && (
                <button
                  onClick={() => deleteMutation.mutate(comment._id)}
                  className={`text-sm ml-4 ${deleteBtnColor}`}
                >
                  Delete
                </button>
              )}
            </div>
          );
        })
      ) : (
        <p className={`text-gray-600 ${textColor}`}>No comments yet.</p>
      )}
    </div>
  );
};

export default GetComment;
