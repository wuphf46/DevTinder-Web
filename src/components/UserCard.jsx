import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, showActions = true }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {}
  };

  return (
    <div className="card w-full overflow-hidden border border-base-300 bg-base-100 shadow-lg">
      {photoUrl ? (
        <figure className="h-80 bg-base-200 sm:h-96">
          <img className="h-full w-full object-cover object-center" src={photoUrl || null} alt="photo" />
        </figure>
      ) : null}
      <div className="card-body p-5">
        <h2 className="card-title text-xl">{firstName + " " + lastName}</h2>
        {age && gender && <p className="text-sm font-medium text-success">{age + ", " + gender}</p>}
        <p className="text-base-content/70">{about}</p>
        {showActions && (
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default UserCard;