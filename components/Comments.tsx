import { Dispatch, FormEvent, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { BiCommentX } from "react-icons/bi";

import useAuthStore from "../store/authStore";
import NoResults from "./NoResults";

interface IComments {
  comment: string;
  length?: number;
  _key: string;
  postedBy: {
    _ref: string;
  };
}
interface IProps {
  isPostingComment: boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: FormEvent) => void;
  comments: IComments[];
}

const Comments = ({ addComment, comment, comments, isPostingComment, setComment }: IProps) => {
  const { userProfile } = useAuthStore();

  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg-{#F8F8F8} border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[400px]">
        {comments?.length ? (
          <div>Videos</div>
        ) : (
          <NoResults icon={<BiCommentX />} text="No comments yet!" />
        )}
      </div>
      {userProfile && (
        <div className="absolute left-0 bottom-0 pb-6 px-2 md:px-10">
          <form onSubmit={addComment} className="flex gap-4">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add Comment.."
              className="bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[400px] lg:w-[350ox] border-green-100 focus:outline-none focus:border-2 focus:border-green-300 flex-1 rounded-lg"
            />
            <button className="text-md text-gray-400" onClick={addComment}>
              {isPostingComment ? "Commenting..." : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
