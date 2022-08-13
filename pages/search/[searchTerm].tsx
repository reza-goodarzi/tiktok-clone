import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoVerified } from "react-icons/go";
import axios from "axios";

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";
import useAuthStore from "../../store/authStore";
import { FaUser } from "react-icons/fa";

interface IProps {
  videos: Video[];
}

const Search = ({ videos }: IProps) => {
  const [isAccounts, setIsAccounts] = useState(true);
  const { allUsers } = useAuthStore();
  const router = useRouter();
  const { searchTerm }: any = router.query;

  const accounts = isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const isVideos = !isAccounts ? "border-b-2 border-black" : "text-gray-400";

  const searchAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(searchAccounts);

  return (
    <div className="w-full">
      <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
          onClick={() => setIsAccounts(true)}
        >
          Accounts
        </p>

        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
          onClick={() => setIsAccounts(false)}
        >
          Videos
        </p>
      </div>

      {isAccounts ? (
        <div className="md:mt-16">
          {searchAccounts.length > 0 ? (
            searchAccounts.map((user: IUser) => (
              <Link href={`/profile/${user._id}`} key={user._id}>
                <div className="flex gap-2 p-2 font-semibold rounded border-b-2 border-gray-100 cursor-pointer">
                  <div>
                    <Image
                      src={user.image}
                      width={50}
                      height={50}
                      alt={user.userName}
                      className="rounded-full"
                    />
                  </div>

                  <div>
                    <p className="flex gap-1 items-center text-primary font-bold text-md lowercase">
                      {user.userName.replaceAll(" ", "")} <GoVerified className="text-blue-400" />
                    </p>
                    <p className="capitalize text-gray-400 text-xs">{user.userName}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults icon={<FaUser />} text={`No accounts results for ${searchTerm}`} />
          )}
        </div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
          {videos.length ? (
            videos.map((video: Video) => <VideoCard post={video} key={video._id} />)
          ) : (
            <NoResults text={`No video results for ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
  );
};

export default Search;

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: {
      videos: data,
    },
  };
};
