import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user && user.firstName ? user.firstName : "");
  const [lastName, setLastName] = useState(user && user.lastName ? user.lastName : "");
  const [photoUrl, setPhotoUrl] = useState(user && user.photoUrl ? user.photoUrl : "");
  const [age, setAge] = useState(user && user.age ? user.age : "");
  const [gender, setGender] = useState(user && user.gender ? user.gender : "");
  const [about, setAbout] = useState(user && user.about ? user.about : "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!user) return;

    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setPhotoUrl(user.photoUrl || "");
    setAge(user.age || "");
    setGender(user.gender || "");
    setAbout(user.about || "");
  }, [user]);

  const saveProfile = async () => {
    //Clear Errors
    setError("");
    try {
      const payload = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        photoUrl: photoUrl.trim(),
        age: Number(age),
        gender: gender.trim(),
        about: about.trim(),
      };

      const res = await axios.patch(BASE_URL + "/profile/edit", payload, {
        withCredentials: true,
      });
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="min-h-[calc(100vh-5rem)] bg-base-200/60 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl items-start gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
          <div className="card w-full border border-base-300 bg-base-100 shadow-lg">
            <div className="card-body p-5 sm:p-7">
              <div className="mb-3 border-b border-base-300 pb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-success">
                  Your profile
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-base-content">Edit Profile</h2>
                <p className="mt-1 text-sm text-base-content/60">
                  Keep your details current and let your personality come through.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="form-control w-full">
                  <div className="label pb-1">
                    <span className="label-text">First Name:</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full bg-base-100"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label pb-1">
                    <span className="label-text">Last Name:</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full bg-base-100"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full sm:col-span-2">
                  <div className="label pb-1">
                    <span className="label-text">Photo URL:</span>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input input-bordered w-full bg-base-100"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label pb-1">
                    <span className="label-text">Age:</span>
                  </div>
                  <input
                    type="number"
                    value={age}
                    className="input input-bordered w-full bg-base-100"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label pb-1">
                    <span className="label-text">Gender:</span>
                  </div>
                  <select
                    value={gender}
                    className="select select-bordered w-full bg-base-100"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="male">male</option>
                    <option value="female">female</option>
                    <option value="other">other</option>
                  </select>
                </label>
                <label className="form-control w-full sm:col-span-2">
                  <div className="label pb-1">
                    <span className="label-text">About:</span>
                  </div>
                  <textarea
                    value={about}
                    className="textarea textarea-bordered min-h-28 w-full bg-base-100"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
              </div>
              {error && <p className="mt-2 text-sm text-error">{error}</p>}
              <div className="card-actions mt-5 justify-end">
                <button className="btn btn-success px-7 text-success-content" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
          <div className="lg:py-4 lg:top-24">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-base-content/50">
              Live preview
            </p>
            <UserCard
              user={{ firstName, lastName, photoUrl, age, gender, about }}
              showActions={false}
            />
          </div>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center z-50 mt-16">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};
export default EditProfile;