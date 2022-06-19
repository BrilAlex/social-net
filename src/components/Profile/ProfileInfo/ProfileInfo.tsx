import {ChangeEvent, FC, useState} from "react";
import s from "./ProfileInfo.module.css";
import defaultProfileBG from "./../../../assets/images/default_profile_bg.jpg";
import {ContactsType, ProfileType} from "../../../api/api";
import {Preloader} from "../../common/Preloader/Preloader";
import defaultAvatar from "../../../assets/images/man_avatar.png";
import {ProfileStatus} from "./ProfileStatus";
import {ProfileDataFormContainer} from "./ProfileDataForm";

type ContactPropsType = {
  contactTitle: string
  contactValue: string
};

const Contact: FC<ContactPropsType> = ({contactTitle, contactValue}) => {
  return (
    <p className={s.contact}>{contactTitle}: {contactValue}</p>
  );
};

type ProfileDataPropsType = {
  profile: ProfileType
  isOwner: boolean
  enableEditMode: () => void
};

const ProfileData: FC<ProfileDataPropsType> = ({profile, isOwner, enableEditMode}) => {
  const contactsList = Object.keys(profile.contacts).map(key => {
    const contactValue = profile.contacts[key as keyof ContactsType];
    return <Contact key={key} contactTitle={key} contactValue={contactValue}/>;
  });

  return (
    <div>
      <h3>Profile info:</h3>
      <div><b>Name</b>: {profile.fullName}</div>
      {profile.aboutMe && <p><b>About me</b>: {profile.aboutMe}</p>}
      <div>
        <p><b>Looking for a job</b>: {profile.lookingForAJob ? "Yes" : "No"}</p>
        {profile.lookingForAJob && <p><b>My skills</b>: {profile.lookingForAJobDescription}</p>}
      </div>
      <div>
        <p><b>Contacts</b>:</p>
        {contactsList}
      </div>
      {isOwner &&
      <div>
        <button onClick={enableEditMode}>Edit</button>
      </div>
      }
    </div>
  );
};

type ProfileInfoPropsType = {
  isOwner: boolean
  profile: ProfileType | null
  status: string
  updateStatus: (newStatus: string) => void
  saveAvatar: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<{}>
};

export const ProfileInfo: FC<ProfileInfoPropsType> = (
  {isOwner, profile, status, updateStatus, saveAvatar, saveProfile}
) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  if (!profile) {
    return <Preloader/>;
  }

  const userAvatarSrc = profile.photos.large || defaultAvatar;

  const changeProfileAvatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length) {
      saveAvatar(e.currentTarget.files[0]);
    }
  };

  const onSubmit = (formData: ProfileType) => {
    console.log(formData);
    saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };

  return (
    <div>
      <div className={s.profileBackground}>
        <img src={defaultProfileBG} alt={"Profile background"}/>
      </div>
      <div className={s.profileInfoBlock}>
        <div className={s.profileAvatar}>
          <img src={userAvatarSrc} alt={profile.fullName}/>
          {isOwner && <input type={"file"} onChange={changeProfileAvatarHandler}/>}
        </div>
        <div className={s.profileInfo}>
          <ProfileStatus status={status} updateStatus={updateStatus}/>
          {editMode ?
            <ProfileDataFormContainer
              initialValues={profile}
              onSubmit={onSubmit}
              profile={profile}
            />
            :
            <ProfileData
              profile={profile}
              isOwner={isOwner}
              enableEditMode={() => setEditMode(true)}
            />
          }
        </div>
      </div>
    </div>
  );
};
