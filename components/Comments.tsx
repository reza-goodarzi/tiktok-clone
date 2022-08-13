import { Dispatch, FormEvent, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { BiCommentX } from "react-icons/bi";

import useAuthStore from "../store/authStore";
import NoResults from "./NoResults";
import { IUser } from "../types";

interface IComments {
  comment: string;
  length?: number;
  _key: string;
  postedBy: {
    _ref: string;
    _id: string;
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
  const { userProfile, allUsers } = useAuthStore();

  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg-{#F8F8F8} border-b-2 lg:pb-0 pb-[100px] lg:h-[58%]">
      <div className="overflow-scroll lg:h-[80%] h-[340px]">
        {comments?.length ? (
          comments.map((item, idx) => (
            <>
              {allUsers.map(
                (user: IUser) =>
                  user._id === (item.postedBy._id || item.postedBy._ref) && (
                    <div className="p-2 items-center" key={idx}>
                      <Link href={`/profile/${user._id}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8">
                            <Image
                              src={user.image}
                              width={34}
                              height={34}
                              alt={user.userName}
                              className="rounded-full"
                              layout="responsive"
                            />
                          </div>

                          <div className="hidden xl:block">
                            <p className="flex gap-1 items-center text-primary font-bold text-md lowercase">
                              {user.userName.replaceAll(" ", "")}{" "}
                              <GoVerified className="text-blue-400" />
                            </p>
                            <p className="capitalize text-gray-400 text-xs">{user.userName}</p>
                          </div>
                        </div>
                      </Link>

                      <div className="">
                        <p className="">{item.comment}</p>
                      </div>
                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <NoResults icon={<BiCommentX />} text="No comments yet!" />
        )}
      </div>
      {userProfile && (
        <div className="pb-6 px-1 md:px-8 lg:px-4 w-full lg:h-[20%] lg:static absolute left-0 bottom-0">
          <form onSubmit={addComment} className="flex gap-4">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add Comment.."
              className="bg-primary px-6 py-4 text-md font-medium border-2 border-green-100 focus:outline-none focus:border-2 focus:border-green-300 flex-1 rounded-lg"
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
