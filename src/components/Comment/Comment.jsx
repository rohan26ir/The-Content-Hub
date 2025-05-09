import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import GetComment from './GetComment';

const Comment = ({ blogOwnerEmail, blogId }) => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const { user, darkMode } = useAuth();

  const themeMode = darkMode ? 'bg-[#292929] text-white' : 'bg-white text-black';
  const formBg = darkMode ? 'bg-[#424242]' : 'bg-white';
  const bgMode = darkMode ? 'bg-black' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-black';
  const borderColor = darkMode ? 'border-gray-600' : 'border-gray-300';
  const buttonColor = darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700';
  const disabledButtonColor = darkMode ? 'bg-gray-500 cursor-not-allowed' : 'bg-gray-500 cursor-not-allowed';

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (newComment) => {
      await axiosSecure.post('/api/addcomment', newComment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', blogId] });
    },
    onError: (err) => {
      console.error(err);
      toast.error('Failed to add comment');
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const comment = form.comment.value;

    const commentData = {
      comment,
      blogId,
      userName: user.displayName,
      userEmail: user.email,
      userProfilePicture: user.photoURL,
      createdAt: new Date(),
    };

    try {
      await mutateAsync(commentData);
      toast.success('Comment added successfully!');
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error('Failed to add comment');
    }
  };

  // Prevent commenting on own blog
  const isBlogOwner = user.email === blogOwnerEmail;

  return (
    <div className={`flex justify-center items-center py-2 ${themeMode}`}>
      <section className={`p-6 mx-auto rounded-md shadow-md w-11/12 ${formBg}`}>
        <h2 className={`text-lg font-semibold ${textColor} capitalize text-center mb-6`}>
          Comment Section
        </h2>

        <div>
          <GetComment blogId={blogId} blogOwnerEmail={blogOwnerEmail} />
        </div>

        {isBlogOwner ? (
          <div className='flex flex-col justify-center items-center'>
            <div className='w-full'>
              <label className={`text-gray-700 ${textColor}`} htmlFor="comment">
                Comment
              </label>
              <textarea
                id="comment"
                name="comment"
                type="text"
                className={`block w-full px-4 py-2 mt-2 ${textColor} bg-white border ${borderColor} rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none`}
                placeholder="Enter your comment"
                required
                disabled
              />
            </div>

            <p className="text-red-600 mt-4">Cannot comment on own blog</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
              <div>
                <label className={`text-gray-700 ${textColor}`} htmlFor="comment">
                  Comment
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  type="text"
                  className={`block w-full px-4 py-2 mt-2 ${textColor} ${bgMode}  border ${borderColor} rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none`}
                  placeholder="Enter your comment"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                className={`px-8 py-2.5 text-white transition-colors duration-300 transform rounded-md ${isPending ? disabledButtonColor : buttonColor}`}
                disabled={isPending}
              >
                {isPending ? 'Saving...' : 'Publish'}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};

export default Comment;
